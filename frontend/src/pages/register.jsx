export const Register = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-black relative overflow-hidden">

      {/* BG Radial Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#3a1d00_0%,#000_70%)] opacity-70"></div>

      {/* LOGO + TITLE */}
      <div className="absolute top-20 text-center">
        <div className="mx-auto w-16 h-16 bg-[#ff6b00] rounded-2xl flex items-center justify-center">
          <span className="text-white text-4xl">❤</span>
        </div>
        <h1 className="mt-4 text-4xl font-bold text-orange-500">AyurSutra</h1>
        <p className="text-gray-300 mt-1">Professional Panchakarma Management Platform</p>
      </div>

      {/* CARD */}
      <div className="relative mt-40 w-[420px] bg-[#0f0f0f] border border-[#222] shadow-xl rounded-2xl p-6 backdrop-blur-lg">

        {/* Header */}
        <h2 className="text-white text-2xl font-semibold text-center">Create Account</h2>
        <p className="text-gray-400 text-sm text-center mt-1">
          Register to access your healthcare portal
        </p>

        {/* Tabs */}
        <div className="flex items-center justify-center gap-3 mt-6">
          <button className="px-6 py-2 rounded-xl bg-[#1a1a1a] text-gray-400 hover:bg-[#222] transition">
            Sign In
          </button>
          <button className="px-6 py-2 rounded-xl bg-[#1a1a1a] text-white border border-orange-500">
            Register
          </button>
        </div>

        {/* FORM */}
        <div className="flex flex-col mt-6 gap-4">

          {/* Full Name */}
          <div>
            <label className="text-gray-300 text-sm">Full Name</label>
            <input
              placeholder="Enter full name"
              className="mt-1 w-full px-4 py-3 rounded-xl bg-[#1f1f1f] text-white border border-[#333] outline-none focus:border-orange-500 transition"
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-gray-300 text-sm">Email</label>
            <input
              placeholder="Enter your email"
              className="mt-1 w-full px-4 py-3 rounded-xl bg-[#1f1f1f] text-white border border-[#333] outline-none focus:border-orange-500 transition"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="text-gray-300 text-sm">Phone Number</label>
            <input
              placeholder="Enter phone number"
              className="mt-1 w-full px-4 py-3 rounded-xl bg-[#1f1f1f] text-white border border-[#333] outline-none focus:border-orange-500 transition"
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-gray-300 text-sm">Password</label>
            <input
              type="password"
              placeholder="Create a password"
              className="mt-1 w-full px-4 py-3 rounded-xl bg-[#1f1f1f] text-white border border-[#333] outline-none focus:border-orange-500 transition"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="text-gray-300 text-sm">Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm password"
              className="mt-1 w-full px-4 py-3 rounded-xl bg-[#1f1f1f] text-white border border-[#333] outline-none focus:border-orange-500 transition"
            />
          </div>

          {/* Button */}
          <button className="mt-4 w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl text-lg transition">
            Register
          </button>

          <p className="text-center text-gray-400 text-sm mt-2">
            Already have an account?{" "}
            <span className="text-orange-500 cursor-pointer hover:underline">Sign In</span>
          </p>

        </div>
      </div>
    </div>
  );
};
