// Register, login, token handling
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const admin = require('firebase-admin');
const User = require('../models/User');
const generateToken = require('../utils/generateToken');
const { validationResult } = require('express-validator');

// Register user
const register = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Get Firebase token from Authorization header
    const authHeader = req.headers.authorization;
    const idToken = authHeader && authHeader.split(' ')[1];

    if (!idToken) {
      return res.status(401).json({ message: 'Firebase ID token required' });
    }

    // Verify Firebase token
    let decodedToken;
    try {
      decodedToken = await admin.auth().verifyIdToken(idToken);
    } catch (error) {
      console.error('Firebase token verification failed:', error);
      return res.status(401).json({ message: 'Invalid Firebase token' });
    }

    const { 
      name, 
      email, 
      role, 
      studentId, 
      firebaseUid,
      personalInfo,
      academicInfo,
      addressInfo,
      preferences
    } = req.body;

    // Verify that the Firebase UID matches the token
    if (firebaseUid !== decodedToken.uid) {
      return res.status(401).json({ message: 'Firebase UID mismatch' });
    }

    // Check if user already exists by email or Firebase UID
    const existingUser = await User.findOne({ 
      $or: [{ email }, { firebaseUid }] 
    });
    
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create user with Firebase authentication
    const user = new User({
      name,
      email,
      firebaseUid,
      role: role || 'student',
      studentId,
      phone: personalInfo?.phone,
      personalInfo: {
        fullName: personalInfo?.fullName,
        fullNameEn: personalInfo?.fullNameEn,
        dateOfBirth: personalInfo?.dateOfBirth,
        gender: personalInfo?.gender,
      },
      academicInfo: {
        department: academicInfo?.department,
        semester: academicInfo?.semester,
        session: academicInfo?.session,
      },
      addressInfo: {
        presentAddress: addressInfo?.presentAddress,
        permanentAddress: addressInfo?.permanentAddress,
        emergencyContact: addressInfo?.emergencyContact,
        emergencyPhone: addressInfo?.emergencyPhone,
      },
      preferences: {
        notifications: {
          email: true,
          push: preferences?.allowNotifications ?? true,
          sms: false,
        },
        language: 'en',
        allowNotifications: preferences?.allowNotifications ?? true,
      },
      isApproved: role === 'student' ? false : true, // Students need approval
    });

    await user.save();

    res.status(201).json({
      message: 'User registered successfully. Please wait for admin approval.',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        studentId: user.studentId,
        isApproved: user.isApproved,
        personalInfo: user.personalInfo,
        academicInfo: user.academicInfo,
      },
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
};

// Login user
const login = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password, firebaseUid } = req.body;

    // If Firebase UID is provided, use Firebase authentication
    if (firebaseUid) {
      // Get Firebase token from Authorization header
      const authHeader = req.headers.authorization;
      const idToken = authHeader && authHeader.split(' ')[1];

      if (!idToken) {
        return res.status(401).json({ message: 'Firebase ID token required' });
      }

      // Verify Firebase token
      let decodedToken;
      try {
        decodedToken = await admin.auth().verifyIdToken(idToken);
      } catch (error) {
        console.error('Firebase token verification failed:', error);
        return res.status(401).json({ message: 'Invalid Firebase token' });
      }

      // Verify that the Firebase UID matches the token
      if (firebaseUid !== decodedToken.uid) {
        return res.status(401).json({ message: 'Firebase UID mismatch' });
      }

      // Find user by Firebase UID
      const user = await User.findOne({ firebaseUid });
      if (!user) {
        return res.status(400).json({ message: 'User not found' });
      }

      // Check if user is approved
      if (!user.isApproved) {
        return res.status(403).json({ message: 'Account pending approval' });
      }

      // Update last login
      user.lastLogin = new Date();
      await user.save();

      // Generate backend token
      const token = generateToken(user._id, user.role);

      res.json({
        message: 'Login successful',
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          studentId: user.studentId,
          isApproved: user.isApproved,
          personalInfo: user.personalInfo,
          academicInfo: user.academicInfo,
        },
      });
    } else {
      // Traditional email/password login (for backward compatibility)
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      // Check if user is approved
      if (!user.isApproved) {
        return res.status(403).json({ message: 'Account pending approval' });
      }

      // Check password (only for non-Firebase users)
      if (user.password) {
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return res.status(400).json({ message: 'Invalid credentials' });
        }
      } else {
        return res.status(400).json({ message: 'Please use Firebase authentication' });
      }

      // Update last login
      user.lastLogin = new Date();
      await user.save();

      // Generate token
      const token = generateToken(user._id, user.role);

      res.json({
        message: 'Login successful',
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          studentId: user.studentId,
          isApproved: user.isApproved,
        },
      });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
};

module.exports = {
  register,
  login,
};

