require('dotenv').config();
const mysql =require("mysql2");

const db = mysql.createConnection({
    host:process.env.HOST_NAME,
    user:process.env.USER_NAME,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_DATABASE,
      
     });
     
    db.connect(function(err) {
      if (err) throw err;
    console.log("Connecté à la base de données MySQL!");
  });
  module.exports = db;