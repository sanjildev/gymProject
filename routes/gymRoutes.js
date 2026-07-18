const upload = require('../config/multer')
const { createGym, getAllGyms, getSingleGym, updateGym, deleteGym } = require('../controllers/gymController')
const { authenticateUser, authorizeRoles } = require('../middleware/authMiddleware')

const router=require('express').Router()

router.route('/').post(authenticateUser,authorizeRoles('Admin','Super Admin'),upload.single("image"),createGym).get(getAllGyms)
router.route('/:id').get(getSingleGym).patch(authenticateUser,authorizeRoles('Admin','Super Admin'),upload.single("image"),updateGym).delete(authenticateUser,authorizeRoles('Admin','Super Admin'),deleteGym)

module.exports=router