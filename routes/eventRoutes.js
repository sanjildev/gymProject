const upload = require('../config/multer')
const { getAllEvents, createEvent, getSingleEvent, updateEvent, deleteEvent } = require('../controllers/EventController')

const router=require('express').Router()
router.route('/').get(getAllEvents).post(upload.single('image'),createEvent)
router.route('/:id').get(getSingleEvent).patch(upload.single('image'),updateEvent).delete(deleteEvent)

module.exports=router