module.exports = (err, req, res, next) => {
  console.error('❌ Error:', err);

  // If headers already sent, delegate to default Express handler
  if (res.headersSent) {
    return next(err);
  }

  // Basic production-safe response
  res.status(err.status || 500);

  // If request expects HTML → render page
  if (req.headers.accept && req.headers.accept.includes('text/html')) {
    return res.render('error', {
      message: err.message || 'Something went wrong',
      error: process.env.NODE_ENV === 'development' ? err : {}
    });
  }

  // Otherwise JSON
  res.json({
    message: err.message || 'Internal Server Error'
  });
};