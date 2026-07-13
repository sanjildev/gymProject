const express=require('express')
const { createFighter, getAllFighters, getSingleFighter, updateFighter, deleteFighter } = require('../controllers/fighterController')
const router=express.Router()
router.route('/').post(createFighter).get(getAllFighters)
router.route('/:id').get(getSingleFighter).patch(updateFighter).delete(deleteFighter)
module.exports=router