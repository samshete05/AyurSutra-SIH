import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export const Service = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-emerald-50/40 flex flex-col">
        {/* Intro section below Navbar - match about.jsx box size */}
        <div className="w-full py-16 px-8 bg-gradient-to-r from-[#1E4B3C] to-[#256f5a] text-white transition-all duration-700 ease-in-out">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-lg font-semibold text-emerald-100 tracking-wide mb-2 animate-fadeIn">AYURSUTRA SERVICES</h2>
            <p className="text-3xl md:text-4xl font-extrabold text-emerald-50 mb-3 animate-slideDown">
              Empowering Panchakarma Centers with Modern Solutions
            </p>
            <p className="text-emerald-100 text-base md:text-lg animate-fadeIn">
              Our platform bridges tradition and technology, making therapy management, patient care, and operational excellence effortless for every center.
            </p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-10 flex-1">
          <h1 className="text-3xl font-bold text-[#1E4B3C] mb-6 animate-slideLeft">Our Services</h1>
          <p className="text-gray-700 mb-8 text-lg animate-fadeIn">
            AyurSutra offers a suite of digital tools and services designed to streamline Panchakarma center operations, enhance patient care, and support staff efficiency. Explore our core offerings below:
          </p>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="bg-white rounded-xl shadow-lg p-6 border border-emerald-200 hover:scale-105 transition-transform duration-300 animate-slideRight">
              <h2 className="text-xl font-semibold text-[#1E4B3C] mb-2">Therapy Scheduling</h2>
              <p className="text-gray-700">
                Effortlessly manage therapy slots, appointments, and patient bookings with automated reminders and conflict-free scheduling. Our smart calendar adapts to your center’s workflow.
              </p>
              <ul className="list-disc pl-5 mt-2 text-emerald-900 text-sm">
                <li>Automated slot allocation</li>
                <li>Patient notifications</li>
                <li>Customizable therapy templates</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 border border-emerald-200 hover:scale-105 transition-transform duration-300 animate-slideLeft">
              <h2 className="text-xl font-semibold text-[#1E4B3C] mb-2">Patient Progress Tracking</h2>
              <p className="text-gray-700">
                Monitor patient progress, therapy outcomes, and feedback with secure digital records accessible to both staff and patients. Track milestones and therapy effectiveness.
              </p>
              <ul className="list-disc pl-5 mt-2 text-emerald-900 text-sm">
                <li>Progress charts and analytics</li>
                <li>Patient feedback forms</li>
                <li>Confidential health records</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 border border-emerald-200 hover:scale-105 transition-transform duration-300 animate-slideRight">
              <h2 className="text-xl font-semibold text-[#1E4B3C] mb-2">Center Management</h2>
              <p className="text-gray-700">
                Centralized dashboard for managing staff, therapy rooms, inventory, and operational insights to maximize efficiency. Reduce manual errors and optimize resources.
              </p>
              <ul className="list-disc pl-5 mt-2 text-emerald-900 text-sm">
                <li>Staff scheduling and shift management</li>
                <li>Inventory and supplies tracking</li>
                <li>Occupancy analytics</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 border border-emerald-200 hover:scale-105 transition-transform duration-300 animate-slideLeft">
              <h2 className="text-xl font-semibold text-[#1E4B3C] mb-2">Digital Records & Analytics</h2>
              <p className="text-gray-700">
                Maintain confidential digital records and access real-time analytics to improve therapy protocols and patient satisfaction. Generate reports for compliance and research.
              </p>
              <ul className="list-disc pl-5 mt-2 text-emerald-900 text-sm">
                <li>Customizable reports</li>
                <li>Secure cloud storage</li>
                <li>Data-driven insights</li>
              </ul>
            </div>
          </div>
          {/* Additional Information at the end */}
          <div className="mt-12 bg-gradient-to-r from-[#1E4B3C] to-[#256f5a] rounded-xl p-8 shadow text-emerald-50 animate-fadeIn">
            <h3 className="text-2xl font-bold mb-3 text-emerald-100">Why Choose AyurSutra?</h3>
            <ul className="list-disc pl-6 space-y-2 text-lg">
              <li>
                <span className="font-semibold text-emerald-100">Authenticity Preserved:</span> Our software respects Ayurvedic traditions while introducing digital convenience.
              </li>
              <li>
                <span className="font-semibold text-emerald-100">Secure & Private:</span> Patient data is protected with robust security and privacy standards.
              </li>
              <li>
                <span className="font-semibold text-emerald-100">Scalable for All Centers:</span> Whether you run a small clinic or a large facility, AyurSutra adapts to your needs.
              </li>
              <li>
                <span className="font-semibold text-emerald-100">Continuous Support:</span> Our team is dedicated to helping you get the most from your digital transformation.
              </li>
              <li>
                <span className="font-semibold text-emerald-100">Community & Collaboration:</span> Connect with other centers, share best practices, and grow together.
              </li>
            </ul>
            <p className="mt-6 text-emerald-100 text-base">
              Join the movement to modernize Panchakarma care. AyurSutra is more than software—it's your partner in delivering holistic healing with confidence and clarity.
            </p>
          </div>
        </div>
        <Footer />
      </div>
      {/* Animations */}
      <style>{`
        .animate-fadeIn { animation: fadeIn 1s ease; }
        .animate-slideDown { animation: slideDown 1s ease; }
        .animate-slideLeft { animation: slideLeft 1s ease; }
        .animate-slideRight { animation: slideRight 1s ease; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideDown { from { transform: translateY(-40px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        @keyframes slideLeft { from { transform: translateX(-40px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        @keyframes slideRight { from { transform: translateX(40px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
      `}</style>
    </>
  );
};