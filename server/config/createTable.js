const client = require('./db');

const createTable = async () => {
    try {
        await client.query(`
            CREATE TABLE IF NOT EXISTS users (
                user_id SERIAL PRIMARY KEY,
                email VARCHAR(255) UNIQUE NOT NULL,
                password TEXT NOT NULL,
                phone_number VARCHAR(15) UNIQUE NOT NULL,
                role VARCHAR(50) CHECK (role IN ('citizen', 'police', 'admin')),
                otp_verified BOOLEAN DEFAULT FALSE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);

        await client.query(`
            CREATE TABLE IF NOT EXISTS complaints (
                complaint_id SERIAL PRIMARY KEY,
                user_id INT REFERENCES users(user_id),
                crime_type VARCHAR(255) NOT NULL,
                description TEXT NOT NULL,
                location TEXT,
                date_reported TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                status VARCHAR(50) CHECK (status IN ('pending', 'under investigation', 'resolved')) DEFAULT 'pending',
                attachments TEXT,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);

        await client.query(`
            CREATE TABLE IF NOT EXISTS crime_reports (
                report_id SERIAL PRIMARY KEY,
                complaint_id INT REFERENCES complaints(complaint_id),
                police_officer_id INT REFERENCES users(user_id),
                event_type VARCHAR(255) CHECK (event_type IN ('arrest', 'follow-up investigation', 'crime report')),
                details TEXT NOT NULL,
                report_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);

        await client.query(`
            CREATE TABLE IF NOT EXISTS crime_search_logs (
                log_id SERIAL PRIMARY KEY,
                user_id INT REFERENCES users(user_id),
                search_query TEXT NOT NULL,
                search_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);

        await client.query(`
            CREATE TABLE IF NOT EXISTS missing_persons (
                missing_id SERIAL PRIMARY KEY,
                user_id INT REFERENCES users(user_id),
                name VARCHAR(255) NOT NULL,
                age INT,
                gender VARCHAR(10) CHECK (gender IN ('male', 'female', 'other')),
                last_seen_location TEXT,
                date_missing TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                status VARCHAR(50) CHECK (status IN ('reported', 'found')) DEFAULT 'reported',
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);

        await client.query(`
            CREATE TABLE IF NOT EXISTS police_activity (
                activity_id SERIAL PRIMARY KEY,
                police_officer_id INT REFERENCES users(user_id),
                activity_type VARCHAR(255) CHECK (activity_type IN ('patrol', 'investigation', 'intervention')),
                activity_details TEXT,
                activity_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);

        await client.query(`
            CREATE TABLE IF NOT EXISTS news (
                news_id SERIAL PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                content TEXT NOT NULL,
                published_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);

        console.log("Table created or verified successfully");
    } catch (err) {
        console.log("error in creating table", err.stack);
    }
};

module.exports = { createTable };
