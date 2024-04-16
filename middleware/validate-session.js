import jwt from 'jsonwebtoken'
import User from '../models/user.model.js'

const validateSession = async(req, res, next) => {
  try {
    const token = req.headers.authorization
    const decodedToken = await jwt.verify(token, process.env.SECRET)
    const user = await User.findById(decodedToken.id)
    if(!user) throw new Error('user not found')
    req.user = user
    return next()
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

export default validateSession
