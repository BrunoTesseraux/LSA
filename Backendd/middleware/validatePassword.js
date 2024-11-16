export const validatePassword = (req, res, next) => {
    const { passwordHash } = req.body;
    if (passwordHash && passwordHash.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters long' });
    }
    next();
  };