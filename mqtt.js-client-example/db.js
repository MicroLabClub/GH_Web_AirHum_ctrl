import mysql from "mysql2"
import dbConfig from "./db.config.js";

//var connectionState = false;

// Create a connection to the database
// const connection = mysql.createConnection({
//   host: dbConfig.HOST,
//   user: dbConfig.USER,
//   password: dbConfig.PASSWORD,
//   database: dbConfig.DB,
//   port: dbConfig.PORT
// });

const pool = mysql.createPool({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
  port: dbConfig.PORT,
  connectionLimit: 10
});

// open the MySQL connection
// connection.connect(error => {
//   if (error) throw error;
//   //if (error) console.log("Error");
//   else console.log("Successfully connected to the database.");
// });

// pool.getConnection(function(err, connection) {
//   if (err) throw err;
 
//   connection.release();
// });

//module.exports = connection;
//export default connection;
export default pool;