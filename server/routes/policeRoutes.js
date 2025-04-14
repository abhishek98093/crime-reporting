const express=require('express');
const {viewAllComplaints,updateStatus}=require('../controller/policeController');
const {authenticate,authorise}=require('../middleware/authMiddleware');

const router=express.Router();

router.put('/complaint/status',authenticate,authorise(['police']),updateStatus);
router.get('/complaint',authenticate,authorise(['police']),viewAllComplaints);

module.exports=router;