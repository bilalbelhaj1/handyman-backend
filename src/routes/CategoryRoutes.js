const express = require('express');
const categoryController = require('../controllers/categoryController');

const router = express.Router();

router.post('/add',categoryController.createCategory);
router.get('/get',categoryController.getAllCategories);
router.put('/edit',categoryController.editCategory);
router.delete('/delete',categoryController.deleteCategory);

module.exports = router;