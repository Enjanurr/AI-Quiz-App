'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "">("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}token/`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
 
    const data = await response.json();
    localStorage.setItem("access", data.access);
    if (response.ok) {
      setMessage("✅ Login Successfully");
      setMessageType("success");
      router.push("/");
    } else {
      const errorMessage =
        data?.detail ||
        data?.error ||
        data?.non_field_errors?.[0] ||
        "❌ Login failed.";
      setMessage(errorMessage);
      setMessageType("error");
    }
  };

  return (
    <section className="bg-slate-900 min-h-screen flex items-center justify-center px-4">
      <div className="flex flex-col items-center space-y-6 min-w-3xl">
        <h1 className="text-blue-400 text-6xl font-bold font-main text-center mb-20">
          Welcome back!
        </h1>

        <div className="bg-slate-800/50 border border-slate-700 p-8 rounded-2xl w-full max-w-md shadow-md hover:bg-slate-800/70 transition duration-300">
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="Email"
                className="block text-slate-300 text-sm font-medium mb-1"
              >
                Email
              </label>
              <input
                type="text"
                id="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your Email"
                className="w-full px-4 py-2 rounded-lg bg-slate-900 border border-slate-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-slate-300 text-sm font-medium mb-1"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-4 py-2 rounded-lg bg-slate-900 border border-slate-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* 🔥 Styled message feedback */}
            {message && (
              <p
                className={`text-sm text-center font-medium h-5 ${
                  messageType === "success"
                    ? "text-green-400"
                    : messageType === "error"
                    ? "text-red-400"
                    : ""
                }`}
              >
                {message}
              </p>
            )}

            <p className="text-slate-300 text-sm text-center">
              Don&apos;t have an account yet?{" "}
              <a
                href="/auth/register"
                className="text-blue-400 font-semibold hover:underline"
              >
                Click here to register
              </a>
            </p>

            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition duration-300 cursor-pointer"
            >
              Log In
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
