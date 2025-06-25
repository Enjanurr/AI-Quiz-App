'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Register() {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<"success" | "error" | "">("");
  const [loading, setLoading] = useState(false);
  
  const formIsValid = userName && email && password && confirmPassword;
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("❌ Passwords don't match");
      setMessageType("error");
      return;
    }

    if (password.length < 6) {
      setMessage("❌ Password must be at least 6 characters");
      setMessageType("error");
      return;
    }

    try {
      setMessage("");
      setMessageType("");
      setLoading(true);

      const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}user/register/`, {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({
          username: userName,
          email: email,
          password: password
        })
      });

      const data = await response.json();
      setLoading(false);

      if (response.ok) {
        setMessage("✅ Registered successfully!");
        setMessageType("success");
        setTimeout(() => {
          router.push("/auth/login");
        }, 1500); // optional delay
      } else {
        const errorMessages = Object.values(data).flat().join(" ");
        setMessage("❌ " + errorMessages);
        setMessageType("error");
      }

    } catch (error) {
      setMessage("❌ Something went wrong. Please try again.");
      setMessageType("error");
      setLoading(false);
    }
  };

  return (
    <section className="bg-slate-900 min-h-screen flex items-center justify-center px-4">
      <div className="flex flex-col items-center space-y-6">
        <h1 className="text-blue-400 text-6xl font-bold font-main text-center mb-10">
          Let us know who you are
        </h1>

        <div className="bg-slate-800/50 border border-slate-700 p-8 rounded-2xl w-full max-w-md shadow-md hover:bg-slate-800/70 transition duration-300">
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username" className="block text-slate-300 text-sm font-medium mb-1">
                Username
              </label>
              <input
                type="text"
                id="username"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Choose a username"
                className="w-full px-4 py-2 rounded-lg bg-slate-900 border border-slate-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-slate-300 text-sm font-medium mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-2 rounded-lg bg-slate-900 border border-slate-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-slate-300 text-sm font-medium mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-4 py-2 rounded-lg bg-slate-900 border border-slate-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-slate-300 text-sm font-medium mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                className="w-full px-4 py-2 rounded-lg bg-slate-900 border border-slate-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* ✅ Message */}
            <div className="h-4 text-center">
              {message && (
                <p className={`text-sm font-medium ${
                  messageType === "success" ? "text-green-400" : "text-red-400"
                }`}>
                  {message}
                </p>
              )}
            </div>

            <p className="text-slate-300 text-sm text-center">
              Already have an account?{" "}
              <a href="/auth/login" className="text-blue-400 font-semibold hover:underline">
                Click here to Login
              </a>
            </p>

            <button
              type="submit"
              disabled={!formIsValid || loading}
              className={`w-full text-white font-semibold py-2 rounded-lg transition duration-300 ${
                formIsValid && !loading
                  ? 'bg-blue-500 hover:bg-blue-600 cursor-pointer'
                  : 'bg-blue-300 cursor-not-allowed opacity-60'
              }`}
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
