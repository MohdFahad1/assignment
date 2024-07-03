const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const connectDb = require("./config/db");
const authRoute = require("./routes/authRoute");
const userRoute = require("./routes/userRoute");
const cors = require("cors");

// config env
dotenv.config();

// setup port
const PORT = process.env.PORT || 8080;

// connect Database
connectDb();

// initialized an app
const app = express();

// middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

// routes

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/users", userRoute);

// api
app.get("/", (req, res) => {
  res.send("hii");
});

app.listen(PORT, () => {
  console.log(`App listening at : ${PORT}`);
});
