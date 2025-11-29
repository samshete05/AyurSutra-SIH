const mongoose = require("mongoose");
const schema = mongoose.Schema;

const doctorSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        mobileNo: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        yoe: {
            type: Number,
            required: true
        },
        specialization: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
)

export const doctorModel = mongoose.model("Doctor", doctorSchema);