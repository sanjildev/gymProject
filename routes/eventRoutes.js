const upload = require('../config/multer')
const { getAllEvents, createEvent, getSingleEvent, updateEvent, deleteEvent } = require('../controllers/EventController')
const { authenticateUser, authorizeRoles } = require('../middleware/authMiddleware')

const router=require('express').Router()
router.route('/').get(getAllEvents).post(authenticateUser,authorizeRoles('Admin','Super Admin'),upload.single('image'),createEvent)
router.route('/:id').get(getSingleEvent).patch(authenticateUser,authorizeRoles('Admin','Super Admin'),upload.single('image'),updateEvent).delete(authenticateUser,authorizeRoles('Admin','Super Admin'),deleteEvent)

module.exports=router