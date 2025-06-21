// Central error handling
const errorHandler = (err, req, res, next) => {
  console.error('Error:', {
    message: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method,
    ip: req.ip,
    userAgent: req.get('User-Agent'),
    timestamp: new Date().toISOString(),
  });

  // Default error response
  let error = {
    message: err.message || 'Internal Server Error',
    status: err.statusCode || 500,
  };

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map(e => ({
      field: e.path,
      message: e.message,
    }));
    error = {
      message: 'Validation Error',
      status: 400,
      errors,
    };
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    error = {
      message: `${field} already exists`,
      status: 400,
    };
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    error = {
      message: 'Invalid token',
      status: 401,
    };
  }

  if (err.name === 'TokenExpiredError') {
    error = {
      message: 'Token expired',
      status: 401,
    };
  }

  // Mongoose cast error (invalid ObjectId)
  if (err.name === 'CastError') {
    error = {
      message: 'Invalid ID format',
      status: 400,
    };
  }

  // Don't leak error details in production
  if (process.env.NODE_ENV === 'production') {
    if (error.status === 500) {
      error.message = 'Something went wrong';
    }
    // Remove stack trace in production
    delete error.stack;
  } else {
    // Include stack trace in development
    error.stack = err.stack;
  }

  res.status(error.status).json(error);
};

// Handle 404 errors
const notFound = (req, res, next) => {
  const error = new Error(`Route not found - ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
};

module.exports = {
  errorHandler,
  notFound,
};

