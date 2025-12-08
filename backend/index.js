require("dotenv").config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

// ⭐ Correct DB path
const connectDB = require("./db/db");

connectDB(); // connect first

const { patientRouter } = require("./router/patient");
const { PanchakarmaCenterRouter } = require("./router/PanchkarmaCenterAdmin");
const progressRouter = require("./router/progress");
const doctorDashboardRouter = require("./router/doctordashboard");



const paymentRoutes = require("./router/paymentRoutes");
const { doctorRouter } = require("./router/doctor");

const app = express();

app.use(cookieParser());

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://www.ayursutra.online/",
    "https://ayursutra.online/",
    "https://ayursutra-6l5i.onrender.com/"
  ],
  credentials: true,
}));

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

app.use("/doctor-dashboard", doctorDashboardRouter);
app.use("/followups", require("./router/followup"));

app.use("/patient", patientRouter);
app.use("/patient", progressRouter);
app.use("/PanchKarmaCenter", PanchakarmaCenterRouter);
app.use("/doctor",doctorRouter);

app.use("/payments", paymentRoutes);
  
app.listen(3000, () => {
  console.log("server started!!!");
});
