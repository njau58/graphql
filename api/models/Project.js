const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    authorId: {
      type: String,
    },
    description: {
      type: String,
    },
    status: {
      type: String,
      enum: ["Not Started", "In Progress", "Completed"],
    },

    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
    },
    startDate: { type: String },
    dueDate: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Project", ProjectSchema);
