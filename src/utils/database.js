const mongoose = require("mongoose");

const ConnectDB = async (req,res) => {
  try {
    // const connect = await mongoose.connect(process.env.MONGO_URI);
    const connect = await mongoose.connect('mongodb+srv://aakashakshith455:GqSx8UA5sqiJO9UC@cluster0.b6qrj.mongodb.net/DiamondTechnologies?retryWrites=true&w=majority&appName=Cluster0');
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