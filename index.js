const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require('./routes/users');

let port = process.env.PORT;
dotenv.config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("DB connection successfull"))
  .catch((err) => console.log(err));

app.use('/api', userRoute)

app.listen(port || 5000, () => {
  console.log(`Backend server is running!`);
});
