const express=require('express')
const { createFighter, getAllFighters, getSingleFighter, updateFighter, deleteFighter } = require('../controllers/fighterController')
const upload = require('../config/multer')
const router=express.Router()
router.route('/').post(upload.single('image'),createFighter).get(getAllFighters)
router.route('/:id').get(getSingleFighter).patch(upload.single("image"),updateFighter).delete(deleteFighter)
module.exports=router