const mongoose = require("mongoose");

const ClientSchema = new mongoose.Schema({
  name: {
    type: String,
    index: true,
    unique:true
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
    
  },
});

module.exports = mongoose.model('Clients', ClientSchema)
