const express=require('express')
const { createFighter, getAllFighters, getSingleFighter, updateFighter, deleteFighter } = require('../controllers/fighterController')
const upload = require('../config/multer')
const { authenticateUser, authorizeRoles } = require('../middleware/authMiddleware')
const router=express.Router()
router.route('/').post(authenticateUser,authorizeRoles('Admin','Super Admin'), upload.single('image'),createFighter).get(getAllFighters)
router.route('/:id').get(getSingleFighter).patch(authenticateUser,authorizeRoles('Admin','Super Admin'),upload.single("image"),updateFighter).delete(authenticateUser,authorizeRoles('Admin','Super Admin'),deleteFighter)
module.exports=router