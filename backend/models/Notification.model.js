const mongoose = require("mongoose");
const schema = mongoose.Schema;

const notificationSchema = new schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  userType: {
    type: String,
    enum: ["patient", "centerHead"],
    default: "patient",
    required: true,
  },
  type: {
    type: String,
    enum: [
      "appointment",
      "medication",
      "treatment",
      "report",
      "reminder",
      "promotion",
    ],
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  read: {
    type: Boolean,
    default: false,
  },
  priority: {
    type: String,
    enum: ["low", "medium", "high"],
    default: "medium",
  },
  actionable: {
    type: Boolean,
    default: false,
  },
  actions: [
    {
      label: {
        type: String,
        required: false,
      },
      type: {
        type: String,
        required: false,
      },
      link: {
        type: String,
        required: false,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Notification", notificationSchema);
