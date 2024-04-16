import { model, Schema } from 'mongoose'

const MovieSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  director: {
    type: String,
  },
  year: {
    type: String
  },
  genre: {
    type: String
  },
  user: {
    type: String
  }
})

export default model('Movie', MovieSchema)