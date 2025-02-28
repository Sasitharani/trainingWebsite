import mysql from 'mysql2';///Sasi
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

// Create a connection pool
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306, // Add the port configuration
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export default db;