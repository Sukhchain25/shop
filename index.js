const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const productRoute = require("./routes/product");
const stripeRoute = require("./routes/stripe");
const cors = require("cors");

let port = process.env.PORT;
dotenv.config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("DB connection successfull"))
  .catch((err) => console.log(err));

app.use(cors());
app.use(express.json());
app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/product", productRoute);
app.use("/api/checkout", stripeRoute);

app.listen(port || 5000, () => {
  console.log(`Woohoo! Server is up and running...`);
});
