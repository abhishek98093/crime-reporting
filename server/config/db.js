const { Client } = require('pg');

const connectionString = 'postgresql://neondb_owner:npg_3AIel8ijwKMk@ep-summer-base-a5362rhk-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require';


const client = new Client({
  connectionString: connectionString,
  ssl: { rejectUnauthorized: false }
});

// Connect to the database
client.connect()
  .then(() => {
    console.log('Connected to the database');
  })
  .catch(err => {
    console.error('Error connecting to the database', err);
  });


module.exports = client;
