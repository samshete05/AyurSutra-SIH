import React, { useState, useEffect } from "react";
import {
  Star,
  Send,
  CheckCircle,
  Heart,
  MapPin,
  UserCircle,
  MessageSquare,
  ThumbsUp,
  Clock
} from "lucide-react";
// import feedbackBG from "../../../public/feedback-bg.jpeg";

function FeedbackPage() {
  const [feedbackData, setFeedbackData] = useState({
    therapy: { rating: 0, comment: "" },
    center: { rating: 0, comment: "" },
    doctor: { rating: 0, comment: "" }
  });

  const [submitted, setSubmitted] = useState(false);
  const [completedTherapies, setCompletedTherapies] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch completed therapies on component mount
  useEffect(() => {
    fetchCompletedTherapies();
  }, []);

  const fetchCompletedTherapies = async () => {
    // TODO: Replace with actual API call
    // const response = await fetch('/api/patient/completed-therapies');
    // const data = await response.json();
    
    // Mock data - Replace with API response
    setTimeout(() => {
      const mockData = [
        {
          id: 1,
          therapyName: "Panchakarma Detoxification",
          centerName: "AyurSutra Wellness Center, Bangalore",
          doctorName: "Dr. Priya Sharma",
          completedDate: "Nov 28, 2025",
          duration: "21 days",
          isCompleted: true,
          hasFeedback: false
        }
      ];
      setCompletedTherapies(mockData.filter(therapy => therapy.isCompleted && !therapy.hasFeedback));
      setLoading(false);
    }, 1000);
  };

  const handleRating = (category, rating) => {
    setFeedbackData(prev => ({
      ...prev,
      [category]: { ...prev[category], rating }
    }));
  };

  const handleComment = (category, comment) => {
    setFeedbackData(prev => ({
      ...prev,
      [category]: { ...prev[category], comment }
    }));
  };

  const handleSubmit = async () => {
    // TODO: Send feedback to backend API
    console.log("Feedback submitted:", feedbackData);
    
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      fetchCompletedTherapies();
    }, 3000);
  };

  const isValid = feedbackData.therapy.rating > 0 && 
                  feedbackData.center.rating > 0 && 
                  feedbackData.doctor.rating > 0;

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading completed therapies...</p>
        </div>
      </div>
    );
  }

  // No completed therapies
  if (completedTherapies.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center border border-slate-200">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8 text-slate-400" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">No Completed Therapies</h2>
            <p className="text-slate-600 mb-6">
              You don't have any completed therapies to provide feedback for at the moment.
            </p>
            <p className="text-sm text-slate-500">
              Once you complete a therapy session, you'll be able to share your experience here.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const completedTherapy = completedTherapies[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Header */}
        <div 
          className="relative bg-white rounded-2xl shadow-lg p-6 border border-slate-200 overflow-hidden"
          style={{ 
            backgroundImage: "url('https://media.istockphoto.com/id/1451079337/photo/customer-review-good-rating-concept-hand-pressing-user-and-five-star-icon-on-visual-screen.jpg?s=612x612&w=0&k=20&c=KftvGEGrkQRLO_dqRyHmMW0EDFraAOjD9lrpMKpQR1w=')",
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        >
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-black/20"></div>

          {/* Content */}
          <div className="relative z-10 flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Share Your Experience</h1>
              <p className="text-sm text-white/90">Your feedback helps us improve our services</p>
            </div>
          </div>

          {/* Therapy Info */}
          <div className="relative z-10 bg-transparent rounded-xl p-4 border border-emerald-100">
            <h3 className="font-semibold text-emerald-900 mb-2">{completedTherapy.therapyName}</h3>
            <div className="flex flex-wrap gap-4 text-sm text-emerald-900">
              <span>Completed: {completedTherapy.completedDate}</span>
              <span>•</span>
              <span>Duration: {completedTherapy.duration}</span>
            </div>
          </div>
        </div>

        {/* Feedback Form */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200 space-y-6">
          
          {/* Therapy Feedback */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Heart className="w-5 h-5 text-emerald-600" />
              <h3 className="font-semibold text-slate-900">Rate the Therapy</h3>
            </div>
            
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
              {/* Star Rating */}
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => handleRating('therapy', star)}
                    className="transition-transform hover:scale-110"
                  >
                    <Star
                      className={`w-8 h-8 ${
                        star <= feedbackData.therapy.rating
                          ? "fill-amber-400 text-amber-400"
                          : "text-slate-300"
                      }`}
                    />
                  </button>
                ))}
                {feedbackData.therapy.rating > 0 && (
                  <span className="ml-2 text-sm font-medium text-slate-700">
                    {feedbackData.therapy.rating} / 5
                  </span>
                )}
              </div>

              {/* Comment Input */}
              <input
                type="text"
                value={feedbackData.therapy.comment}
                onChange={(e) => handleComment('therapy', e.target.value)}
                placeholder="Add a comment (optional)"
                className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none text-sm"
              />
            </div>
          </div>

          <div className="border-t border-slate-200"></div>

          {/* Center Feedback */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <MapPin className="w-5 h-5 text-blue-600" />
              <h3 className="font-semibold text-slate-900">Rate the Center</h3>
            </div>
            
            <div className="mb-2">
              <p className="text-sm text-slate-600">{completedTherapy.centerName}</p>
            </div>

            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
              {/* Star Rating */}
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => handleRating('center', star)}
                    className="transition-transform hover:scale-110"
                  >
                    <Star
                      className={`w-8 h-8 ${
                        star <= feedbackData.center.rating
                          ? "fill-amber-400 text-amber-400"
                          : "text-slate-300"
                      }`}
                    />
                  </button>
                ))}
                {feedbackData.center.rating > 0 && (
                  <span className="ml-2 text-sm font-medium text-slate-700">
                    {feedbackData.center.rating} / 5
                  </span>
                )}
              </div>

              {/* Comment Input */}
              <input
                type="text"
                value={feedbackData.center.comment}
                onChange={(e) => handleComment('center', e.target.value)}
                placeholder="Add a comment (optional)"
                className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
              />
            </div>
          </div>

          <div className="border-t border-slate-200"></div>

          {/* Doctor Feedback */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <UserCircle className="w-5 h-5 text-purple-600" />
              <h3 className="font-semibold text-slate-900">Rate the Doctor</h3>
            </div>
            
            <div className="mb-2">
              <p className="text-sm text-slate-600">{completedTherapy.doctorName}</p>
            </div>

            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
              {/* Star Rating */}
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => handleRating('doctor', star)}
                    className="transition-transform hover:scale-110"
                  >
                    <Star
                      className={`w-8 h-8 ${
                        star <= feedbackData.doctor.rating
                          ? "fill-amber-400 text-amber-400"
                          : "text-slate-300"
                      }`}
                    />
                  </button>
                ))}
                {feedbackData.doctor.rating > 0 && (
                  <span className="ml-2 text-sm font-medium text-slate-700">
                    {feedbackData.doctor.rating} / 5
                  </span>
                )}
              </div>

              {/* Comment Input */}
              <input
                type="text"
                value={feedbackData.doctor.comment}
                onChange={(e) => handleComment('doctor', e.target.value)}
                placeholder="Add a comment (optional)"
                className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none text-sm"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSubmit}
            disabled={!isValid || submitted}
            className={`flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-lg shadow-lg transition-all ${
              isValid && !submitted
                ? "bg-emerald-600 hover:bg-emerald-700 text-white hover:shadow-xl"
                : "bg-slate-300 text-slate-500 cursor-not-allowed"
            }`}
          >
            {submitted ? (
              <>
                <CheckCircle className="w-5 h-5" />
                Submitted!
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                Submit Feedback
              </>
            )}
          </button>
        </div>

        {/* Success Message */}
        {submitted && (
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 animate-fadeIn">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-6 h-6 text-green-600" />
              <div>
                <p className="font-semibold text-green-900">Thank you for your feedback!</p>
                <p className="text-sm text-green-700">Your review helps us improve our services.</p>
              </div>
            </div>
          </div>
        )}

        {/* Info Box */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <ThumbsUp className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-blue-900 mb-1">Why your feedback matters</p>
              <p className="text-sm text-blue-800">
                Your honest reviews help other patients make informed decisions and help us continuously improve our Ayurvedic care quality.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default FeedbackPage;
