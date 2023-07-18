const mongoose = require("mongoose");

const ClientSchema = new mongoose.Schema(
  {
    authorId: {
      type: String,
    },
    name: {
      type: String,
      index: true,
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Clients", ClientSchema);
