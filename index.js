const express = require("express");
const bodyParser = require("body-parser");
const DB = require("./config/db");
const expressValidator = require("express-validator");

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

// register router
const userRouter = require("./routes/user.routes");
app.use("/testapi", userRouter);

//Start server
const port = process.env.PORT || "9000";
app.listen(port, "0.0.0.0", () => {
  console.log(`Listening to requests on http://0.0.0.0:${port}`);
});
