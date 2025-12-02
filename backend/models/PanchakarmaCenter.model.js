const mongoose = require("mongoose");
const schema = mongoose.Schema;


const PanchakarmaCenterSchema=new schema({
    name:String,
    licenseNo:String,
    AdminEmail:{
        type:String,unique:true
    },
  location: { type: String, required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },

})

module.exports = mongoose.model("PanchakarmaCenter",PanchakarmaCenterSchema);