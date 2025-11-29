const dotenv=require("dotenv");
dotenv.config();
const express=require("express");

const cors=require("cors");
const { patientRouter } = require("./router/patient");
const { PanchakarmaCenterRouter } = require("./router/PanchkarmaCenterAdmin");
const app=express();

app.use(cors({
    origin: "http://localhost:5173", 
    credentials: true, 
}))

app.use(express.json());

app.use("/patient",patientRouter);
app.use("/PanchKarmaCenter",PanchakarmaCenterRouter);


app.listen(3000,()=>{

console.log("server started!!!");

})

