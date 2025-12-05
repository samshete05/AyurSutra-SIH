// pages/patient/FeedbackPage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Star,
  Send,
  CheckCircle,
  Heart,
  MapPin,
  UserCircle,
  ThumbsUp,
  Clock,
  Calendar,
  ArrowLeft,
  AlertCircle,
  Sparkles
} from "lucide-react";
import Loader from "../../components/Loader";

function FeedbackPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const therapyId = searchParams.get("therapyId");

  const [feedbackData, setFeedbackData] = useState({
    therapy: { rating: 0, comment: "" },
    center: { rating: 0, comment: "" },
    doctor: { rating: 0, comment: "" }
  });

  const [therapyDetails, setTherapyDetails] = useState(null);
  const [pendingFeedbacks, setPendingFeedbacks] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [feedbackExists, setFeedbackExists] = useState(false);

  useEffect(() => {
    if (therapyId) {
      fetchTherapyDetails(therapyId);
    } else {
      fetchPendingFeedbacks();
    }
  }, [therapyId]);

  const fetchTherapyDetails = async (id) => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3000/patient/therapy/${id}/feedback-details`,
        {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }
      );

      const data = await response.json();

      if (response.ok) {
        setTherapyDetails(data.therapy);
        setFeedbackExists(data.feedbackExists);
        
        if (data.feedbackExists) {
          // Pre-fill existing feedback
          setFeedbackData({
            therapy: {
              rating: data.existingFeedback.therapyRating,
              comment: data.existingFeedback.therapyComment
            },
            center: {
              rating: data.existingFeedback.centerRating,
              comment: data.existingFeedback.centerComment
            },
            doctor: {
              rating: data.existingFeedback.doctorRating,
              comment: data.existingFeedback.doctorComment
            }
          });
        }
      } else {
        setError(data.message);
      }
    } catch (err) {
      console.error("Error fetching therapy details:", err);
      setError("Failed to load therapy details");
    } finally {
      setLoading(false);
    }
  };

  const fetchPendingFeedbacks = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:3000/patient/therapies/pending-feedback",
        {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }
      );

      const data = await response.json();

      if (response.ok) {
        setPendingFeedbacks(data.pendingFeedbacks);
        
        // If only one pending, auto-select it
        if (data.pendingFeedbacks.length === 1) {
          navigate(`/patient/feedback?therapyId=${data.pendingFeedbacks[0]._id}`);
        }
      }
    } catch (err) {
      console.error("Error fetching pending feedbacks:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleRating = (category, rating) => {
    if (feedbackExists) return; // Prevent editing submitted feedback
    
    setFeedbackData(prev => ({
      ...prev,
      [category]: { ...prev[category], rating }
    }));
  };

  const handleComment = (category, comment) => {
    if (feedbackExists) return;
    
    setFeedbackData(prev => ({
      ...prev,
      [category]: { ...prev[category], comment }
    }));
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem("authToken");
    
    try {
      const response = await fetch(
        `http://localhost:3000/patient/therapy/${therapyId}/feedback`,
        {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            therapyRating: feedbackData.therapy.rating,
            therapyComment: feedbackData.therapy.comment,
            centerRating: feedbackData.center.rating,
            centerComment: feedbackData.center.comment,
            doctorRating: feedbackData.doctor.rating,
            doctorComment: feedbackData.doctor.comment
          })
        }
      );

      const data = await response.json();

      if (response.ok) {
        setSubmitted(true);
        
        // Trigger notification update
        window.dispatchEvent(new Event("notificationsUpdated"));
        
        setTimeout(() => {
          navigate("/patient");
        }, 3000);
      } else {
        alert(data.message || "Failed to submit feedback");
      }
    } catch (err) {
      console.error("Error submitting feedback:", err);
      alert("Failed to submit feedback");
    }
  };

  const isValid = feedbackData.therapy.rating > 0 && 
                  feedbackData.center.rating > 0 && 
                  feedbackData.doctor.rating > 0;

  // Loading state
  if (loading) {
    return <Loader />;
  }

  // Multiple pending feedbacks - selection screen
  if (!therapyId && pendingFeedbacks.length > 1) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50 p-4 md:p-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-6">
            <button
              onClick={() => navigate("/patient")}
              className="flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-4 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Dashboard</span>
            </button>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Pending Feedbacks</h1>
            <p className="text-slate-600">Select a completed therapy to share your experience</p>
          </div>

          {/* Therapy Cards */}
          <div className="grid gap-4">
            {pendingFeedbacks.map((therapy) => (
              <div
                key={therapy._id}
                onClick={() => navigate(`/patient/feedback?therapyId=${therapy._id}`)}
                className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200 hover:border-emerald-400 hover:shadow-xl transition-all cursor-pointer group"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-slate-900 mb-2 group-hover:text-emerald-600 transition-colors">
                      {therapy.therapyName}
                    </h3>
                    
                    <div className="space-y-2 text-sm text-slate-600">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-blue-500" />
                        <span>{therapy.centerName}</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <UserCircle className="w-4 h-4 text-purple-500" />
                        <span>{therapy.doctorName}</span>
                      </div>
                      
                      <div className="flex items-center gap-4 text-xs text-slate-500">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          Completed: {new Date(therapy.completedDate).toLocaleDateString()}
                        </span>
                        <span>Duration: {therapy.duration} days</span>
                        <span>Sessions: {therapy.sessionsCompleted}/{therapy.totalSessions}</span>
                      </div>
                    </div>
                  </div>

                  <div className="ml-4">
                    <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center group-hover:bg-emerald-200 transition-colors">
                      <Sparkles className="w-6 h-6 text-emerald-600" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // No pending feedbacks
  if (!therapyId && pendingFeedbacks.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center border border-slate-200">
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-emerald-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">All Caught Up!</h2>
            <p className="text-slate-600 mb-4">
              You don't have any pending feedback requests at the moment.
            </p>
            <p className="text-sm text-slate-500 mb-6">
              Once you complete a therapy session, you'll be able to share your experience here.
            </p>
            <button
              onClick={() => navigate("/patient")}
              className="px-6 py-3 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 transition-colors"
            >
              Go to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center border border-red-200">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-8 h-8 text-red-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Oops!</h2>
            <p className="text-slate-600 mb-6">{error}</p>
            <button
              onClick={() => navigate("/patient")}
              className="px-6 py-3 bg-slate-600 text-white rounded-xl font-semibold hover:bg-slate-700 transition-colors"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Feedback already submitted
  if (feedbackExists) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50 p-4 md:p-6">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => navigate("/patient")}
            className="flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Dashboard</span>
          </button>

          <div className="bg-white rounded-2xl shadow-lg p-8 border border-emerald-200">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-emerald-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Feedback Already Submitted</h2>
              <p className="text-slate-600">Thank you for sharing your experience!</p>
            </div>

            {/* Show submitted feedback (read-only) */}
            <div className="space-y-6 bg-slate-50 rounded-xl p-6">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Heart className="w-5 h-5 text-emerald-600" />
                  <h3 className="font-semibold text-slate-900">Therapy Rating</h3>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-6 h-6 ${
                          star <= feedbackData.therapy.rating
                            ? "fill-amber-400 text-amber-400"
                            : "text-slate-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-medium text-slate-700">
                    {feedbackData.therapy.rating} / 5
                  </span>
                </div>
                {feedbackData.therapy.comment && (
                  <p className="mt-2 text-sm text-slate-600 italic">"{feedbackData.therapy.comment}"</p>
                )}
              </div>

              <div className="border-t border-slate-200 pt-6">
                <div className="flex items-center gap-2 mb-3">
                  <MapPin className="w-5 h-5 text-blue-600" />
                  <h3 className="font-semibold text-slate-900">Center Rating</h3>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-6 h-6 ${
                          star <= feedbackData.center.rating
                            ? "fill-amber-400 text-amber-400"
                            : "text-slate-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-medium text-slate-700">
                    {feedbackData.center.rating} / 5
                  </span>
                </div>
                {feedbackData.center.comment && (
                  <p className="mt-2 text-sm text-slate-600 italic">"{feedbackData.center.comment}"</p>
                )}
              </div>

              <div className="border-t border-slate-200 pt-6">
                <div className="flex items-center gap-2 mb-3">
                  <UserCircle className="w-5 h-5 text-purple-600" />
                  <h3 className="font-semibold text-slate-900">Doctor Rating</h3>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-6 h-6 ${
                          star <= feedbackData.doctor.rating
                            ? "fill-amber-400 text-amber-400"
                            : "text-slate-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-medium text-slate-700">
                    {feedbackData.doctor.rating} / 5
                  </span>
                </div>
                {feedbackData.doctor.comment && (
                  <p className="mt-2 text-sm text-slate-600 italic">"{feedbackData.doctor.comment}"</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Main feedback form
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50 p-4 md:p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Back Button */}
        <button
          onClick={() => navigate("/patient")}
          className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Dashboard</span>
        </button>

        {/* Header with Therapy Info */}
        <div 
          className="relative bg-gradient-to-r from-emerald-600 to-blue-600 rounded-2xl shadow-xl p-8 overflow-hidden"
        >
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24"></div>

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Share Your Experience</h1>
                <p className="text-sm text-white/90">Your feedback helps us improve</p>
              </div>
            </div>

            {/* Therapy Details Card */}
            <div className="bg-white/95 backdrop-blur-sm rounded-xl p-5 space-y-3">
              <h3 className="text-lg font-bold text-slate-900">{therapyDetails?.therapyName}</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2 text-slate-700">
                  <MapPin className="w-4 h-4 text-blue-500 flex-shrink-0" />
                  <span className="truncate">{therapyDetails?.centerName}</span>
                </div>
                
                <div className="flex items-center gap-2 text-slate-700">
                  <UserCircle className="w-4 h-4 text-purple-500 flex-shrink-0" />
                  <span>{therapyDetails?.doctorName}</span>
                </div>
                
                <div className="flex items-center gap-2 text-slate-600">
                  <Calendar className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>Completed: {new Date(therapyDetails?.completedDate).toLocaleDateString()}</span>
                </div>
                
                <div className="flex items-center gap-2 text-slate-600">
                  <Clock className="w-4 h-4 text-amber-500 flex-shrink-0" />
                  <span>Sessions: {therapyDetails?.sessionsCompleted}/{therapyDetails?.totalSessions}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feedback Form */}
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-slate-200 space-y-8">
          
          {/* Therapy Feedback */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                <Heart className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">How was the therapy?</h3>
                <p className="text-xs text-slate-500">Rate the effectiveness and overall experience</p>
              </div>
            </div>
            
            <div className="pl-13 space-y-3">
              <div className="flex items-center gap-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => handleRating('therapy', star)}
                    className="transition-all hover:scale-110 active:scale-95"
                  >
                    <Star
                      className={`w-10 h-10 ${
                        star <= feedbackData.therapy.rating
                          ? "fill-amber-400 text-amber-400 drop-shadow-md"
                          : "text-slate-300 hover:text-amber-300"
                      }`}
                    />
                  </button>
                ))}
                {feedbackData.therapy.rating > 0 && (
                  <span className="ml-2 text-lg font-bold text-slate-900">
                    {feedbackData.therapy.rating} / 5
                  </span>
                )}
              </div>

              <textarea
                value={feedbackData.therapy.comment}
                onChange={(e) => handleComment('therapy', e.target.value)}
                placeholder="Share your experience with the therapy (optional)"
                rows={3}
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none text-sm resize-none"
              />
            </div>
          </div>

          <div className="border-t border-slate-200"></div>

          {/* Center Feedback */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <MapPin className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">How was the center?</h3>
                <p className="text-xs text-slate-500">{therapyDetails?.centerName}</p>
              </div>
            </div>
            
            <div className="pl-13 space-y-3">
              <div className="flex items-center gap-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => handleRating('center', star)}
                    className="transition-all hover:scale-110 active:scale-95"
                  >
                    <Star
                      className={`w-10 h-10 ${
                        star <= feedbackData.center.rating
                          ? "fill-amber-400 text-amber-400 drop-shadow-md"
                          : "text-slate-300 hover:text-amber-300"
                      }`}
                    />
                  </button>
                ))}
                {feedbackData.center.rating > 0 && (
                  <span className="ml-2 text-lg font-bold text-slate-900">
                    {feedbackData.center.rating} / 5
                  </span>
                )}
              </div>

              <textarea
                value={feedbackData.center.comment}
                onChange={(e) => handleComment('center', e.target.value)}
                placeholder="Share your thoughts about the facilities, ambiance, and staff (optional)"
                rows={3}
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm resize-none"
              />
            </div>
          </div>

          <div className="border-t border-slate-200"></div>

          {/* Doctor Feedback */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <UserCircle className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">How was the doctor?</h3>
                <p className="text-xs text-slate-500">{therapyDetails?.doctorName}</p>
              </div>
            </div>
            
            <div className="pl-13 space-y-3">
              <div className="flex items-center gap-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => handleRating('doctor', star)}
                    className="transition-all hover:scale-110 active:scale-95"
                  >
                    <Star
                      className={`w-10 h-10 ${
                        star <= feedbackData.doctor.rating
                          ? "fill-amber-400 text-amber-400 drop-shadow-md"
                          : "text-slate-300 hover:text-amber-300"
                      }`}
                    />
                  </button>
                ))}
                {feedbackData.doctor.rating > 0 && (
                  <span className="ml-2 text-lg font-bold text-slate-900">
                    {feedbackData.doctor.rating} / 5
                  </span>
                )}
              </div>

              <textarea
                value={feedbackData.doctor.comment}
                onChange={(e) => handleComment('doctor', e.target.value)}
                placeholder="Share your experience with the doctor's expertise and care (optional)"
                rows={3}
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none text-sm resize-none"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex flex-col sm:flex-row gap-4 justify-end">
          <button
            onClick={() => navigate("/patient")}
            className="px-6 py-4 rounded-xl font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-all"
          >
            Skip for Now
          </button>
          
          <button
            onClick={handleSubmit}
            disabled={!isValid || submitted}
            className={`flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-semibold text-lg shadow-lg transition-all ${
              isValid && !submitted
                ? "bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white hover:shadow-xl transform hover:-translate-y-0.5"
                : "bg-slate-300 text-slate-500 cursor-not-allowed"
            }`}
          >
            {submitted ? (
              <>
                <CheckCircle className="w-6 h-6" />
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
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-6 animate-fadeIn shadow-lg">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="font-bold text-green-900 text-lg mb-1">Thank you for your feedback!</p>
                <p className="text-sm text-green-700">
                  Your review has been submitted successfully. Redirecting to dashboard...
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Info Box */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
              <ThumbsUp className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-blue-900 mb-2">Why your feedback matters</p>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Helps other patients make informed decisions</li>
                <li>• Enables us to improve our services continuously</li>
                <li>• Recognizes excellent care providers</li>
                <li>• Maintains quality standards across all centers</li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default FeedbackPage;
