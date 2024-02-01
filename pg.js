const {Client} = require('pg');

// Replace these values with your PostgreSQL RDS connection details
const rdsConfig = {
  user: 'theGenie',
  host: 'database-11.ceatochq4arc.ap-southeast-1.rds.amazonaws.com',
  database: 'theGenie',
  password: 'theGenie',
  port: 5432, // Default PostgreSQL port
};

// Function to check PostgreSQL RDS status
const checkRDSStatus = async () => {
  const client = new Client(rdsConfig);

  try {
    await client.connect();
    console.log('Connected to PostgreSQL RDS successfully!');

    // Additional logic or checks can be added here if needed
  } catch (err) {
    console.error('Error connecting to PostgreSQL RDS:', err.message);
  } finally {
    await client.end();
    console.log('PostgreSQL RDS connection closed.');
  }
};

// Run the PostgreSQL RDS status check
checkRDSStatus();
