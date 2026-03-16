import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut,
  updateProfile
} from "firebase/auth";
import { auth } from "../lib/firebase";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

class AuthService {
   
  async register(userData) {
    try {
       
      const userCredential = await createUserWithEmailAndPassword(
        auth, 
        userData.email, 
        userData.password
      );
      
      const firebaseUser = userCredential.user;

      await updateProfile(firebaseUser, {
        displayName: userData.fullNameEn
      });

      const backendUserData = {
        name: userData.fullNameEn,
        email: userData.email,
        role: "student",  
        studentId: userData.studentId,
        firebaseUid: firebaseUser.uid,
        personalInfo: {
          fullName: userData.fullName,
          fullNameEn: userData.fullNameEn,
          phone: userData.phone,
          dateOfBirth: userData.dateOfBirth,
          gender: userData.gender
        },
        academicInfo: {
          studentId: userData.studentId,
          department: userData.department,
          semester: userData.semester,
          session: userData.session
        },
        addressInfo: {
          presentAddress: userData.presentAddress,
          permanentAddress: userData.permanentAddress,
          emergencyContact: userData.emergencyContact,
          emergencyPhone: userData.emergencyPhone
        },
        preferences: {
          allowNotifications: userData.allowNotifications
        }
      };

      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${await firebaseUser.getIdToken()}`
        },
        body: JSON.stringify(backendUserData)
      });

      const result = await response.json();

      if (!response.ok) {
         
        await firebaseUser.delete();
        throw new Error(result.message || "Backend registration failed");
      }

      return {
        firebaseUser,
        backendUser: result.user,
        message: result.message
      };

    } catch (error) {
      console.error("Registration error:", error);

      if (error.code) {
        switch (error.code) {
          case "auth/email-already-in-use":
            throw new Error("This email address is already in use");
          case "auth/weak-password":
            throw new Error("Password should be at least 6 characters");
          case "auth/invalid-email":
            throw new Error("Invalid email address");
          default:
            throw new Error(error.message);
        }
      }
      
      throw error;
    }
  }

  async login(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;

      const idToken = await firebaseUser.getIdToken();

      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${idToken}`
        },
        body: JSON.stringify({ 
          email, 
          firebaseUid: firebaseUser.uid 
        })
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Login failed");
      }

      return {
        firebaseUser,
        backendUser: result.user,
        token: result.token
      };

    } catch (error) {
      console.error("Login error:", error);
      
      if (error.code) {
        switch (error.code) {
          case "auth/user-not-found":
          case "auth/wrong-password":
            throw new Error("Invalid email or password");
          case "auth/user-disabled":
            throw new Error("Account has been disabled");
          case "auth/too-many-requests":
            throw new Error("Too many failed attempts. Please try again later");
          default:
            throw new Error(error.message);
        }
      }
      
      throw error;
    }
  }

  async logout() {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout error:", error);
      throw new Error("Failed to logout");
    }
  }

  getCurrentUser() {
    return auth.currentUser;
  }

  async getIdToken() {
    const user = this.getCurrentUser();
    if (user) {
      return await user.getIdToken();
    }
    return null;
  }
}

export default new AuthService();
