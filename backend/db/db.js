const mongoose = require("mongoose");

try{
    mongoose.connect(process.env.MONGO_URL, {
      serverSelectionTimeoutMS: 30000, // Increase timeout to 30 seconds
      socketTimeoutMS: 45000,
    });
}catch(err){
    console.error("Error connecting to MongoDB:", err);
    process.exit(1);
}
