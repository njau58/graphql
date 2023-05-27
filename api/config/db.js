const mongoose = require("mongoose");

const dbConnect = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {});

    console.log(
      `Mongo connected to  ${conn.connection.host}`.cyan.underline.bold
    );
  } catch (e) {
    throw new Error("Error occured.");
  }
};

module.exports = { dbConnect };
