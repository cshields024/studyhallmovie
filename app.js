import express from 'express'
import 'dotenv/config'
import mongoose from 'mongoose'
import cors from 'cors'
import userController from './controllers/user.controller.js'
import movieController from './controllers/movie.controller.js'

const app = express()

mongoose.connect(`${process.env.MONGODB}/Study`)

const db = mongoose.connection

db.once('open', () => console.log(`connected: ${process.env.MONGODB}`))

app.use(express.json())
app.use(cors())
app.use('/user', userController)
app.use('/movie', movieController)

app.listen(process.env.SERVER_PORT, () => {
  console.log(`App is listening on port: ${process.env.SERVER_PORT}`)
})