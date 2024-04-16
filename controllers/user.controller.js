import { Router } from 'express'
import User from '../models/user.model.js'
import jwt from 'jsonwebtoken'
import { hashSync, compare } from 'bcrypt'

const router = Router()

router.post('/signup', async(req, res) => {
  try {
    const {email, username, password} = req.body
    const user = new User({
      email,
      username, 
      password: hashSync(password, 13)
    })
    const newUser = await user.save()
    const token = jwt.sign({ id: user._id }, process.env.SECRET, {
      expiresIn: "1 day"
    })
    res.status(200).json({
      user: newUser,
      message: 'success',
      token
    })
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
})

router.post('/login', async(req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email: email });
    if(!user) throw new Error('User not found')
    const passwordMatch = await compare(password, user.password)
    if(!passwordMatch) throw new Error('email or password does not match')
    const token = jwt.sign({ id: user._id }, process.env.SECRET, {
      expiresIn: '1 day'
    })
    res.status(200).json({
      message: 'success',
      user, 
      token
    })
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
})

export default router