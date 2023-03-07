const express = require('express');
// Import and require mysql2
const mysql = require('mysql2');

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // MySQL password
    password: 'Soca.DL83',
    database: 'business_manager_db'
  },
  console.log(`Connected to the business_manager_db database.`)
);

module.exports = db
  