const { registerUser, loginUser, changePassword, forgotPassword, resetPassword } = require('../controllers/authController')
const { authenticateUser } = require('../middleware/authMiddleware')

const router=require('express').Router()

router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/changePassword').patch(authenticateUser, changePassword)
router.route('/forgot-password').post(forgotPassword)
router.route('/reset-password/:token').patch(resetPassword)
module.exports=router