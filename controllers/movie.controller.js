import {Router} from 'express'
import Movie from '../models/movie.model.js'
import validateSession from '../middleware/validate-session.js'

const router = Router()

router.post('/add', validateSession, async(req, res) => {
  try {
    const userId = req.user._id
    const {title, director, year, genre} = req.body
    const newMovie = new Movie({
      title, 
      director,
      genre,
      year,
      user: userId
    })
    await newMovie.save()
    res.status(200).json({
      message: 'success',
      newMovie
    })
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
})

router.put('/:id', validateSession, async(req, res) => {
  try {
    const filter = {_id: req.params.id, user: req.user._id}
    const info = req.body
    const returnOption = {new: true};
    const updatedMovie = await Movie.findOneAndUpdate(
      filter, 
      info,
      returnOption
    );
    res.status(200).json({
      message: 'success',
      updatedMovie
    })
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
})

router.get('/', validateSession, async(req, res) => {
 try {
  const allMovies = await Movie.find()
  allMovies
    ? res.status(200).json({
      message: 'success',
      allMovies
    })
    : res.status(404).json({
      message: 'no movies found'
    })
 } catch (error) {
  res.status(500).json({
    message: error.message
  })
 }
})

router.get('/:id', validateSession, async(req, res) => {
  try {
    const {id} = req.params
    const getMovie = await Movie.findById(id)
    getMovie
      ? res.status(200).json({
        message: 'success',
        getMovie
      })
      : res.status(404).json({
        message: 'movie not found'
      })
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
})

router.delete('/:id', validateSession, async(req, res) => {
  try {
    const {id} = req.params
  
    const deleteMovie = await Movie.deleteOne({_id: id, user: req.user._id})
    deleteMovie.deletedCount
      ? res.status(200).json({
        message: 'success'
      })
      : res.status(404).json({
        message: 'movie not found'
      })
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
})


export default router