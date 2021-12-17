const { request } = require("express");// import express
const express = require("express");

const app = express();
require("dotenv").config();
const router = require("./src/routers/router");




//define port
 const port = process.env.PORT;;




//run the application
app.listen(port, () => {
  console.log(`running at port ${port}`);
});