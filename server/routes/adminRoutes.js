const express=require('express');
const {authenticate,authorise}=require('../middleware/authMiddleware');
const {deleteComplaint}=require('../controller/adminController');

const router=express.Router();


router.delete('/complaint/:complaint_id',authenticate,authorise(['admin']),deleteComplaint);

module.exports=router;