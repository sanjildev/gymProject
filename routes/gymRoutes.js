const { createGym, getAllGyms, getSingleGym, updateGym, deleteGym } = require('../controllers/gymController')

const router=require('express').Router()

router.route('/').post(createGym).get(getAllGyms)
router.route('/:id').get(getSingleGym).patch(updateGym).delete(deleteGym)

module.exports=router