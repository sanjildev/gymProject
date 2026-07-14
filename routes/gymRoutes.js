const upload = require('../config/multer')
const { createGym, getAllGyms, getSingleGym, updateGym, deleteGym } = require('../controllers/gymController')

const router=require('express').Router()

router.route('/').post(upload.single("image"),createGym).get(getAllGyms)
router.route('/:id').get(getSingleGym).patch(upload.single("image"),updateGym).delete(deleteGym)

module.exports=router