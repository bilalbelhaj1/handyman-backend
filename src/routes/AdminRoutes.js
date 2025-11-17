const express = require('express')
const adminController = require('../controllers/adminController')

const router = express.Router()


router.post('/register', adminController.createNewAdmin);
router.post('/login', adminController.login);
router.get('/all',adminController.getAllAdmins);
router.put('/edit',adminController.editAdminInfo);
router.put('/ban',adminController.banUser);
router.delete('/delete/:id',adminController.deleteAdmin);

module.exports = router;