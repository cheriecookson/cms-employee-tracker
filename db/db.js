const mysql = require('mysql2');
 
// Creates the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    // Your MySQL username
    user: 'root',
    // Your MySQL password
    password: 'GHluv2020:)',
    database: 'employee_trackerDB'
  });

  connection.connect(err => {
    if (err) throw err;
        
  });
  

  module.exports = connection;