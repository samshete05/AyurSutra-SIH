const DoctorDashboard = () => {
  const [selectedPatient, setSelectedPatient] = React.useState(null);

  const dummyStats = { todayPatients: 8, ongoingTherapies: 5, pendingFeedback: 3, criticalAlerts: 1 };
  const dummyPatients = []; // fill from API, already filtered for this doctor
  const dummySessions = []; // therapy timeline
  const dummyProgress = {}; // trends & alerts
  const dummyNotes = [];
  const dummyMessages = [];
  const dummyPerf = {};

  return (
    <div className="min-h-screen bg-emerald-50/40">
      <div className="mx-auto max-w-6xl px-4 py-6 md:px-6 lg:px-8">
        <DoctorOverviewCards stats={dummyStats} />

        <AssignedPatientsTable
          patients={dummyPatients}
          selectedPatientId={selectedPatient?.id}
          onSelectPatient={setSelectedPatient}
        />

        <PatientClinicalProfile patient={selectedPatient} />
        <TherapyTimeline sessions={dummySessions} />
        <TherapyScheduler patient={selectedPatient} />
        <PrescriptionPanel patient={selectedPatient} />
        <InstructionManager patient={selectedPatient} />
        <TherapyProgressPanel progress={dummyProgress} />
        <ClinicalNotesPanel notes={dummyNotes} />
        <PatientCommunicationPanel messages={dummyMessages} />
        <DoctorPerformanceSnapshot performance={dummyPerf} />
      </div>
    </div>
  );
};

export default DoctorDashboard;