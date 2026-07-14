const { createFight, getAllFights, getSingleFight, updateFight, deleteFight } = require('../controllers/fightController')

const router=require('express').Router()

router.route('/').post(createFight).get(getAllFights)
router.route('/:id').get(getSingleFight).patch(updateFight).delete(deleteFight)
module.exports=router