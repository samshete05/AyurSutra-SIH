import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import Select from 'react-select';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import Navbar from '../components/Navbar';

const PharmaReporting = ({ patientEmail, DoctorEmail }) => {
  const [loading, setLoading] = useState(false);
  const [autofillLoading, setAutofillLoading] = useState(false);
  const [patientOptions, setPatientOptions] = useState([]);
  const [selectedPatientId, setSelectedPatientId] = useState('');
  const fileInputRef = useRef(null);

  // Indian Patient Data (with English text)
  const indianPatients = [
    {
      _id: '1',
      name: 'Rajesh Kumar',
      email: 'rajesh.kumar@example.com',
      dateOfBirth: '1985-03-15',
      gender: 'Male',
      address: '15 Gandhi Road, Connaught Place',
      city: 'New Delhi',
      state: 'Delhi',
      pincode: '110001',
      mobileNo: '9876543210',
      prakriti: 'Vata-Pitta',
      primaryDosha: 'Vata',
      secondaryDosha: 'Pitta',
      chronicConditions: ['Diabetes', 'Hypertension'],
      allergies: ['Penicillin', 'Dust'],
      smokingStatus: 'Non-smoker',
      alcoholConsumption: 'Occasional',
      constitution: 'Vata-Pitta',
      currentImbalance: 'Increased Vata',
      currentMedications: ['Ashwagandha', 'Triphala']
    },
    {
      _id: '2',
      name: 'Priya Sharma',
      email: 'priya.sharma@example.com',
      dateOfBirth: '1992-07-22',
      gender: 'Female',
      address: '45 Marine Drive, Nariman Point',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400021',
      mobileNo: '9876543211',
      prakriti: 'Pitta',
      primaryDosha: 'Pitta',
      secondaryDosha: 'Kapha',
      chronicConditions: ['Asthma', 'Migraine'],
      allergies: ['Sulfa drugs', 'Pollen'],
      smokingStatus: 'Non-smoker',
      alcoholConsumption: 'Never',
      constitution: 'Pitta',
      currentImbalance: 'Pitta imbalance',
      currentMedications: ['Amalaki', 'Guduchi']
    },
    {
      _id: '4',
      name: 'Meena Patel',
      email: 'meena.patel@example.com',
      dateOfBirth: '1988-05-10',
      gender: 'Female',
      address: '23 Ellis Bridge',
      city: 'Ahmedabad',
      state: 'Gujarat',
      pincode: '380006',
      mobileNo: '9876543213',
      prakriti: 'Vata-Kapha',
      primaryDosha: 'Vata',
      secondaryDosha: 'Kapha',
      chronicConditions: ['Arthritis'],
      allergies: ['Iodine', 'Shellfish'],
      smokingStatus: 'Non-smoker',
      alcoholConsumption: 'Never',
      constitution: 'Vata-Kapha',
      currentImbalance: 'Joint stiffness',
      currentMedications: ['Ashwagandha', 'Yogaraj Guggulu']
    },
    {
      _id: '5',
      name: 'Suresh Menon',
      email: 'suresh.menon@example.com',
      dateOfBirth: '1965-12-05',
      gender: 'Male',
      address: '12 MG Road',
      city: 'Chennai',
      state: 'Tamil Nadu',
      pincode: '600001',
      mobileNo: '9876543214',
      prakriti: 'Tridosha',
      primaryDosha: 'Balanced',
      secondaryDosha: 'Balanced',
      chronicConditions: ['Hypertension'],
      allergies: ['Aspirin'],
      smokingStatus: 'Current smoker',
      alcoholConsumption: 'Regular',
      constitution: 'Tridosha',
      currentImbalance: 'Minor Vata imbalance',
      currentMedications: ['Brahmi', 'Shankhapushpi']
    }
  ];

  // ADR Probability Scale questions
  const adrQuestions = [
    "Are there previous conclusive reports on the reactions?",
    "Did the ADR appear after the suspected drug was administered?",
    "Did the ADR improve when the drug was discontinued a specific antagonist was administered?",
    "Did the adverse reaction reappear when the drug was re-administered?",
    "Are there alternatives causes that could solely have caused the ADR?",
    "Was the drug detected in the blood (or other fluids) in a concentration known to be toxic?",
    "Was the reaction more severe when the dose was increased, or less severe when the dose was decreased?",
    "Did the patient have a similar reaction to the same or similar drugs in any previous exposure?",
    "Was the adverse event confirmed by objective evidence?"
  ];

  const [formData, setFormData] = useState({
    // Header Section
    peripheralCentreCode: 'Ay/AIIA/001',
    adrNumberYear: '',
    treatmentType: 'Ayurveda',
    
    // Section 1: Patient Identification
    patientInitials: '',
    patientRecordNumber: '',
    placeOfBirth: '',
    ipdOpd: 'OPD',
    address: '',
    villageTown: '',
    postVia: '',
    districtState: '',
    age: '',
    sex: '',
    diagnosis: '',
    constitutionTemperament: '',
    
    // Section 2: Adverse Reactions
    initialObservationDate: null,
    reactionDescription: '',
    
    // Section 3: Chronic Disorders
    chronicDisorders: {
      hepatic: false,
      renal: false,
      cardiac: false,
      diabetes: false,
      anyOther: false,
      specifyOther: ''
    },
    
    // Section 4 & 5
    addictions: '',
    previousAllergies: '',
    
    // Section 6: ASU & H Drugs (max 5 rows as per form)
    asuDrugs: Array(5).fill().map(() => ({
      name: '',
      manufacturer: '',
      dose: '',
      form: '',
      startDate: '',
      stoppedContinued: '',
      reasonForUse: '',
      unwantedOccurrences: ''
    })),
    
    // Section 7: Other Drugs (max 4 rows as per form)
    otherDrugs: Array(4).fill().map(() => ({
      name: '',
      manufacturer: '',
      dose: '',
      form: '',
      startDate: '',
      stoppedContinued: '',
      reasonForUse: '',
      unwantedOccurrences: ''
    })),
    
    // Section 8: Suspected Drug Details
    suspectedDrug: {
      name: '',
      manufacturingDate: '',
      expiryDate: '',
      remainingPack: '',
      consumedWith: '',
      dietaryPrecautions: '',
      medicalSupervision: '',
      otherInfo: ''
    },
    
    // Section 9
    managementProvided: '',
    
    // Section 10: Outcome
    outcome: '',
    fatalDate: null,
    severe: '',
    reactionAbated: '',
    reactionReappeared: '',
    hospitalAdmitted: false,
    hospitalNameAddress: '',
    
    // Section 11
    labInvestigations: '',
    
    // Section 12: Reporter Details
    reporterType: 'Doctor',
    reporterOtherSpecify: '',
    reporterName: '',
    reporterAddress: '',
    reporterPhoneEmail: '',
    reportDate: new Date(),
    reporterSignature: '',
    
    // ADR Probability Scale
    adrScale: adrQuestions.map(() => ''),
    
    // Suspected Adverse Event
    eventGrade: '',
    eventSeriousness: '',
    eventDueTo: '',
    otherFactors: '',
    
    // Program Coordinator
    coordinatorSignature: ''
  });

  // Initialize on component mount
  useEffect(() => {
    // Load patient options
    const patientOptionsData = indianPatients.map(patient => ({
      value: patient._id,
      label: `${patient.name} - ${patient.city}, ${patient.state}`,
      patientData: patient
    }));
    setPatientOptions(patientOptionsData);
    
    // Generate ADR number
    generateADRNumber();
    
    // Auto-fill reporter info
    autoFillReporterInfo();
  }, []);

  const generateADRNumber = () => {
    const year = new Date().getFullYear();
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    setFormData(prev => ({
      ...prev,
      adrNumberYear: `${randomNum}/${year}`
    }));
  };

  const autoFillReporterInfo = () => {
    // Set default reporter info
    setFormData(prev => ({
      ...prev,
      reporterName: 'Dr. Sanjay Gupta',
      reporterPhoneEmail: '9876543210 / dr.sanjay@ayurvedacenter.com',
      reporterAddress: 'Ayurveda Research Center, Mathura Road, New Delhi - 110076',
      reporterSignature: 'Dr. Sanjay Gupta'
    }));
  };

  const handleAutofill = () => {
    if (!selectedPatientId) {
      alert('Please select a patient first');
      return;
    }

    setAutofillLoading(true);
    
    // Find selected patient
    const selectedPatient = indianPatients.find(p => p._id === selectedPatientId);
    
    if (!selectedPatient) {
      alert('Patient data not found');
      setAutofillLoading(false);
      return;
    }

    // Calculate age from date of birth
    const calculateAge = (dob) => {
      if (!dob) return '';
      const birthDate = new Date(dob);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age.toString();
    };

    // Get initials from name
    const getInitials = (name) => {
      if (!name) return '';
      return name.split(' ').map(word => word[0]).join('').toUpperCase();
    };

    // Map chronic conditions
    const chronicConditions = selectedPatient.chronicConditions || [];
    const chronicDisorders = {
      hepatic: chronicConditions.some(cond => cond.toLowerCase().includes('hepatic') || cond.toLowerCase().includes('liver')),
      renal: chronicConditions.some(cond => cond.toLowerCase().includes('renal') || cond.toLowerCase().includes('kidney')),
      cardiac: chronicConditions.some(cond => cond.toLowerCase().includes('cardiac') || cond.toLowerCase().includes('heart')),
      diabetes: chronicConditions.some(cond => cond.toLowerCase().includes('diabetes')),
      anyOther: chronicConditions.some(cond => 
        !['hepatic', 'liver', 'renal', 'kidney', 'cardiac', 'heart', 'diabetes'].some(keyword => 
          cond.toLowerCase().includes(keyword)
        )
      ),
      specifyOther: chronicConditions.filter(cond => 
        !['hepatic', 'liver', 'renal', 'kidney', 'cardiac', 'heart', 'diabetes'].some(keyword => 
          cond.toLowerCase().includes(keyword)
        )
      ).join(', ')
    };

    // Auto-fill form data
    setFormData(prev => ({
      ...prev,
      // Section 1
      patientInitials: getInitials(selectedPatient.name),
      patientRecordNumber: `PRN${selectedPatient._id.padStart(4, '0')}`,
      age: calculateAge(selectedPatient.dateOfBirth),
      sex: selectedPatient.gender,
      address: selectedPatient.address,
      villageTown: selectedPatient.city,
      districtState: selectedPatient.state,
      constitutionTemperament: selectedPatient.prakriti || selectedPatient.constitution || '',
      diagnosis: selectedPatient.currentImbalance || '',
      
      // Section 3
      chronicDisorders: chronicDisorders,
      
      // Section 4 & 5
      addictions: `${selectedPatient.smokingStatus || 'Non-smoker'}, ${selectedPatient.alcoholConsumption || 'No alcohol'}`,
      previousAllergies: Array.isArray(selectedPatient.allergies) ? 
        selectedPatient.allergies.join(', ') : selectedPatient.allergies || '',
      
      // Section 8
      suspectedDrug: {
        ...prev.suspectedDrug,
        name: selectedPatient.currentMedications?.[0] || '',
        consumedWith: 'Warm water',
        dietaryPrecautions: 'Avoid spicy food'
      },
      
      // Section 6 - Auto-fill first ASU drug if available
      asuDrugs: selectedPatient.currentMedications?.[0] ? [
        {
          name: selectedPatient.currentMedications[0],
          manufacturer: 'Ayush Pharma',
          dose: '500mg',
          form: 'Tablet',
          startDate: new Date().toISOString().split('T')[0],
          stoppedContinued: 'Continued',
          reasonForUse: selectedPatient.currentImbalance || 'General health',
          unwantedOccurrences: ''
        },
        ...prev.asuDrugs.slice(1)
      ] : prev.asuDrugs
    }));

    setTimeout(() => {
      alert('Patient data loaded successfully! Please complete remaining fields.');
      setAutofillLoading(false);
    }, 500);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: type === 'checkbox' ? checked : value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handleDrugChange = (type, index, field, value) => {
    const drugs = [...formData[type]];
    drugs[index][field] = value;
    setFormData(prev => ({
      ...prev,
      [type]: drugs
    }));
  };

  const calculateADRScore = () => {
    const scores = {
      'Yes': [1, 2, 1, 2, -1, 1, 1, 1, 1],
      'No': [0, -1, 0, -1, 2, 0, 0, 0, 0],
      "Don't Know": [0, 0, 0, 0, 0, 0, 0, 0, 0]
    };

    let totalScore = 0;
    formData.adrScale.forEach((answer, index) => {
      if (answer && scores[answer]) {
        totalScore += scores[answer][index];
      }
    });

    return totalScore;
  };

  const getADRCategory = (score) => {
    if (score > 9) return 'Certain';
    if (score >= 5 && score <= 8) return 'Probable';
    if (score >= 1 && score <= 4) return 'Possible';
    return 'Unlikely';
  };

  // PDF Generation Function (Complete)
  const generatePDF = () => {
    const doc = new jsPDF('p', 'mm', 'a4');
    const pageWidth = doc.internal.pageSize.width;
    let yPos = 20;
    
    // Set fonts
    doc.setFont('helvetica');
    
    // ========== PAGE 1: HEADER & SECTIONS 1-5 ==========
    
    // Title
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('Reporting Form for Suspected Adverse Reactions', pageWidth / 2, yPos, { align: 'center' });
    doc.setFontSize(12);
    doc.text('National Pharmacovigilance Program for ASU & H Drugs', pageWidth / 2, yPos + 7, { align: 'center' });
    
    yPos += 15;
    
    // Note
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text('Note: Personal information will be kept confidential. All suspected reactions are to be reported with relevant details.', 14, yPos);
    
    yPos += 10;
    
    // Center Codes Table
    const centerCodesData = [
      ['', 'Ay-AIIA', 'Ay-NIA', 'Ay-IPGT', 'Un-NIUM', 'Si-NIS', 'Ho-NIH'],
      ['Code of Peripheral Centre', '', '', '', `ADR Number / Year: ${formData.adrNumberYear}`, '', '']
    ];
    
    autoTable(doc, {
      startY: yPos,
      head: [centerCodesData[0]],
      body: [centerCodesData[1]],
      theme: 'grid',
      styles: { fontSize: 9, cellPadding: 2, halign: 'center' },
      headStyles: { fillColor: [220, 220, 220] },
      columnStyles: {
        0: { cellWidth: 40 },
        1: { cellWidth: 25 },
        2: { cellWidth: 25 },
        3: { cellWidth: 25 },
        4: { cellWidth: 30 },
        5: { cellWidth: 25 },
        6: { cellWidth: 25 }
      }
    });
    
    yPos = doc.lastAutoTable.finalY + 15;
    
    // Section 1: Patient Identification
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('1. Patient / consumer identification (please complete or tick boxes below as appropriate)', 14, yPos);
    
    yPos += 10;
    
    // Patient info table
    const patientData = [
      [`Patient Initials: ${formData.patientInitials}`, `Patient Record Number (PRN): ${formData.patientRecordNumber}`],
      [`Place of Birth: ${formData.placeOfBirth}`, `IPD / OPD: ${formData.ipdOpd}`],
      [`Address: ${formData.address}`, `Age: ${formData.age}`],
      [`Village / Town: ${formData.villageTown}`, `Sex: ${formData.sex}`],
      [`Post / Via: ${formData.postVia}`, ''],
      [`District / State: ${formData.districtState}`, ''],
      [`Diagnosis: ${formData.diagnosis}`, `Constitution and Temperament: ${formData.constitutionTemperament}`]
    ];
    
    autoTable(doc, {
      startY: yPos,
      body: patientData,
      theme: 'grid',
      styles: { fontSize: 9, cellPadding: 3 },
      columnStyles: {
        0: { cellWidth: 90 },
        1: { cellWidth: 90 }
      }
    });
    
    yPos = doc.lastAutoTable.finalY + 15;
    
    // Section 2: Adverse Reactions
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('2. Description of the suspected Adverse Reactions', 14, yPos);
    
    yPos += 10;
    
    const reactionData = [
      [`Date and time of initial observation: ${formData.initialObservationDate ? new Date(formData.initialObservationDate).toLocaleString('en-IN') : ''}`],
      [`Description of reaction: ${formData.reactionDescription}`]
    ];
    
    autoTable(doc, {
      startY: yPos,
      body: reactionData,
      theme: 'grid',
      styles: { fontSize: 9, cellPadding: 3 }
    });
    
    yPos = doc.lastAutoTable.finalY + 15;
    
    // Section 3: Chronic Disorders
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('3. Whether the patient is suffering with any chronic disorders?', 14, yPos);
    
    yPos += 10;
    
    const chronicDisordersText = [
      'Hepatic: ' + (formData.chronicDisorders.hepatic ? '✓' : ''),
      'Renal: ' + (formData.chronicDisorders.renal ? '✓' : ''),
      'Cardiac: ' + (formData.chronicDisorders.cardiac ? '✓' : ''),
      'Diabetes: ' + (formData.chronicDisorders.diabetes ? '✓' : ''),
      'Any Others: ' + (formData.chronicDisorders.anyOther ? formData.chronicDisorders.specifyOther : '')
    ].filter(item => !item.endsWith(': ')).join(', ');
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(chronicDisordersText || 'None reported', 14, yPos);
    
    yPos += 15;
    
    // Section 4: Addictions
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('4. Addictions, if any? If yes, please specify:', 14, yPos);
    
    yPos += 7;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(formData.addictions || 'None reported', 14, yPos);
    
    yPos += 15;
    
    // Section 5: Allergies
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('5. H/O previous allergies / Drug reactions, if any:', 14, yPos);
    
    yPos += 7;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(formData.previousAllergies || 'None reported', 14, yPos);
    
    yPos += 20;
    
    // Check if we need a new page
    if (yPos > 250) {
      doc.addPage();
      yPos = 20;
    }
    
    // ========== PAGE 2: SECTIONS 6 & 7 ==========
    
    // Section 6: ASU & H Drugs Table
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('6. List of all ASU & H drugs used by the patient during the period of one month:', 14, yPos);
    
    yPos += 10;
    
    // Filter out empty drug rows
    const nonEmptyAsuDrugs = formData.asuDrugs.filter(drug => 
      drug.name || drug.manufacturer || drug.dose || drug.form
    );
    
    if (nonEmptyAsuDrugs.length > 0) {
      const asuHeaders = [
        'Name of drug',
        'Manufacturer/Batch',
        'Dose',
        'Form/Route',
        'Date Start',
        'Stopped/Cont.',
        'Reason',
        'Occurrences'
      ];
      
      const asuTableData = nonEmptyAsuDrugs.map(drug => [
        drug.name || '',
        drug.manufacturer || '',
        drug.dose || '',
        drug.form || '',
        drug.startDate || '',
        drug.stoppedContinued || '',
        drug.reasonForUse || '',
        drug.unwantedOccurrences || ''
      ]);
      
      autoTable(doc, {
        startY: yPos,
        head: [asuHeaders],
        body: asuTableData,
        theme: 'grid',
        styles: { fontSize: 7, cellPadding: 2 },
        headStyles: { fillColor: [220, 220, 220] },
        tableWidth: 'wrap',
        margin: { left: 14, right: 14 }
      });
      
      yPos = doc.lastAutoTable.finalY + 15;
    } else {
      yPos += 10;
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.text('No ASU & H drugs reported', 14, yPos);
      yPos += 15;
    }
    
    // Section 7: Other Drugs Table
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('7. List of other drugs used by the patient during the period of one month:', 14, yPos);
    
    yPos += 10;
    
    // Filter out empty drug rows
    const nonEmptyOtherDrugs = formData.otherDrugs.filter(drug => 
      drug.name || drug.manufacturer || drug.dose || drug.form
    );
    
    if (nonEmptyOtherDrugs.length > 0) {
      const otherHeaders = [
        'Name of drug',
        'Manufacturer/Batch',
        'Dose',
        'Form/Route',
        'Date Start',
        'Stopped/Cont.',
        'Reason',
        'Occurrences'
      ];
      
      const otherTableData = nonEmptyOtherDrugs.map(drug => [
        drug.name || '',
        drug.manufacturer || '',
        drug.dose || '',
        drug.form || '',
        drug.startDate || '',
        drug.stoppedContinued || '',
        drug.reasonForUse || '',
        drug.unwantedOccurrences || ''
      ]);
      
      autoTable(doc, {
        startY: yPos,
        head: [otherHeaders],
        body: otherTableData,
        theme: 'grid',
        styles: { fontSize: 7, cellPadding: 2 },
        headStyles: { fillColor: [220, 220, 220] },
        tableWidth: 'wrap',
        margin: { left: 14, right: 14 }
      });
      
      yPos = doc.lastAutoTable.finalY + 15;
    } else {
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.text('No other drugs reported', 14, yPos);
      yPos += 10;
    }
    
    // ========== PAGE 3: SECTIONS 8-11 ==========
    doc.addPage();
    yPos = 20;
    
    // Section 8: Suspected Drug Details
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('8. Details of the drug suspected to cause ADR:', 14, yPos);
    
    yPos += 10;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    
    const suspectedDrugInfo = [
      `a. Name of the drug: ${formData.suspectedDrug.name}`,
      `b. Manufacturing date and Expiry date: ${formData.suspectedDrug.manufacturingDate} / ${formData.suspectedDrug.expiryDate}`,
      `c. Remaining pack / label: ${formData.suspectedDrug.remainingPack}`,
      `d. Consumed orally along with: ${formData.suspectedDrug.consumedWith}`,
      `e. Dietary precautions: ${formData.suspectedDrug.dietaryPrecautions}`,
      `f. Medical supervision: ${formData.suspectedDrug.medicalSupervision}`,
      `g. Other information: ${formData.suspectedDrug.otherInfo}`
    ];
    
    suspectedDrugInfo.forEach((line, index) => {
      doc.text(line, 14, yPos + (index * 5));
    });
    
    yPos += 35;
    
    // Section 9: Management
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('9. Management provided / taken for suspected adverse reaction', 14, yPos);
    
    yPos += 7;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(formData.managementProvided || 'Not specified', 14, yPos);
    
    yPos += 15;
    
    // Section 10: Outcome
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('10. Please indicate outcome of the suspected adverse reaction (tick appropriate)', 14, yPos);
    
    yPos += 10;
    
    const outcomeText = [
      `Recovered: ${formData.outcome === 'Recovered' ? '✓' : ''}`,
      `Not recovered: ${formData.outcome === 'Not recovered' ? '✓' : ''}`,
      `Unknown: ${formData.outcome === 'Unknown' ? '✓' : ''}`,
      `Fatal: ${formData.outcome === 'Fatal' ? '✓' : ''}`,
      formData.fatalDate ? `If Fatal Date of death: ${new Date(formData.fatalDate).toLocaleDateString('en-IN')}` : ''
    ].filter(text => text).join(' | ');
    
    doc.setFontSize(10);
    doc.text(outcomeText, 14, yPos);
    
    yPos += 7;
    
    const severityText = [
      `Severe: Yes ${formData.severe === 'Yes' ? '✓' : ''} / No ${formData.severe === 'No' ? '✓' : ''}`,
      `Reaction abated: ${formData.reactionAbated}`,
      `Reaction reappeared: ${formData.reactionReappeared}`
    ].filter(text => text).join(' | ');
    
    doc.text(severityText, 14, yPos);
    
    yPos += 7;
    
    doc.text(`Hospital admission: ${formData.hospitalAdmitted ? formData.hospitalNameAddress : 'No'}`, 14, yPos);
    
    yPos += 15;
    
    // Section 11: Lab Investigations
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('11. Any abnormal findings of relevant laboratory investigations:', 14, yPos);
    
    yPos += 7;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(formData.labInvestigations || 'Not reported', 14, yPos);
    
    // ========== PAGE 4: SECTION 12 & CONTACT ==========
    doc.addPage();
    yPos = 20;
    
    // Section 12: Reporter Details
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('12. Particulars of ADR Reporter:', 14, yPos);
    
    yPos += 10;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    
    const reporterInfo = [
      `Please tick: ${formData.reporterType}${formData.reporterOtherSpecify ? ` (${formData.reporterOtherSpecify})` : ''}`,
      `Name: ${formData.reporterName}`,
      `Address: ${formData.reporterAddress}`,
      `Telephone / E-mail: ${formData.reporterPhoneEmail}`,
      `Signature of the reporter: ${formData.reporterSignature}`,
      `Date: ${formData.reportDate ? new Date(formData.reportDate).toLocaleDateString('en-IN') : ''}`
    ];
    
    reporterInfo.forEach((line, index) => {
      doc.text(line, 14, yPos + (index * 5));
    });
    
    yPos += 35;
    
    // Contact Information
    doc.text('Please send the completed form to: The centre from where the form is received or to', 14, yPos);
    yPos += 5;
    doc.text('The Coordinator, National Pharmacovigilance Coordination Centre (NPvCC)', 14, yPos);
    yPos += 5;
    doc.text('All India Institute of Ayurveda (AIIA), Mathura Road, Gautam Puri,', 14, yPos);
    yPos += 5;
    doc.text('Sarita Vihar, New Delhi - 110 076', 14, yPos);
    yPos += 5;
    doc.text('E-mail: pharmacovigilanceayush@gmail.com, ayush-pharmavig@aiia.gov.in', 14, yPos);
    
    // ========== PAGE 5: ADR PROBABILITY SCALE ==========
    doc.addPage();
    yPos = 20;
    
    // ADR Probability Scale
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('The ADR Probability Scale', pageWidth / 2, yPos, { align: 'center' });
    
    yPos += 7;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'italic');
    doc.text('(Program Coordinator has to fill this scale)', pageWidth / 2, yPos, { align: 'center' });
    
    yPos += 10;
    
    // ADR Scale Table
    const adrHeaders = ['Questions', 'Yes', 'No', "Don't Know"];
    const adrData = adrQuestions.map((question, index) => [
      question,
      formData.adrScale[index] === 'Yes' ? '✓' : '',
      formData.adrScale[index] === 'No' ? '✓' : '',
      formData.adrScale[index] === "Don't Know" ? '✓' : ''
    ]);
    
    autoTable(doc, {
      startY: yPos,
      head: [adrHeaders],
      body: adrData,
      theme: 'grid',
      styles: { fontSize: 8, cellPadding: 2 },
      headStyles: { fillColor: [220, 220, 220] },
      columnStyles: {
        0: { cellWidth: 100 },
        1: { cellWidth: 15, halign: 'center' },
        2: { cellWidth: 15, halign: 'center' },
        3: { cellWidth: 25, halign: 'center' }
      },
      margin: { left: 14, right: 14 }
    });
    
    yPos = doc.lastAutoTable.finalY + 10;
    
    // Calculate and display total score
    const totalScore = calculateADRScore();
    const adrCategory = getADRCategory(totalScore);
    
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text(`Total Score: ${totalScore}`, 14, yPos);
    doc.text(`Category: ${adrCategory}`, pageWidth - 14, yPos, { align: 'right' });
    
    yPos += 5;
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.text('Score: > 9 = Certain;    5-8 = Probable;    1-4 = Possible;    0 = Unlikely', 14, yPos);
    
    // ========== PAGE 6: SUSPECTED ADVERSE EVENT ==========
    doc.addPage();
    yPos = 30;
    
    // Suspected Adverse Event
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('The Suspected Adverse Event', pageWidth / 2, yPos, { align: 'center' });
    
    yPos += 15;
    doc.setFontSize(12);
    
    // Grade
    const grades = ['Grade - 1 (Mild)', 'Grade - 2 (Moderate)', 'Grade - 3 (Severe)', 'Grade - 4 (Threatening)'];
    grades.forEach((grade, index) => {
      const check = formData.eventGrade === grade ? '✓' : '□';
      doc.text(`${check} ${grade}`, 50, yPos + (index * 7));
    });
    
    yPos += 35;
    
    // Seriousness
    const seriousness = ['Serious', 'Non-Serious'];
    seriousness.forEach((type, index) => {
      const check = formData.eventSeriousness === type ? '✓' : '□';
      doc.text(`${check} ${type}`, 50, yPos + (index * 7));
    });
    
    yPos += 20;
    
    // Due To
    const dueTo = ['Physician', 'Patient', 'Drug', 'Other factors*'];
    dueTo.forEach((type, index) => {
      const check = formData.eventDueTo === type ? '✓' : '□';
      doc.text(`${check} ${type}`, 50, yPos + (index * 7));
    });
    
    if (formData.eventDueTo === 'Other factors*' && formData.otherFactors) {
      doc.text(`* ${formData.otherFactors}`, 55, yPos + 28);
    }
    
    yPos += 40;
    
    // Program Coordinator Signature
    doc.text(`Program Coordinator Signature: ${formData.coordinatorSignature}`, 50, yPos);
    yPos += 10;
    doc.line(50, yPos, 120, yPos);
    
    // Save PDF
    const fileName = `ADR_Report_${formData.patientInitials || 'Patient'}_${formData.adrNumberYear.replace('/', '_')}.pdf`;
    doc.save(fileName);
  };

  // File Upload Functions
  const handleFileSelect = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Check if it's a PDF
    if (file.type !== 'application/pdf') {
      alert('Please select a PDF file');
      return;
    }

    const patientEmail = "vedantkhasbage2005@gmail.com";
    const doctorEmail = "itsvedantk@gmail.com";
    
    console.log("Selected file:", file.name);
    
    // Here you can handle the file upload
    await handleFileUpload(file, patientEmail, doctorEmail);
  };

  const handleFileUpload = async (file, patientEmail, doctorEmail) => {
    // Create FormData for file upload
    const formDataToSend = new FormData();
    formDataToSend.append('pdf', file);
    formDataToSend.append('patientEmail', patientEmail);
    formDataToSend.append('doctorEmail', doctorEmail);
    formDataToSend.append('patientName', formData.patientInitials || 'Patient');
    formDataToSend.append('reporterName', formData.reporterName || 'Reporter');
    formDataToSend.append('adrNumberYear', formData.adrNumberYear);

    try {
      // API call to upload PDF
      const response = await fetch('http://localhost:3000/PanchKarmaCenter/submit-report', {
        method: 'POST',
        body: formDataToSend,
      });
      
      if (response.ok) {
        const result = await response.json();
        console.log('File uploaded successfully:', result);
        alert('Report submitted and email sent successfully!');
        // Handle success (show message, reset form, etc.)
      } else {
        console.error('Upload failed');
        alert('Failed to submit report. Please try again.');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Error uploading file. Please try again.');
    }
  };

  // Main Form Submission Handler
   // In your frontend component, update the handleSubmit function:
const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  
  try {
    // Calculate ADR score and category
    const adrScore = calculateADRScore();
    const adrCategory = getADRCategory(adrScore);
    
    // Prepare submit data
    const submitData = {
      ...formData,
      adrScore,
      adrCategory,
      submittedAt: new Date().toISOString(),
      patientId: selectedPatientId
    };
    
    // First generate the PDF
    const pdfDoc = new jsPDF();
    const pageWidth = pdfDoc.internal.pageSize.width;
    
    // Add content to PDF
    pdfDoc.setFontSize(16);
    pdfDoc.text('ADR Report', pageWidth / 2, 20, { align: 'center' });
    pdfDoc.setFontSize(12);
    pdfDoc.text(`Patient: ${formData.patientInitials}`, 14, 40);
    pdfDoc.text(`ADR Number: ${formData.adrNumberYear}`, 14, 50);
    pdfDoc.text(`Reaction: ${formData.reactionDescription.substring(0, 100)}...`, 14, 60);
    pdfDoc.text(`Date: ${new Date().toLocaleDateString()}`, 14, 70);
    
    // Convert PDF to blob
    const pdfBlob = pdfDoc.output('blob');
    
    // Create FormData for upload
    const formDataToSend = new FormData();
    formDataToSend.append('pdf', pdfBlob, `ADR_Report_${formData.patientInitials}_${formData.adrNumberYear.replace('/', '_')}.pdf`);
    formDataToSend.append('patientEmail', patientEmail || "vedantkhasbage2005@gmail.com");
    formDataToSend.append('doctorEmail', DoctorEmail || "itsvedantk@gmail.com");
    formDataToSend.append('patientName', formData.patientInitials || 'Patient');
    formDataToSend.append('reporterName', formData.reporterName || 'Reporter');
    formDataToSend.append('adrNumberYear', formData.adrNumberYear);
    formDataToSend.append('formData', JSON.stringify(submitData));
    
    // Send to backend
    const response = await fetch('/api/panchakarma/submit-report', {
      method: 'POST',
      body: formDataToSend,
      // Don't set Content-Type header - FormData sets it automatically
    });
    
    const result = await response.json();
    
    if (result.success) {
      alert('ADR Report submitted successfully! Email has been sent.');
      console.log('Submission successful:', result);
      
      // Optional: Clear form
      // window.location.reload();
    } else {
      throw new Error(result.message || 'Submission failed');
    }
    
  } catch (error) {
    console.error('Error submitting form:', error);
    alert(`Failed to submit report: ${error.message}`);
  } finally {
    setLoading(false);
  }
};

  // Helper function to generate PDF as blob
  const generatePDFAsBlob = () => {
    return new Promise((resolve) => {
      const doc = new jsPDF('p', 'mm', 'a4');
      const pageWidth = doc.internal.pageSize.width;
      let yPos = 20;
      
      // Add minimal content for testing
      doc.setFontSize(16);
      doc.setFont('helvetica', 'bold');
      doc.text('ADR Report', pageWidth / 2, yPos, { align: 'center' });
      
      yPos += 10;
      doc.setFontSize(12);
      doc.setFont('helvetica', 'normal');
      doc.text(`Patient: ${formData.patientInitials}`, 14, yPos);
      yPos += 7;
      doc.text(`ADR Number: ${formData.adrNumberYear}`, 14, yPos);
      yPos += 7;
      doc.text(`Reaction: ${formData.reactionDescription}`, 14, yPos);
      
      // Convert to blob
      const pdfBlob = doc.output('blob');
      resolve(pdfBlob);
    });
  };

  const reporterOptions = [
    { value: 'Patient', label: 'Patient' },
    { value: 'Attendant', label: 'Attendant' },
    { value: 'Nurse', label: 'Nurse' },
    { value: 'Doctor', label: 'Doctor' },
    { value: 'Pharmacist', label: 'Pharmacist' },
    { value: 'Health worker', label: 'Health worker' },
    { value: 'Drug Manufacturer', label: 'Drug Manufacturer' },
    { value: 'Other', label: 'Other' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50">
      <Navbar />
      
      {/* Hidden file input for manual PDF upload */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        accept=".pdf,application/pdf"
        className="hidden"
      />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 border border-blue-300">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Reporting Form for Suspected Adverse Reactions
              </h1>
              <p className="text-gray-600 text-lg">
                National Pharmacovigilance Program for ASU & H Drugs
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-lg shadow">
                <div className="text-sm font-semibold">ADR Number</div>
                <div className="text-xl font-bold">{formData.adrNumberYear}</div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-yellow-800 text-sm flex items-center">
              <i className="fas fa-info-circle mr-2"></i>
              <span>Personal information will be kept confidential. All suspected reactions are to be reported with relevant details.</span>
            </p>
          </div>
        </div>

        {/* Patient Selection & Autofill */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 border border-blue-300">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Patient Selection</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Select Patient <span className="text-red-500">*</span>
              </label>
              <Select
                options={patientOptions}
                onChange={(selected) => setSelectedPatientId(selected?.value || '')}
                placeholder="Search and select patient..."
                isLoading={loading}
                isClearable
                className="basic-single"
                classNamePrefix="select"
                noOptionsMessage={() => "No patients found"}
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Center Code
              </label>
              <input
                type="text"
                name="peripheralCentreCode"
                value={formData.peripheralCentreCode}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                placeholder="Enter center code"
              />
            </div>
          </div>
          
          <div className="flex flex-wrap gap-4">
            <button
              type="button"
              onClick={handleAutofill}
              disabled={!selectedPatientId || autofillLoading}
              className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-medium rounded-lg transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              {autofillLoading ? (
                <>
                  <i className="fas fa-spinner fa-spin mr-2"></i>
                  Loading Patient Data...
                </>
              ) : (
                <>
                  <i className="fas fa-user-check mr-2"></i>
                  Auto-fill Patient Information
                </>
              )}
            </button>
            
            <button
              type="button"
              onClick={generatePDF}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium rounded-lg transition-all duration-300 shadow-md hover:shadow-lg flex items-center"
            >
              <i className="fas fa-download mr-2"></i>
              Download as PDF
            </button>

            <button
              type="button"
              onClick={() => fileInputRef.current.click()}
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-medium rounded-lg transition-all duration-300 shadow-md hover:shadow-lg flex items-center"
            >
              <i className="fas fa-upload mr-2"></i>
              Upload Existing PDF
            </button>
          </div>
          
          {selectedPatientId && (
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center text-blue-700">
                <i className="fas fa-lightbulb mr-2"></i>
                <span className="text-sm">
                  Click "Auto-fill Patient Information" to populate patient data from the database
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Main Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl border border-blue-300 overflow-hidden">
          
          {/* Treatment Type */}
          <div className="p-6 border-b border-gray-300">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Treatment Type</h2>
            <div className="flex flex-wrap gap-6">
              {['Ayurveda', 'Siddha', 'Unani', 'Homoeopathy'].map((type) => (
                <label key={type} className="flex items-center space-x-3 cursor-pointer group">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${formData.treatmentType === type ? 'border-blue-500 bg-blue-500' : 'border-gray-300'}`}>
                    {formData.treatmentType === type && <div className="w-3 h-3 rounded-full bg-white"></div>}
                  </div>
                  <span className="text-gray-700 group-hover:text-blue-600 transition-colors">{type}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Section 1: Patient Identification */}
          <div className="p-6 border-b border-gray-300">
            <div className="flex items-center mb-6">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-3 rounded-lg mr-4">
                <span className="font-bold text-xl">1</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Patient / Consumer Identification</h2>
                <p className="text-gray-600 text-sm">(please complete or tick boxes below as appropriate)</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Patient Initials <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="patientInitials"
                  value={formData.patientInitials}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  required
                  maxLength={3}
                  placeholder="RK"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Patient Record Number (PRN)
                </label>
                <input
                  type="text"
                  name="patientRecordNumber"
                  value={formData.patientRecordNumber}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  placeholder="PRN001"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Place of Birth
                </label>
                <input
                  type="text"
                  name="placeOfBirth"
                  value={formData.placeOfBirth}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  placeholder="Place of birth"
                />
              </div>
              
              <div className="lg:col-span-3">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  IPD / OPD <span className="text-red-500">*</span>
                </label>
                <div className="flex space-x-6">
                  {['IPD', 'OPD'].map((type) => (
                    <label key={type} className="flex items-center space-x-3 cursor-pointer group">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${formData.ipdOpd === type ? 'border-blue-500' : 'border-gray-300'}`}>
                        {formData.ipdOpd === type && <div className="w-2.5 h-2.5 rounded-full bg-blue-500"></div>}
                      </div>
                      <span className="text-gray-700 group-hover:text-blue-600">{type}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Complete Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  placeholder="Full address"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Village / Town
                </label>
                <input
                  type="text"
                  name="villageTown"
                  value={formData.villageTown}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  placeholder="City/Town"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Post / Via
                </label>
                <input
                  type="text"
                  name="postVia"
                  value={formData.postVia}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  placeholder="Postal area"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  District / State
                </label>
                <input
                  type="text"
                  name="districtState"
                  value={formData.districtState}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  placeholder="District, State"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Age (in years) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  min="0"
                  max="120"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Sex
                </label>
                <div className="flex space-x-6">
                  {['Male', 'Female', 'Others'].map((gender) => (
                    <label key={gender} className="flex items-center space-x-3 cursor-pointer group">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${formData.sex === gender ? 'border-blue-500' : 'border-gray-300'}`}>
                        {formData.sex === gender && <div className="w-2.5 h-2.5 rounded-full bg-blue-500"></div>}
                      </div>
                      <span className="text-gray-700 group-hover:text-blue-600">{gender}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Diagnosis
                </label>
                <textarea
                  name="diagnosis"
                  value={formData.diagnosis}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  placeholder="Enter diagnosis details"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Constitution and Temperament
                </label>
                <textarea
                  name="constitutionTemperament"
                  value={formData.constitutionTemperament}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  placeholder="Describe constitution and temperament"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Adverse Reactions */}
          <div className="p-6 border-b border-gray-300">
            <div className="flex items-center mb-6">
              <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-3 rounded-lg mr-4">
                <span className="font-bold text-xl">2</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Description of the suspected Adverse Reactions</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Date and time of initial observation
                </label>
                <DatePicker
                  selected={formData.initialObservationDate}
                  onChange={(date) => setFormData(prev => ({ ...prev, initialObservationDate: date }))}
                  showTimeSelect
                  dateFormat="dd/MM/yyyy hh:mm aa"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  placeholderText="Select date and time"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Description of reaction
                </label>
                <textarea
                  name="reactionDescription"
                  value={formData.reactionDescription}
                  onChange={handleInputChange}
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  placeholder="Describe the adverse reaction in detail"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Chronic Disorders */}
          <div className="p-6 border-b border-gray-300">
            <div className="flex items-center mb-6">
              <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white p-3 rounded-lg mr-4">
                <span className="font-bold text-xl">3</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Whether the patient is suffering with any chronic disorders?</h2>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
              {['hepatic', 'renal', 'cardiac', 'diabetes', 'anyOther'].map((disorder) => (
                <label key={disorder} className="flex items-center space-x-3 cursor-pointer group">
                  <div className="w-5 h-5 border-2 border-gray-300 rounded flex items-center justify-center group-hover:border-blue-400">
                    <input
                      type="checkbox"
                      name={`chronicDisorders.${disorder}`}
                      checked={formData.chronicDisorders[disorder]}
                      onChange={handleInputChange}
                      className="opacity-0 absolute w-5 h-5 cursor-pointer"
                    />
                    {formData.chronicDisorders[disorder] && (
                      <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                      </svg>
                    )}
                  </div>
                  <span className="text-gray-700 capitalize group-hover:text-blue-600">
                    {disorder.replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                </label>
              ))}
            </div>
            
            {formData.chronicDisorders.anyOther && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Specify, if others
                </label>
                <input
                  type="text"
                  name="chronicDisorders.specifyOther"
                  value={formData.chronicDisorders.specifyOther}
                  onChange={handleInputChange}
                  className="w-full md:w-1/2 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  placeholder="Specify other chronic disorders"
                />
              </div>
            )}
          </div>

          {/* Section 4 & 5: Addictions & Allergies */}
          <div className="p-6 border-b border-gray-300">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <div className="flex items-center mb-4">
                  <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-2 rounded-lg mr-3">
                    <span className="font-bold">4</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-800">Addictions, if any? If yes, please specify:</h3>
                </div>
                <textarea
                  name="addictions"
                  value={formData.addictions}
                  onChange={handleInputChange}
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  placeholder="Specify addictions if any"
                />
              </div>
              
              <div>
                <div className="flex items-center mb-4">
                  <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-2 rounded-lg mr-3">
                    <span className="font-bold">5</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-800">H/O previous allergies / Drug reactions, if any:</h3>
                </div>
                <textarea
                  name="previousAllergies"
                  value={formData.previousAllergies}
                  onChange={handleInputChange}
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  placeholder="Specify previous allergies or drug reactions"
                />
              </div>
            </div>
          </div>

          {/* Section 6: ASU & H Drugs Table */}
          <div className="p-6 border-b border-gray-300">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-3 rounded-lg mr-4">
                  <span className="font-bold text-xl">6</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-800">List of all ASU & H drugs used by the patient during the period of one month</h2>
              </div>
              <div className="text-sm text-gray-500">(5 rows maximum)</div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Name of the drug</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Manufacturer / Batch no.</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Dose</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Form / Route</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Date of Starting</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Stopped / Continued</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Reason for use</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Any unwanted occurrences</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {formData.asuDrugs.map((drug, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <input
                          type="text"
                          value={drug.name}
                          onChange={(e) => handleDrugChange('asuDrugs', index, 'name', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                          placeholder="Drug name"
                        />
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <input
                          type="text"
                          value={drug.manufacturer}
                          onChange={(e) => handleDrugChange('asuDrugs', index, 'manufacturer', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                          placeholder="Manufacturer"
                        />
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <input
                          type="text"
                          value={drug.dose}
                          onChange={(e) => handleDrugChange('asuDrugs', index, 'dose', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                          placeholder="Dosage"
                        />
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <input
                          type="text"
                          value={drug.form}
                          onChange={(e) => handleDrugChange('asuDrugs', index, 'form', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                          placeholder="Tablet, Capsule, etc."
                        />
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <input
                          type="date"
                          value={drug.startDate}
                          onChange={(e) => handleDrugChange('asuDrugs', index, 'startDate', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                        />
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <select
                          value={drug.stoppedContinued}
                          onChange={(e) => handleDrugChange('asuDrugs', index, 'stoppedContinued', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                        >
                          <option value="">Select</option>
                          <option value="Stopped">Stopped</option>
                          <option value="Continued">Continued</option>
                        </select>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <input
                          type="text"
                          value={drug.reasonForUse}
                          onChange={(e) => handleDrugChange('asuDrugs', index, 'reasonForUse', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                          placeholder="Reason for use"
                        />
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <input
                          type="text"
                          value={drug.unwantedOccurrences}
                          onChange={(e) => handleDrugChange('asuDrugs', index, 'unwantedOccurrences', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                          placeholder="Side effects"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Section 7: Other Drugs Table (similar structure) */}
          <div className="p-6 border-b border-gray-300">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <div className="bg-gradient-to-r from-teal-500 to-teal-600 text-white p-3 rounded-lg mr-4">
                  <span className="font-bold text-xl">7</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-800">List of other drugs used by the patient during the period of one month</h2>
              </div>
              <div className="text-sm text-gray-500">(4 rows maximum)</div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Name of the drug</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Manufacturer / Batch no.</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Dose</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Form / Route</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Date of Starting</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Stopped / Continued</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Reason for use</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Any unwanted occurrences</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {formData.otherDrugs.map((drug, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <input
                          type="text"
                          value={drug.name}
                          onChange={(e) => handleDrugChange('otherDrugs', index, 'name', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                          placeholder="Drug name"
                        />
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <input
                          type="text"
                          value={drug.manufacturer}
                          onChange={(e) => handleDrugChange('otherDrugs', index, 'manufacturer', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                          placeholder="Manufacturer"
                        />
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <input
                          type="text"
                          value={drug.dose}
                          onChange={(e) => handleDrugChange('otherDrugs', index, 'dose', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                          placeholder="Dosage"
                        />
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <input
                          type="text"
                          value={drug.form}
                          onChange={(e) => handleDrugChange('otherDrugs', index, 'form', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                          placeholder="Tablet, Capsule, etc."
                        />
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <input
                          type="date"
                          value={drug.startDate}
                          onChange={(e) => handleDrugChange('otherDrugs', index, 'startDate', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                        />
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <select
                          value={drug.stoppedContinued}
                          onChange={(e) => handleDrugChange('otherDrugs', index, 'stoppedContinued', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                        >
                          <option value="">Select</option>
                          <option value="Stopped">Stopped</option>
                          <option value="Continued">Continued</option>
                        </select>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <input
                          type="text"
                          value={drug.reasonForUse}
                          onChange={(e) => handleDrugChange('otherDrugs', index, 'reasonForUse', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                          placeholder="Reason for use"
                        />
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <input
                          type="text"
                          value={drug.unwantedOccurrences}
                          onChange={(e) => handleDrugChange('otherDrugs', index, 'unwantedOccurrences', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                          placeholder="Side effects"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Section 8: Suspected Drug Details */}
          <div className="p-6 border-b border-gray-300">
            <div className="flex items-center mb-6">
              <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-3 rounded-lg mr-4">
                <span className="font-bold text-xl">8</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Details of the drug suspected to cause ADR</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  a. Name of the drug
                </label>
                <input
                  type="text"
                  value={formData.suspectedDrug.name}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    suspectedDrug: { ...prev.suspectedDrug, name: e.target.value }
                  }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  placeholder="Name of suspected drug"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  d. Consumed orally along with (water / milk / honey / or any other)
                </label>
                <input
                  type="text"
                  value={formData.suspectedDrug.consumedWith}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    suspectedDrug: { ...prev.suspectedDrug, consumedWith: e.target.value }
                  }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  placeholder="e.g., Warm water, Milk, etc."
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  e. Whether any dietary precautions have been prescribed? If yes, please specify:
                </label>
                <textarea
                  value={formData.suspectedDrug.dietaryPrecautions}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    suspectedDrug: { ...prev.suspectedDrug, dietaryPrecautions: e.target.value }
                  }))}
                  rows="3"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  placeholder="Specify dietary precautions if any"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  g. Any other relevant information associated with drug use:
                </label>
                <textarea
                  value={formData.suspectedDrug.otherInfo}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    suspectedDrug: { ...prev.suspectedDrug, otherInfo: e.target.value }
                  }))}
                  rows="3"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  placeholder="Any other relevant information"
                />
              </div>
            </div>
          </div>

          {/* Section 9: Management */}
          <div className="p-6 border-b border-gray-300">
            <div className="flex items-center mb-6">
              <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white p-3 rounded-lg mr-4">
                <span className="font-bold text-xl">9</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Management provided / taken for suspected adverse reaction</h2>
            </div>
            
            <div>
              <textarea
                name="managementProvided"
                value={formData.managementProvided}
                onChange={handleInputChange}
                rows="4"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                placeholder="Describe the management provided or taken for the adverse reaction"
              />
            </div>
          </div>

          {/* Section 10: Outcome */}
          <div className="p-6 border-b border-gray-300">
            <div className="flex items-center mb-6">
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-3 rounded-lg mr-4">
                <span className="font-bold text-xl">10</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Please indicate outcome of the suspected adverse reaction</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Outcome
                </label>
                <div className="space-y-2">
                  {['Recovered', 'Not recovered', 'Unknown', 'Fatal'].map((outcome) => (
                    <label key={outcome} className="flex items-center space-x-3 cursor-pointer group">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${formData.outcome === outcome ? 'border-blue-500' : 'border-gray-300'}`}>
                        {formData.outcome === outcome && <div className="w-2.5 h-2.5 rounded-full bg-blue-500"></div>}
                      </div>
                      <span className="text-gray-700 group-hover:text-blue-600">{outcome}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              {formData.outcome === 'Fatal' && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    If Fatal, Date of Death
                  </label>
                  <DatePicker
                    selected={formData.fatalDate}
                    onChange={(date) => setFormData(prev => ({ ...prev, fatalDate: date }))}
                    dateFormat="dd/MM/yyyy"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    placeholderText="Select date of death"
                  />
                </div>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Severe: Yes / No
                </label>
                <div className="flex space-x-6">
                  {['Yes', 'No'].map((option) => (
                    <label key={option} className="flex items-center space-x-3 cursor-pointer group">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${formData.severe === option ? 'border-blue-500' : 'border-gray-300'}`}>
                        {formData.severe === option && <div className="w-2.5 h-2.5 rounded-full bg-blue-500"></div>}
                      </div>
                      <span className="text-gray-700 group-hover:text-blue-600">{option}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Reaction abated after drug stopped or dose reduced
                </label>
                <div className="flex space-x-6">
                  {['Yes', 'No'].map((option) => (
                    <label key={option} className="flex items-center space-x-3 cursor-pointer group">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${formData.reactionAbated === option ? 'border-blue-500' : 'border-gray-300'}`}>
                        {formData.reactionAbated === option && <div className="w-2.5 h-2.5 rounded-full bg-blue-500"></div>}
                      </div>
                      <span className="text-gray-700 group-hover:text-blue-600">{option}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Reaction reappeared after re administration of drug
                </label>
                <div className="flex space-x-6">
                  {['Yes', 'No'].map((option) => (
                    <label key={option} className="flex items-center space-x-3 cursor-pointer group">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${formData.reactionReappeared === option ? 'border-blue-500' : 'border-gray-300'}`}>
                        {formData.reactionReappeared === option && <div className="w-2.5 h-2.5 rounded-full bg-blue-500"></div>}
                      </div>
                      <span className="text-gray-700 group-hover:text-blue-600">{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <label className="flex items-center space-x-3 cursor-pointer group">
                <div className="w-5 h-5 border-2 border-gray-300 rounded flex items-center justify-center group-hover:border-blue-400">
                  <input
                    type="checkbox"
                    name="hospitalAdmitted"
                    checked={formData.hospitalAdmitted}
                    onChange={handleInputChange}
                    className="opacity-0 absolute w-5 h-5 cursor-pointer"
                  />
                  {formData.hospitalAdmitted && (
                    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                    </svg>
                  )}
                </div>
                <span className="text-gray-700 font-semibold group-hover:text-blue-600">
                  Was the patient admitted to hospital? If yes, give name and address of hospital
                </span>
              </label>
              
              {formData.hospitalAdmitted && (
                <div>
                  <textarea
                    name="hospitalNameAddress"
                    value={formData.hospitalNameAddress}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    placeholder="Enter hospital name and address"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Section 11: Lab Investigations */}
          <div className="p-6 border-b border-gray-300">
            <div className="flex items-center mb-6">
              <div className="bg-gradient-to-r from-pink-500 to-pink-600 text-white p-3 rounded-lg mr-4">
                <span className="font-bold text-xl">11</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Any abnormal findings of relevant laboratory investigations</h2>
            </div>
            
            <div>
              <textarea
                name="labInvestigations"
                value={formData.labInvestigations}
                onChange={handleInputChange}
                rows="4"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                placeholder="Enter abnormal lab findings pre and post episode of ADR"
              />
            </div>
          </div>

          {/* Section 12: Reporter Details */}
          <div className="p-6 border-b border-gray-300">
            <div className="flex items-center mb-6">
              <div className="bg-gradient-to-r from-teal-500 to-teal-600 text-white p-3 rounded-lg mr-4">
                <span className="font-bold text-xl">12</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Particulars of ADR Reporter</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Please tick:
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  {['Patient', 'Attendant', 'Nurse', 'Doctor', 'Pharmacist', 'Health worker', 'Drug Manufacturer'].map((type) => (
                    <label key={type} className="flex items-center space-x-3 cursor-pointer group">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${formData.reporterType === type ? 'border-blue-500' : 'border-gray-300'}`}>
                        {formData.reporterType === type && <div className="w-2.5 h-2.5 rounded-full bg-blue-500"></div>}
                      </div>
                      <span className="text-gray-700 group-hover:text-blue-600">{type}</span>
                    </label>
                  ))}
                </div>
                
                <div className="flex items-center space-x-4">
                  <label className="flex items-center space-x-3 cursor-pointer group">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${formData.reporterType === 'Other' ? 'border-blue-500' : 'border-gray-300'}`}>
                      {formData.reporterType === 'Other' && <div className="w-2.5 h-2.5 rounded-full bg-blue-500"></div>}
                    </div>
                    <span className="text-gray-700 group-hover:text-blue-600">Any others (please specify)</span>
                  </label>
                  
                  {formData.reporterType === 'Other' && (
                    <input
                      type="text"
                      name="reporterOtherSpecify"
                      value={formData.reporterOtherSpecify}
                      onChange={handleInputChange}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      placeholder="Specify other"
                    />
                  )}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  name="reporterName"
                  value={formData.reporterName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Telephone / E-mail
                </label>
                <input
                  type="text"
                  name="reporterPhoneEmail"
                  value={formData.reporterPhoneEmail}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Address
                </label>
                <textarea
                  name="reporterAddress"
                  value={formData.reporterAddress}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Signature of the reporter
                </label>
                <input
                  type="text"
                  name="reporterSignature"
                  value={formData.reporterSignature}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  placeholder="Name for signature"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Date
                </label>
                <DatePicker
                  selected={formData.reportDate}
                  onChange={(date) => setFormData(prev => ({ ...prev, reportDate: date }))}
                  dateFormat="dd/MM/yyyy"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                />
              </div>
            </div>
            
            <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-blue-800 text-sm">
                Please send the completed form to: The centre from where the form is received or to<br />
                The Coordinator, National Pharmacovigilance Coordination Centre (NPvCC)<br />
                All India Institute of Ayurveda (AIIA), Mathura Road, Gautam Puri,<br />
                Sarita Vihar, New Delhi - 110 076<br />
                E-mail: pharmacovigilanceayush@gmail.com, ayush-pharmavig@aiia.gov.in
              </p>
            </div>
          </div>

          {/* ADR Probability Scale */}
          <div className="p-6 border-b border-gray-300">
            <div className="flex items-center mb-6">
              <div className="bg-gradient-to-r from-gray-700 to-gray-900 text-white p-3 rounded-lg mr-4">
                <span className="font-bold text-xl">ADR</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">The ADR Probability Scale</h2>
                <p className="text-gray-600 text-sm italic">(Program Coordinator has to fill this scale)</p>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Questions</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Yes</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">No</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Don't Know</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {adrQuestions.map((question, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-4 py-3 text-sm text-gray-800">{question}</td>
                      <td className="px-4 py-3">
                        <label className="flex items-center justify-center cursor-pointer">
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${formData.adrScale[index] === 'Yes' ? 'border-blue-500' : 'border-gray-300'}`}>
                            {formData.adrScale[index] === 'Yes' && <div className="w-2.5 h-2.5 rounded-full bg-blue-500"></div>}
                            <input
                              type="radio"
                              name={`adrScale[${index}]`}
                              value="Yes"
                              checked={formData.adrScale[index] === 'Yes'}
                              onChange={() => {
                                const newScale = [...formData.adrScale];
                                newScale[index] = 'Yes';
                                setFormData(prev => ({ ...prev, adrScale: newScale }));
                              }}
                              className="opacity-0 absolute w-5 h-5 cursor-pointer"
                            />
                          </div>
                        </label>
                      </td>
                      <td className="px-4 py-3">
                        <label className="flex items-center justify-center cursor-pointer">
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${formData.adrScale[index] === 'No' ? 'border-blue-500' : 'border-gray-300'}`}>
                            {formData.adrScale[index] === 'No' && <div className="w-2.5 h-2.5 rounded-full bg-blue-500"></div>}
                            <input
                              type="radio"
                              name={`adrScale[${index}]`}
                              value="No"
                              checked={formData.adrScale[index] === 'No'}
                              onChange={() => {
                                const newScale = [...formData.adrScale];
                                newScale[index] = 'No';
                                setFormData(prev => ({ ...prev, adrScale: newScale }));
                              }}
                              className="opacity-0 absolute w-5 h-5 cursor-pointer"
                            />
                          </div>
                        </label>
                      </td>
                      <td className="px-4 py-3">
                        <label className="flex items-center justify-center cursor-pointer">
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${formData.adrScale[index] === "Don't Know" ? 'border-blue-500' : 'border-gray-300'}`}>
                            {formData.adrScale[index] === "Don't Know" && <div className="w-2.5 h-2.5 rounded-full bg-blue-500"></div>}
                            <input
                              type="radio"
                              name={`adrScale[${index}]`}
                              value="Don't Know"
                              checked={formData.adrScale[index] === "Don't Know"}
                              onChange={() => {
                                const newScale = [...formData.adrScale];
                                newScale[index] = "Don't Know";
                                setFormData(prev => ({ ...prev, adrScale: newScale }));
                              }}
                              className="opacity-0 absolute w-5 h-5 cursor-pointer"
                            />
                          </div>
                        </label>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="mt-6 p-4 bg-gray-100 rounded-lg">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                  <span className="font-semibold text-gray-700">Total Score: </span>
                  <span className="text-2xl font-bold text-blue-600 ml-2">{calculateADRScore()}</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Category: </span>
                  <span className="text-xl font-bold text-green-600 ml-2">{getADRCategory(calculateADRScore())}</span>
                </div>
              </div>
              <div className="mt-3 text-sm text-gray-600 bg-white p-3 rounded border">
                <div className="font-semibold mb-1">Score Interpretation:</div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  <div className="text-center p-2 bg-green-50 rounded"> 9 = Certain</div>
                  <div className="text-center p-2 bg-blue-50 rounded">5-8 = Probable</div>
                  <div className="text-center p-2 bg-yellow-50 rounded">1-4 = Possible</div>
                  <div className="text-center p-2 bg-red-50 rounded">0 = Unlikely</div>
                </div>
              </div>
            </div>
          </div>

          {/* Suspected Adverse Event */}
          <div className="p-6">
            <div className="flex items-center mb-6">
              <div className="bg-gradient-to-r from-indigo-700 to-indigo-900 text-white p-3 rounded-lg mr-4">
                <span className="font-bold text-xl">Event</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-800">The Suspected Adverse Event</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Grade</h3>
                <div className="space-y-3">
                  {['Grade - 1 (Mild)', 'Grade - 2 (Moderate)', 'Grade - 3 (Severe)', 'Grade - 4 (Threatening)'].map((grade) => (
                    <label key={grade} className="flex items-center space-x-3 cursor-pointer group">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${formData.eventGrade === grade ? 'border-blue-500' : 'border-gray-300'}`}>
                        {formData.eventGrade === grade && <div className="w-2.5 h-2.5 rounded-full bg-blue-500"></div>}
                      </div>
                      <span className="text-gray-700 group-hover:text-blue-600">{grade}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Seriousness</h3>
                <div className="space-y-3">
                  {['Serious', 'Non-Serious'].map((type) => (
                    <label key={type} className="flex items-center space-x-3 cursor-pointer group">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${formData.eventSeriousness === type ? 'border-blue-500' : 'border-gray-300'}`}>
                        {formData.eventSeriousness === type && <div className="w-2.5 h-2.5 rounded-full bg-blue-500"></div>}
                      </div>
                      <span className="text-gray-700 group-hover:text-blue-600">{type}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-4">The Suspected Adverse Event is due to</h3>
                <div className="space-y-3">
                  {['Physician', 'Patient', 'Drug', 'Other factors'].map((cause) => (
                    <label key={cause} className="flex items-center space-x-3 cursor-pointer group">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${formData.eventDueTo === cause ? 'border-blue-500' : 'border-gray-300'}`}>
                        {formData.eventDueTo === cause && <div className="w-2.5 h-2.5 rounded-full bg-blue-500"></div>}
                      </div>
                      <span className="text-gray-700 group-hover:text-blue-600">{cause}</span>
                    </label>
                  ))}
                </div>
                
                {formData.eventDueTo === 'Other factors' && (
                  <div className="mt-4">
                    <input
                      type="text"
                      name="otherFactors"
                      value={formData.otherFactors}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                      placeholder="Specify other factors"
                    />
                  </div>
                )}
              </div>
            </div>
            
            <div className="mt-8">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Program Coordinator Signature
              </label>
              <input
                type="text"
                name="coordinatorSignature"
                value={formData.coordinatorSignature}
                onChange={handleInputChange}
                className="w-full md:w-1/2 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                placeholder="Enter coordinator name for signature"
              />
            </div>
          </div>

          {/* Form Actions */}
          <div className="p-6 bg-gray-50 border-t border-gray-300">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-gray-600 text-sm">
                <i className="fas fa-exclamation-triangle text-amber-500 mr-2"></i>
                Please ensure all required fields are completed before submission
              </div>
              
              <div className="flex flex-wrap gap-4">
                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm('Are you sure you want to clear the form? All data will be lost.')) {
                      window.location.reload();
                    }
                  }}
                  className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Clear Form
                </button>
                
                <button
                  type="button"
                  onClick={generatePDF}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg transition-all duration-300 shadow-md hover:shadow-lg flex items-center"
                >
                  <i className="fas fa-download mr-2"></i>
                  Download PDF
                </button>
                
                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-lg transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  {loading ? (
                    <>
                      <i className="fas fa-spinner fa-spin mr-2"></i>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-paper-plane mr-2"></i>
                      Submit Report
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PharmaReporting;