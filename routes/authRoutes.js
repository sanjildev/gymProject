const { registerUser, loginUser, changePassword } = require('../controllers/authController')
const { authenticateUser } = require('../middleware/authMiddleware')

const router=require('express').Router()

router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/changePassword').patch(authenticateUser, changePassword)
module.exports=router