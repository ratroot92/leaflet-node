const path = require("path");
"use strict";
//creating a mysql pool for the a shared instance of db connection in whole application
const mysql = require("mysql");
const { nextTick } = require("process");

const connection = mysql.createPool({
    host: "database-dheiko.cwf1fb8z5zka.us-east-1.rds.amazonaws.com",
    user: "root",
    // password: 'abc123', for server
    password: "dekho!!##$$%%", //for local db
    //for server
     database: "deikho_app",
     insecureAuth : true
  
  });

  connection.getConnection(function(err, connection) {
   //  connected! (unless `err` is set)
  });
  module.exports=connection;