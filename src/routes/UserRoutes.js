const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router()

router.post('/register',userController.register);
router.post('/login',userController.login);
router.put('/edit',userController.editProfil);
router.post('/totalJobs',userController.totalJobs);

module.exports = router;