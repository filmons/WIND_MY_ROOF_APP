const { request } = require("express");// import express
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();
require("dotenv").config();
const router = require("./src/routers/router");




//define port
 const port = process.env.PORT;
 
 


/////////////////////////

app.use(morgan("dev"));
app.use(express.json());//a method inbuilt in express to recognize the incoming Request Object as a JSON Object

app.use(express.urlencoded({ extended: true }));// as strings or arrays.

app.use("/api",router);





//run the application
app.listen(port, () => {
  console.log(`running at port ${port}`);
});