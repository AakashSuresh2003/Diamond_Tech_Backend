const mongoose = require("mongoose");

const ConnectDB = async (req,res) => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI);
    console.log(
      "Database Connected : ",
      connect.connection.host,
      connect.connection.name
    );
  } catch (err) {
    console.log(err);
  }
};

module.exports = ConnectDB;