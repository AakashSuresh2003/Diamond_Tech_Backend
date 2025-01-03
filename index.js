const dotenv = require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const ConnectDB = require('./src/utils/database');
const categoryRoutes = require('./src/routes/productsRoute');


app.use(express.json());


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(cors());

ConnectDB();

app.use("/api/v1/", categoryRoutes);

app.get("/", (req, res) => {
  res.status(200).json("Welcome to Diamond Technologies");
});

const PORT =  process.env.PORT || 3000 ;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});