const { Client } = require('pg');

const connectionString = //;


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
