// Multer config for file uploads
const multer = require('multer');
const path = require('path');
const { bucket } = require('../config/firebase');

// Multer configuration for memory storage (for Firebase upload)
const storage = multer.memoryStorage();

// File filter function
const fileFilter = (req, file, cb) => {
  // Allowed file types
  const allowedTypes = {
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg',
    'image/png': 'png',
    'image/gif': 'gif',
    'application/pdf': 'pdf',
  };

  if (allowedTypes[file.mimetype]) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPEG, PNG, GIF, and PDF files are allowed.'), false);
  }
};

// Multer upload configuration
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
});

// Upload to Firebase Storage
const uploadToFirebase = async (file, folder = 'uploads') => {
  try {
    const fileName = `${folder}/${Date.now()}_${Math.random().toString(36).substring(2)}_${file.originalname}`;
    const fileUpload = bucket.file(fileName);

    const stream = fileUpload.createWriteStream({
      metadata: {
        contentType: file.mimetype,
      },
    });

    return new Promise((resolve, reject) => {
      stream.on('error', (error) => {
        reject(error);
      });

      stream.on('finish', async () => {
        try {
          // Make the file publicly accessible
          await fileUpload.makePublic();
          
          // Get the public URL
          const publicUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;
          
          resolve({
            fileName,
            publicUrl,
            size: file.size,
            mimetype: file.mimetype,
          });
        } catch (error) {
          reject(error);
        }
      });

      stream.end(file.buffer);
    });
  } catch (error) {
    throw new Error(`File upload failed: ${error.message}`);
  }
};

// Middleware to handle single file upload
const uploadSingle = (fieldName, folder = 'uploads') => {
  return async (req, res, next) => {
    upload.single(fieldName)(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ message: err.message });
      }

      if (!req.file) {
        return next();
      }

      try {
        const uploadResult = await uploadToFirebase(req.file, folder);
        req.uploadedFile = uploadResult;
        next();
      } catch (error) {
        console.error('Firebase upload error:', error);
        res.status(500).json({ message: 'File upload failed' });
      }
    });
  };
};

// Middleware to handle multiple file uploads
const uploadMultiple = (fieldName, maxCount = 5, folder = 'uploads') => {
  return async (req, res, next) => {
    upload.array(fieldName, maxCount)(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ message: err.message });
      }

      if (!req.files || req.files.length === 0) {
        return next();
      }

      try {
        const uploadPromises = req.files.map(file => uploadToFirebase(file, folder));
        const uploadResults = await Promise.all(uploadPromises);
        req.uploadedFiles = uploadResults;
        next();
      } catch (error) {
        console.error('Firebase upload error:', error);
        res.status(500).json({ message: 'File upload failed' });
      }
    });
  };
};

module.exports = {
  upload,
  uploadToFirebase,
  uploadSingle,
  uploadMultiple,
};

