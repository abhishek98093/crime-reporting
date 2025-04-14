const client = require('../config/db');

const createComplaint = async (req, res) => {
    const { crime_type, description, location, attachments } = req.body;

    try {
        const result = await client.query(`
            INSERT INTO complaints (user_id, crime_type, description, location, attachments)
            VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [req.user.userId, crime_type, description, location, attachments]
        );

        res.status(201).json({ message: 'Complaint filed successfully', complaint: result.rows[0] });
    } catch (err) {
        res.status(500).json({ message: 'Error filing complaint', error: err.message });
    }
};

const getAllComplaints = async (req, res) => {
    try {
        const result = await client.query(
            'SELECT * FROM complaints WHERE user_id = $1 ORDER BY complaint_id DESC',
            [req.user.userId]
        );
        res.status(200).json({ complaints: result.rows });  
    } catch (err) {
        res.status(500).json({ message: 'Error fetching complaints', error: err.message });
    }
};

const getComplaintStatus = async (req, res) => {
    const { complaint_id } = req.params;

    try {
        const result = await client.query(
            'SELECT * FROM complaints WHERE complaint_id = $1 AND user_id = $2',
            [complaint_id, req.user.userId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Complaint not found or unauthorized' });
        }

        res.json({ complaint: result.rows[0] });
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving complaint', error: err.message });
    }
};

module.exports = { getAllComplaints, createComplaint, getComplaintStatus };
