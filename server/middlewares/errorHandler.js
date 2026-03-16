 
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

  let error = {
    message: err.message || 'Internal Server Error',
    status: err.statusCode || 500,
  };

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

  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    error = {
      message: `${field} already exists`,
      status: 400,
    };
  }

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

  if (err.name === 'CastError') {
    error = {
      message: 'Invalid ID format',
      status: 400,
    };
  }

  if (process.env.NODE_ENV === 'production') {
    if (error.status === 500) {
      error.message = 'Something went wrong';
    }
     
    delete error.stack;
  } else {
     
    error.stack = err.stack;
  }

  res.status(error.status).json(error);
};

const notFound = (req, res, next) => {
  const error = new Error(`Route not found - ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
};

module.exports = {
  errorHandler,
  notFound,
};

