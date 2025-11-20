const express = require('express');
const jobController = require('../controllers/jobController');

const router = express.Router();

router.post('/add',jobController.addJob);
router.put('/edit',jobController.editJob);
router.get('/get',jobController.getAllJobs);
router.delete('/delete',jobController.deleteJob);

module.exports = router;