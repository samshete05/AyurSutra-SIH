const mongoose = require("mongoose");

try{
    mongoose.connect(process.env.MONGO_URL);
}catch(err){
    console.error("Error connecting to MongoDB:", err);
}