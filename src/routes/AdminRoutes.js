const express = require('express')
const adminController = require('../controllers/adminController')

const router = express.Router()


router.post('/admin', adminController.createNewAdmin);

module.exports = router;