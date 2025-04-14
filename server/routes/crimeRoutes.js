const express = require('express');
const { getAllComplaints, createComplaint, getComplaintStatus } = require('../controller/crimeController');
const { authenticate, authorise } = require('../middleware/authMiddleware');

const router = express.Router();


router.post('/complaint', authenticate, createComplaint);

router.get('/getAllComplaint', authenticate, getAllComplaints);

router.get('/complaint/:complaint_id', authenticate, getComplaintStatus);

module.exports = router;
