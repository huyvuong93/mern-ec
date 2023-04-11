module.exports = function (req, res, next) {
  // Verify token
  try {
    if (!req.session.admin) {
      res.status(400).json({ message: 'Unauthenticated'});
    } else {
      next();
    }
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};