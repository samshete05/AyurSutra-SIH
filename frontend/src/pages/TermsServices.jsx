import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const TermsServices = () => {
  return (
    <>
      <Navbar />
      <div className="bg-emerald-50/40 min-h-screen flex flex-col">
        {/* Header Section with gradient - matching about page */}
        <section className="bg-gradient-to-r from-[#1E4B3C] to-[#256f5a] text-white transition-all duration-700 ease-in-out">
          <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 lg:px-8">
            <p className="text-xs uppercase tracking-[0.2em] text-emerald-100 animate-fadeIn">
              LEGAL
            </p>
            <h1 className="mt-2 text-4xl md:text-5xl font-extrabold leading-tight animate-slideDown">
              Terms and Conditions
            </h1>
            <p className="mt-4 max-w-2xl text-base md:text-lg text-emerald-50/90 animate-fadeIn">
              Please read these terms carefully before using AyurSutra. By accessing our platform, you agree to be bound by these terms and conditions.
            </p>
          </div>
        </section>
        <div className="max-w-6xl mx-auto px-4 py-12 flex-1">
         
          <section className="mb-8 animate-fadeIn">
            <p className="text-lg text-gray-800 mb-4">
              Welcome to AyurSutra, your trusted platform for discovering and booking Panchakarma therapies and wellness retreats. These Terms and Conditions ("Terms") govern your use of our website, services, and your relationship with AyurSutra ("we", "us", or "our"). By accessing or using our website and services, you agree to be bound by these Terms. If you do not agree, please do not use our platform.
            </p>
          </section>
          <section className="mb-8 animate-slideLeft">
            <h2 className="text-2xl font-semibold text-[#1E4B3C] mb-2">1. About AyurSutra</h2>
            <p className="text-gray-700">
              AyurSutra is a curated platform that connects individuals with trusted Panchakarma centers and wellness retreats. We facilitate the booking process and provide personalized recommendations but do not own or operate the centers listed.
            </p>
          </section>
          <section className="mb-8 animate-slideRight">
            <h2 className="text-2xl font-semibold text-[#1E4B3C] mb-2">2. Use of the Website</h2>
            <p className="text-gray-700 mb-2">
              You agree to use the website for lawful purposes only and in a manner that does not infringe the rights of, restrict, or inhibit the use and enjoyment of this site by any third party.
            </p>
            <ul className="list-disc pl-6 text-gray-700">
              <li>Use false identities or impersonate others.</li>
              <li>Interfere with the operation of the site.</li>
              <li>Post or transmit offensive, infringing, or unlawful content.</li>
            </ul>
          </section>
          <section className="mb-8 animate-fadeIn">
            <h2 className="text-2xl font-semibold text-[#1E4B3C] mb-2">3. Booking and Payment</h2>
            <p className="text-gray-700">
              All bookings made through AyurSutra are subject to availability and confirmation by the respective center. Payment terms, cancellation policies, and refund procedures are outlined during the booking process and may vary by center.
            </p>
            <ul className="list-disc pl-6 text-gray-700 mt-2">
              <li>Ensure all information provided during booking is accurate and complete.</li>
              <li>Review and accept the center’s cancellation and refund policies before confirming your booking.</li>
              <li>Contact our support team for any payment-related queries or issues.</li>
            </ul>
          </section>
          <section className="mb-8 animate-slideLeft">
            <h2 className="text-2xl font-semibold text-[#1E4B3C] mb-2">4. Third-Party Services</h2>
            <p className="text-gray-700 mb-2">
              AyurSutra acts as an intermediary between clients and third-party centers or providers. We are not liable for actions, negligence, or omissions of any third-party service provider.
            </p>
            <p className="text-gray-700">
              Any grievances regarding accommodation, food, or treatments must be directed to the respective center or facility, although we are happy to support you where possible.
            </p>
            <ul className="list-disc pl-6 text-gray-700 mt-2">
              <li>We recommend reviewing the terms and policies of third-party providers before booking.</li>
              <li>AyurSutra may assist in communication but does not guarantee resolution of disputes with third parties.</li>
            </ul>
          </section>
          <section className="mb-8 animate-slideRight">
            <h2 className="text-2xl font-semibold text-[#1E4B3C] mb-2">5. Health and Medical Disclaimer</h2>
            <p className="text-gray-700 mb-2">
              AyurSutra does not offer medical advice. Any Ayurvedic treatments, detox programs, or recommendations provided via AyurSutra should be considered complementary and not a substitute for medical treatment. Please consult your physician before beginning any health program.
            </p>
            <p className="text-gray-700">
              You are responsible for disclosing all pre-existing health conditions before confirming your booking.
            </p>
            <ul className="list-disc pl-6 text-gray-700 mt-2">
              <li>Always seek professional medical advice for any health concerns.</li>
              <li>Inform the center of allergies, chronic conditions, or ongoing treatments.</li>
              <li>AyurSutra is not responsible for adverse reactions or outcomes from therapies.</li>
            </ul>
          </section>
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-[#1E4B3C] mb-2">6. Intellectual Property</h2>
            <p className="text-gray-700">
              All content on this website – including logos, text, images, and videos – is the property of AyurSutra or licensed appropriately. You may not use, reproduce, or distribute this content without our written permission.
            </p>
            <ul className="list-disc pl-6 text-gray-700 mt-2">
              <li>Requests for use of content should be sent to our support team.</li>
              <li>Unauthorized use may result in legal action.</li>
            </ul>
          </section>
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-[#1E4B3C] mb-2">7. Privacy Policy</h2>
            <p className="text-gray-700">
              Your use of our services is also governed by our <a href="/privacy" className="text-orange-500 underline">Privacy Policy</a>, which explains how we collect, use, and protect your data.
            </p>
            <ul className="list-disc pl-6 text-gray-700 mt-2">
              <li>We use industry-standard security measures to protect your information.</li>
              <li>Personal data is never shared with third parties without your consent, except as required by law.</li>
              <li>You may request deletion or correction of your personal data at any time.</li>
            </ul>
          </section>
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-[#1E4B3C] mb-2">8. Limitation of Liability</h2>
            <p className="text-gray-700">
              AyurSutra is not liable for any direct, indirect, incidental, or consequential damages arising from your use of the website or services. We strive to provide accurate information but do not guarantee the completeness or reliability of any content.
            </p>
            <ul className="list-disc pl-6 text-gray-700 mt-2">
              <li>We are not responsible for delays, interruptions, or errors caused by technical issues.</li>
              <li>Our liability is limited to the maximum extent permitted by law.</li>
            </ul>
          </section>
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-[#1E4B3C] mb-2">9. User Responsibilities</h2>
            <p className="text-gray-700">
              As a user, you are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.
            </p>
            <ul className="list-disc pl-6 text-gray-700 mt-2">
              <li>Notify us immediately of any unauthorized use of your account.</li>
              <li>Do not share your login credentials with others.</li>
              <li>Comply with all applicable laws and regulations while using our platform.</li>
            </ul>
          </section>
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-[#1E4B3C] mb-2">10. Changes to Terms</h2>
            <p className="text-gray-700">
              We may update these Terms from time to time. Any changes will be posted on this page, and your continued use of the website constitutes acceptance of those changes.
            </p>
            <ul className="list-disc pl-6 text-gray-700 mt-2">
              <li>We encourage you to review these Terms periodically.</li>
              <li>Significant changes will be communicated via email or platform notifications.</li>
            </ul>
          </section>
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-[#1E4B3C] mb-2">11. Governing Law</h2>
            <p className="text-gray-700">
              These Terms are governed by the laws of India. Any disputes arising from the use of our platform will be subject to the exclusive jurisdiction of the courts in India.
            </p>
          </section>
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-[#1E4B3C] mb-2">12. Contact Us</h2>
            <p className="text-gray-700">
              If you have any questions about these Terms, please visit our <a href="/help-center" className="text-orange-500 underline">Help Center</a> or contact us directly at <a href="mailto:support@ayursutra.com" className="text-orange-500 underline">support@ayursutra.com</a>.
            </p>
          </section>
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

export default TermsServices;