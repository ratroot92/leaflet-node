const express = require("express");
const bodyParser = require("body-parser");
const DB = require("./config/db");
const expressValidator = require("express-validator");
const cors = require("cors");

// var connection = mysql.createPool({
//   host: "deikho-billing.cwf1fb8z5zka.us-east-1.rds.amazonaws.com",
//   user: "root",
//   // password: 'abc123', for server
//   password: "jtDSS=3!t!q3HpK", //for local db
//   //for server
//    database: "deikho_charging",
//    insecureAuth : true

// });

const app = express();

//apply default middlewares
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(expressValidator())
const corsOpts = {
  origin: '*',

  methods: [
    'GET',
    'POST',
  ],

  allowedHeaders: [
    'Content-Type',
  ],
};

app.use(cors(corsOpts));
// register router
app.post('/save',(req,res)=>{
console.log(req.body)
})

//Start server
const port = process.env.PORT || "9000";
app.listen(port ,(err)=> {
  if(err){
    console.log(err)
  }
  else{
    console.log(`Listening to requests on http://0.0.0.0:${port}`);
  }
  
});
