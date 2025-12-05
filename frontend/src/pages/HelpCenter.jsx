import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const HelpCenter = () => {
  const [activeCategory, setActiveCategory] = useState('general');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'general', name: 'General', icon: '🏠' },
    { id: 'booking', name: 'Booking', icon: '📅' },
    { id: 'payment', name: 'Payment', icon: '💳' },
    { id: 'account', name: 'Account', icon: '👤' },
    { id: 'therapy', name: 'Therapy', icon: '🧘' },
  ];

  const faqs = {
    general: [
      {
        question: 'What is AyurSutra?',
        answer: 'AyurSutra is a comprehensive platform connecting patients with authentic Panchakarma centers across India. We help you discover, book, and manage Ayurvedic wellness therapies with ease and confidence.'
      },
      {
        question: 'How do I find a Panchakarma center?',
        answer: 'Use our search and filter options on the homepage to find centers by location, therapy type, ratings, and availability. Each center profile includes detailed information, reviews, and booking options.'
      },
      {
        question: 'Is AyurSutra free to use?',
        answer: 'Yes! Browsing and searching for centers is completely free. You only pay for the therapies or treatments you book at the respective centers.'
      },
      {
        question: 'How can I contact support?',
        answer: 'You can reach us via email at support@ayursutra.com, call us at +91 98765 43210, or use the contact form on our Contact page. We respond within 24 hours on working days.'
      },
    ],
    booking: [
      {
        question: 'How do I book a therapy session?',
        answer: 'Select your desired center, choose a therapy, pick a date and time slot, and confirm your booking. You\'ll receive a confirmation email with all the details.'
      },
      {
        question: 'Can I reschedule or cancel my booking?',
        answer: 'Yes, you can reschedule or cancel bookings from your account dashboard. Please note that cancellation policies vary by center, and some may charge a fee for late cancellations.'
      },
      {
        question: 'How far in advance should I book?',
        answer: 'We recommend booking at least 3-7 days in advance to ensure availability, especially during peak seasons. However, some centers may accommodate same-day bookings based on availability.'
      },
      {
        question: 'Will I receive a booking confirmation?',
        answer: 'Yes, you\'ll receive an instant confirmation email and SMS with your booking details, center information, and instructions for your visit.'
      },
    ],
    payment: [
      {
        question: 'What payment methods are accepted?',
        answer: 'We accept credit/debit cards, UPI, net banking, and digital wallets. All payments are processed securely through our trusted payment gateway partners.'
      },
      {
        question: 'Is my payment information secure?',
        answer: 'Absolutely. We use industry-standard encryption and comply with PCI-DSS standards to ensure your payment information is protected at all times.'
      },
      {
        question: 'When will I be charged?',
        answer: 'Payment is processed immediately upon booking confirmation. Some centers may require advance payment while others allow payment at the center.'
      },
      {
        question: 'What is your refund policy?',
        answer: 'Refund policies vary by center. Generally, cancellations made 48+ hours in advance receive full refunds. Late cancellations may incur fees. Check the specific center\'s policy before booking.'
      },
    ],
    account: [
      {
        question: 'How do I create an account?',
        answer: 'Click on "Sign Up" in the top navigation, enter your details, verify your email, and you\'re ready to start booking therapies.'
      },
      {
        question: 'I forgot my password. What should I do?',
        answer: 'Click "Forgot Password" on the login page, enter your registered email, and follow the instructions sent to your inbox to reset your password.'
      },
      {
        question: 'Can I update my profile information?',
        answer: 'Yes, go to your Account Settings to update your name, contact details, address, and preferences at any time.'
      },
      {
        question: 'How do I delete my account?',
        answer: 'Contact our support team at support@ayursutra.com to request account deletion. We\'ll process your request within 7 business days and confirm via email.'
      },
    ],
    therapy: [
      {
        question: 'What types of therapies are available?',
        answer: 'AyurSutra offers a wide range of Panchakarma therapies including Abhyanga, Shirodhara, Nasya, Vamana, Virechana, Basti, and more. Each center specializes in different treatments.'
      },
      {
        question: 'How do I choose the right therapy?',
        answer: 'Consult with the center\'s Ayurvedic doctors during your initial assessment. They\'ll evaluate your health, dosha type, and wellness goals to recommend the most suitable therapies.'
      },
      {
        question: 'Are therapies safe for everyone?',
        answer: 'Most therapies are safe, but some may not be suitable for pregnant women, people with certain medical conditions, or children. Always disclose your health history during consultation.'
      },
      {
        question: 'How long does a typical therapy session last?',
        answer: 'Session duration varies by therapy type. Most sessions range from 45-90 minutes. Complete Panchakarma programs typically span 7-21 days depending on your needs.'
      },
    ],
  };

  const filteredFaqs = faqs[activeCategory].filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <div className="bg-emerald-50/40 min-h-screen flex flex-col">
        {/* Header Section with gradient */}
        <section className="bg-gradient-to-r from-[#1E4B3C] to-[#256f5a] text-white transition-all duration-700 ease-in-out">
          <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 lg:px-8 text-center">
            <p className="text-xs uppercase tracking-[0.2em] text-emerald-100 animate-fadeIn">
              SUPPORT
            </p>
            <h1 className="mt-2 text-4xl md:text-5xl font-extrabold leading-tight animate-slideDown">
              How can we help you?
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-base md:text-lg text-emerald-50/90 animate-fadeIn">
              Find answers to common questions or reach out to our support team for personalized assistance.
            </p>
            {/* Search Bar */}
            <div className="mt-8 max-w-2xl mx-auto animate-fadeIn">
              <input
                type="text"
                placeholder="Search for help..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-4 rounded-lg text-gray-800 text-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 shadow-lg"
              />
            </div>
          </div>
        </section>

        <div className="max-w-6xl mx-auto px-4 py-12 flex-1">
          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-12 animate-fadeIn">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  activeCategory === category.id
                    ? 'bg-[#1E4B3C] text-white shadow-lg transform scale-105'
                    : 'bg-white text-[#1E4B3C] hover:bg-emerald-50 border border-emerald-200'
                }`}
              >
                <span className="mr-2">{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>

          {/* FAQ Section */}
          <div className="space-y-4 mb-12">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq, index) => (
                <details
                  key={index}
                  className="bg-white rounded-xl shadow-md border border-emerald-100 p-6 animate-slideLeft hover:shadow-lg transition-shadow duration-300"
                >
                  <summary className="font-semibold text-[#1E4B3C] cursor-pointer text-lg">
                    {faq.question}
                  </summary>
                  <p className="mt-3 text-gray-700 leading-relaxed">{faq.answer}</p>
                </details>
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No results found. Try a different search term.</p>
              </div>
            )}
          </div>

          {/* Contact Support Section */}
          <div className="bg-gradient-to-r from-[#1E4B3C] to-[#256f5a] rounded-2xl p-10 text-white text-center shadow-lg animate-fadeIn">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-emerald-100">
              Still need help?
            </h2>
            <p className="mb-6 text-lg">
              Our support team is here to assist you. Reach out via email, phone, or visit our contact page.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="/contact"
                className="inline-block bg-white text-[#1E4B3C] font-bold px-8 py-3 rounded-lg shadow hover:bg-emerald-100 transition"
              >
                Contact Us
              </a>
              <a
                href="mailto:support@ayursutra.com"
                className="inline-block bg-emerald-600 text-white font-bold px-8 py-3 rounded-lg shadow hover:bg-emerald-700 transition"
              >
                Email Support
              </a>
            </div>
          </div>
        </div>
        <Footer />
      </div>
      {/* Animations */}
      <style>{`
        .animate-fadeIn { animation: fadeIn 1s ease; }
        .animate-slideDown { animation: slideDown 1s ease; }
        .animate-slideLeft { animation: slideLeft 1s ease; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideDown { from { transform: translateY(-40px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        @keyframes slideLeft { from { transform: translateX(-40px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
      `}</style>
    </>
  );
};

export default HelpCenter;