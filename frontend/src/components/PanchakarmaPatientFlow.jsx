// PanchakarmaPatientFlow.jsx
import React from "react";

const PanchakarmaPatientFlow = () => {
  return (
    <section className="w-full bg-white py-10 flex justify-center">
      <div className="max-w-5xl w-full px-4 flex flex-col items-center">
        {/* Timeline line */}
        <div className="relative w-full flex items-center justify-between mt-10">
          <div className="absolute left-[10%] right-[10%] top-1/2 h-[4px] bg-gradient-to-r from-purple-500 via-orange-400 to-green-600 -translate-y-1/2" />

          {/* Step 1 */}
          <StepCard
            color="purple"
            number="1"
            title="Sign up"
            bullets={[
              "Verify mobile number using OTP",
              "Fill patient registration form",
            ]}
          />

          {/* Step 2 */}
          <StepCard
            color="orange"
            number="2"
            title="Login"
            bullets={[
              "Login with mobile number / email",
              "Provide basic health details",
              "Upload health records, if any",
            ]}
          />

          {/* Step 3 */}
          <StepCard
            color="indigo"
            number="3"
            title="Select Center"
            bullets={[
              "Choose Panchakarma center",
              "View available therapies & packages",
            ]}
          />

          {/* Step 4 */}
          <StepCard
            color="green"
            number="4"
            title="Book Session"
            bullets={[
              "Select therapy & time slot",
              "Confirm booking and receive e‑confirmation",
            ]}
          />
        </div>
      </div>
    </section>
  );
};

const colorMap = {
  purple: {
    circle: "bg-purple-700 border-purple-300",
    bar: "bg-purple-700",
    titleBg: "bg-purple-700",
  },
  orange: {
    circle: "bg-orange-500 border-orange-200",
    bar: "bg-orange-500",
    titleBg: "bg-orange-500",
  },
  indigo: {
    circle: "bg-indigo-700 border-indigo-200",
    bar: "bg-indigo-700",
    titleBg: "bg-indigo-700",
  },
  green: {
    circle: "bg-green-700 border-green-200",
    bar: "bg-green-700",
    titleBg: "bg-green-700",
  },
};

const StepCard = ({ color, number, title, bullets }) => {
  const styles = colorMap[color];

  return (
    <div className="relative flex flex-col items-center w-1/4">
      {/* Top title box */}
      <div
        className={`px-4 py-2 rounded-md ${styles.titleBg} text-white text-sm font-semibold mb-3`}
      >
        {title}
      </div>

      {/* Vertical connector */}
      <div className={`w-[4px] h-10 ${styles.bar}`} />

      {/* Number circle */}
      <div
        className={`relative z-10 flex items-center justify-center rounded-full border-4 ${styles.circle} text-white text-2xl font-bold w-20 h-20 shadow-lg`}
      >
        {number}
      </div>

      {/* Down connector */}
      <div className={`w-[4px] h-10 ${styles.bar}`} />

      {/* Text bullets under step */}
      <div className="mt-2 text-xs text-slate-700 leading-relaxed max-w-[210px]">
        <ul className="list-disc list-inside space-y-1">
          {bullets.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PanchakarmaPatientFlow;
