import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const login = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const res = await axios.post("https://btcbackend-e7yt.onrender.com/login", {
        Email: email,
        Password: password,
      });

      toast.success(res.data.message || "Login successful");

      if (remember) {
        localStorage.setItem("auth", res.data.token);
      } else {
          localStorage.setItem("auth", res.data.token);

      }

      window.location.href = "/";

    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message || "Login failed");
      } else if (error.request) {
        toast.error("No response from server");
      } else {
        toast.error("Request error");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex w-screen h-screen overflow-hidden">
      {/* Left Side */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-indigo-600 to-purple-700 text-white p-12 flex-col justify-center items-center relative">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative z-10 max-w-md text-center">
          <h1 className="text-4xl font-bold mb-6">Welcome Back!</h1>
          <p className="text-lg mb-8 opacity-90">
            Sign in to continue to your dashboard and explore all the amazing
            features we’ve prepared for you.
          </p>
          <img
            src="/undraw_starting-work_ifnt.svg"
            alt="Workspace"
            className="rounded-lg shadow-lg border border-white/20 mx-auto"
          />
        </div>
      </div>

      {/* Right Side */}
      <div className="flex flex-1 justify-center items-center p-8 bg-white">
        <div className="max-w-md w-full space-y-6">
          <h2 className="text-3xl font-bold text-gray-800 text-center">
            Login to Your Account
          </h2>
          <form className="mt-6 space-y-5" onSubmit={login}>
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                required
              />
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                />
                Remember me
              </label>
            </div>

            {/* Submit Button */}
            <button
              disabled={loading}
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-200 shadow-md disabled:opacity-50"
            >
              {loading ? "Loading..." : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
