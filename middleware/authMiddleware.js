const jwt = require('jsonwebtoken')
const User = require('../models/User')

exports.authenticateUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        message: "Access Denied. No Token Provided!!"
      })
    }
    const token = authHeader.split(' ')[1]
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    const user = await User.findById(decoded.id)
    if (!user) {
      return res.status(401).json({
        message: "User no longer exists"
      })
    }

    if (decoded.tokenVersion !== user.tokenVersion) {
      return res.status(401).json({
        message: "Session expired. Please log in again."
      })
    }

    req.user = decoded
    next()
  } catch (error) {
    res.status(401).json({ error: error.message })
  }
}

exports.authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: "You don't have permission to do this" })
    }
    next()
  }
}