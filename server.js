const express = require("express");
const dotenv = require("dotenv");
const connectDatabase = require("./helpers/database/connectDatabase");
const routers = require("./routers");
const customErrorHandler = require("./middlewares/errors/customErrorHandler");

//Environment Variables
dotenv.config({
    path : "./config/env/config.env"
});

//MongoDB Connection
connectDatabase();

const app = express();

//Express - Body Middleware
app.use(express.json());

const PORT = process.env.PORT;

//Routers Middleware
app.use("/api",routers);

//Error Handler
app.use(customErrorHandler);


app.listen(PORT,() =>{
    console.log(`App Started On: ${PORT} : ${process.env.NODE_ENV}`);
});