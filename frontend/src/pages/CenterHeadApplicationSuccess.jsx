import React from "react";

const CenterHeadApplicationSuccess = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-emerald-50 to-[#1E4B3C]/40 px-4">
      <div className="w-full max-w-xl rounded-3xl bg-white shadow-2xl border border-emerald-100 px-6 py-10 md:px-10 md:py-12 text-center">
        {/* Animated green tick */}
        <div className="relative mx-auto mb-6 flex h-24 w-24 items-center justify-center">
          <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-500/40 animate-ping" />
          <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-[#1E4B3C] text-white shadow-lg">
            <svg
              className="h-12 w-12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </div>
        </div>

        {/* Heading + short line */}
        <h1 className="text-2xl md:text-3xl font-extrabold text-[#1E4B3C]">
          Center Application Submitted
        </h1>
        <p className="mt-2 text-sm md:text-base text-gray-600 max-w-md mx-auto">
          Thank you for submitting your Panchakarma center details. Your
          application has been received successfully.
        </p>

        {/* Status explanation */}
        <div className="mt-5 space-y-2 text-xs md:text-sm text-gray-600 max-w-lg mx-auto">
          <p>
            Our team will now verify your information and documents. If
            everything is correct, login credentials for your Center Head
            account will be shared on your registered email address.
          </p>
          <p>
            This process can take some time depending on the volume of
            applications. Please stay tuned and keep an eye on your inbox and
            spam folder.
          </p>
        </div>

        {/* Info pill */}
        <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-[11px] md:text-xs text-emerald-900 border border-emerald-200">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>
            You will receive an email notification once your center is approved.
          </span>
        </div>

        {/* Back / home buttons */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <a
            href="/"
            className="inline-flex justify-center rounded-full bg-[#1E4B3C] px-6 py-2.5 text-xs md:text-sm font-semibold text-white shadow-md hover:bg-emerald-800 transition-colors"
          >
            Go to Home
          </a>
          <a
            href="/support"
            className="inline-flex justify-center rounded-full border border-[#1E4B3C] px-6 py-2.5 text-xs md:text-sm font-semibold text-[#1E4B3C] hover:bg-emerald-50 transition-colors"
          >
            Need help?
          </a>
        </div>
      </div>
    </div>
  );
};

export default CenterHeadApplicationSuccess;
