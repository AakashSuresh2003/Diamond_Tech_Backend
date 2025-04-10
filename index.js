const dotenv = require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const path = require("path");
const ConnectDB = require('./src/utils/database');
const categoryRoutes = require('./src/routes/productsRoute');
const inquiryRoutes = require('./src/routes/inQueryFormRoute');
const upload = require('./src/utils/multer');
app.use(express.json());


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Add global error handler
app.use((err, req, res, next) => {
  console.error('Global error:', err);
  res.status(500).json({
    success: false,
    message: 'Something went wrong',
    error: err.message
  });
});

ConnectDB();

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use("/api/v1/", categoryRoutes);
app.use("/api/v1/", inquiryRoutes); 

app.get("/", (req, res) => {
  res.status(200).json("Welcome to Diamond Technologies");
});

const PORT =  process.env.PORT || 3000 ;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});