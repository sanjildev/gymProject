const { createFight, getAllFights, getSingleFight, updateFight, deleteFight } = require('../controllers/fightController')
const { authenticateUser, authorizeRoles } = require('../middleware/authMiddleware')

const router=require('express').Router()

router.route('/').post(authenticateUser,authorizeRoles('Admin','Super Admin'),createFight).get(getAllFights)
router.route('/:id').get(getSingleFight).patch(authenticateUser,authorizeRoles('Admin','Super Admin'),updateFight).delete(authenticateUser,authorizeRoles('Admin','Super Admin'),deleteFight)

module.exports=router