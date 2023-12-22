import mysql from "mysql2"
import dbConfig from "../mysql/db.config.js";

const pool = mysql.createPool({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
  port: dbConfig.PORT,
  connectionLimit: 10
});


// // Create a connection to the database
// const connection = mysql.createConnection({
//   host: dbConfig.HOST,
//   user: dbConfig.USER,
//   password: dbConfig.PASSWORD,
//   database: dbConfig.DB,
//   port: dbConfig.PORT
// });

// // open the MySQL connection
// connection.connect(error => {
//   if (error) throw error;
//   //if (error) console.log("Error");
//   else console.log("Successfully connected to the database.");
// });

//module.exports = connection;
//export default connection;
export default pool;