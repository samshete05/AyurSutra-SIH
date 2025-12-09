const mongoose = require("mongoose");

const adrReportSchema = new mongoose.Schema(
  {
    // Header
    peripheralCentreCode: {
      type: String,
      required: true,
    },
    adrNumberYear: {
      type: String,
      unique: true,
      required: true,
    },
    treatmentType: {
      type: String,
      enum: ["Ayurveda", "Siddha", "Unani", "Homoeopathy"],
      default: "Ayurveda",
    },

    // Section 1: Patient Identification
    patientInitials: String,
    patientRecordNumber: String,
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
    },
    placeOfBirth: String,
    ipdOpd: {
      type: String,
      enum: ["IPD", "OPD"],
      default: "OPD",
    },
    address: String,
    villageTown: String,
    postVia: String,
    districtState: String,
    age: Number,
    sex: {
      type: String,
      enum: ["Male", "Female", "Others"],
    },
    diagnosis: String,
    constitutionTemperament: String,

    // Section 2: Adverse Reactions
    initialObservationDate: Date,
    reactionDescription: String,

    // Section 3: Chronic Disorders
    chronicDisorders: {
      hepatic: Boolean,
      renal: Boolean,
      cardiac: Boolean,
      diabetes: Boolean,
      anyOther: Boolean,
      specifyOther: String,
    },

    // Section 4 & 5
    addictions: String,
    previousAllergies: String,

    // Section 6: ASU & H Drugs
    asuDrugs: [
      {
        name: String,
        manufacturer: String,
        dose: String,
        form: String,
        startDate: Date,
        stoppedContinued: String,
        reasonForUse: String,
        unwantedOccurrences: String,
      },
    ],

    // Section 7: Other Drugs
    otherDrugs: [
      {
        name: String,
        manufacturer: String,
        dose: String,
        form: String,
        startDate: Date,
        stoppedContinued: String,
        reasonForUse: String,
        unwantedOccurrences: String,
      },
    ],

    // Section 8: Suspected Drug Details
    suspectedDrug: {
      name: String,
      manufacturingDate: Date,
      expiryDate: Date,
      remainingPack: String,
      consumedWith: String,
      dietaryPrecautions: String,
      medicalSupervision: String,
      otherInfo: String,
    },

    // Section 9
    managementProvided: String,

    // Section 10: Outcome
    outcome: {
      type: String,
      enum: ["Recovered", "Not recovered", "Unknown", "Fatal"],
    },
    fatalDate: Date,
    severe: String,
    reactionAbated: String,
    reactionReappeared: String,
    hospitalAdmitted: Boolean,
    hospitalNameAddress: String,

    // Section 11
    labInvestigations: String,

    // Section 12: Reporter Details
    reporterType: String,
    reporterOtherSpecify: String,
    reporterName: String,
    reporterAddress: String,
    reporterPhoneEmail: String,
    reportDate: Date,
    reporterSignature: String,

    // ADR Probability Scale
    adrScale: [String],
    adrScore: Number,
    adrCategory: {
      type: String,
      enum: ["Certain", "Probable", "Possible", "Unlikely"],
    },

    // Suspected Adverse Event
    eventGrade: String,
    eventSeriousness: String,
    eventDueTo: String,
    otherFactors: String,

    // Program Coordinator
    coordinatorSignature: String,

    // Metadata
    submittedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    submittedAt: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ["Draft", "Submitted", "Reviewed", "Approved"],
      default: "Draft",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ADRReport", adrReportSchema);
