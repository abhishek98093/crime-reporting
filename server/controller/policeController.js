const client =require('../config/db');

const viewAllComplaints=async(req ,res)=>{
    try{
        const result = await client.query('SELECT * FROM complaints');
        res.json({complaints:result.rows});
    }catch(err){
        res.status(500).json({ message: 'Error retrieving complaints', error: err.message });
    }
};

const updateStatus=async(req,res)=>{
    const { complaint_id, status } = req.body;
    try{
        const result=await client.query('UPDATE complaints SET status = $1 WHERE complaint_id = $2 RETURNING *', [status, complaint_id]);
        if(result.rows.length==0){
            return res.status(404).json({ message: 'Complaint not found or unauthorized' });
        }
        res.json({message:'complaint status updated',complaint:result.rows[0]});
    }catch (err) {
        res.status(500).json({ message: 'Error updating complaint status', error: err.message });
    }
}

module.exports={viewAllComplaints,updateStatus};