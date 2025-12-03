const mongoose = require("mongoose");
const schema = mongoose.Schema;

const notificationSchema = new schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required: true
    },
    type: {
        type: String,
        enum: ['appointment', 'medication', 'treatment', 'report', 'reminder', 'promotion'],
        required: true
    },
    title: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    read: {
        type: Boolean,
        default: false
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'medium'
    },
    actionable: {
        type: Boolean,
        default: false
    },
    actions: [{
        label: String,
        type: String,
        link: String
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Notification", notificationSchema);
