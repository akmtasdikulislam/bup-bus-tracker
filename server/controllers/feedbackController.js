// Feedback submissions
const Feedback = require('../models/Feedback');
const { validationResult } = require('express-validator');

// Submit feedback
const submitFeedback = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { type, subject, message, scheduleId } = req.body;

    const feedback = new Feedback({
      userId: req.user.id,
      type,
      subject,
      message,
      scheduleId,
    });

    await feedback.save();
    await feedback.populate('userId', 'name email');
    
    if (scheduleId) {
      await feedback.populate({
        path: 'scheduleId',
        populate: {
          path: 'routeId',
          select: 'routeName',
        },
      });
    }

    res.status(201).json({ 
      message: 'Feedback submitted successfully', 
      feedback 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all feedback (admin only)
const getAllFeedback = async (req, res) => {
  try {
    const { status, type } = req.query;
    const filter = {};
    
    if (status) filter.status = status;
    if (type) filter.type = type;

    const feedback = await Feedback.find(filter)
      .populate('userId', 'name email')
      .populate({
        path: 'scheduleId',
        populate: {
          path: 'routeId',
          select: 'routeName',
        },
      })
      .sort({ createdAt: -1 });

    res.json(feedback);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get user's feedback
const getUserFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.find({ userId: req.user.id })
      .populate({
        path: 'scheduleId',
        populate: {
          path: 'routeId',
          select: 'routeName',
        },
      })
      .sort({ createdAt: -1 });

    res.json(feedback);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update feedback status (admin only)
const updateFeedbackStatus = async (req, res) => {
  try {
    const { status, response } = req.body;
    const { feedbackId } = req.params;

    const feedback = await Feedback.findById(feedbackId);
    if (!feedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }

    feedback.status = status;
    if (response) {
      feedback.response = response;
      feedback.respondedBy = req.user.id;
      feedback.respondedAt = new Date();
    }
    feedback.updatedAt = new Date();

    await feedback.save();
    await feedback.populate('userId', 'name email');
    await feedback.populate('respondedBy', 'name');

    res.json({ 
      message: 'Feedback status updated successfully', 
      feedback 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  submitFeedback,
  getAllFeedback,
  getUserFeedback,
  updateFeedbackStatus,
};

