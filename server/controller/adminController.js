const client=require('../config/db');

const deleteComplaint=async(req ,res)=>{
    const { complaint_id } = req.params;

    try{
        const result=await client.query('DELETE FROM complaints WHERE complaint_id = $1 RETURNING *', [complaint_id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Complaint not found' });
        }
        res.json({message:'complaint deleted',complaint:result.rows[0]});
    } catch (err) {
        res.status(500).json({ message: 'Error deleting complaint', error: err.message });
    }
}
module.exports={deleteComplaint};