export default function Register() {
  return (
    <section className="bg-slate-900 min-h-screen flex items-center justify-center px-4">
      <div className="flex flex-col items-center space-y-6">
        <h1 className="text-blue-400 text-6xl font-bold font-main text-center mb-10">
          Let us know who you are
        </h1>

        <div className="bg-slate-800/50 border border-slate-700 p-8 rounded-2xl w-full max-w-md shadow-md hover:bg-slate-800/70 transition duration-300">
          <form className="space-y-5">
            {/* Username */}
            <div>
              <label
                htmlFor="username"
                className="block text-slate-300 text-sm font-medium mb-1"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                placeholder="Choose a username"
                className="w-full px-4 py-2 rounded-lg bg-slate-900 border border-slate-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-slate-300 text-sm font-medium mb-1"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 rounded-lg bg-slate-900 border border-slate-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Password */}
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
                placeholder="Enter your password"
                className="w-full px-4 py-2 rounded-lg bg-slate-900 border border-slate-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-slate-300 text-sm font-medium mb-1"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                placeholder="Confirm your password"
                className="w-full px-4 py-2 rounded-lg bg-slate-900 border border-slate-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Redirect to Login */}
            <p className="text-slate-300 text-sm text-center">
              Already have an account?{' '}
              <a
                href="/auth/login"
                className="text-blue-400 font-semibold hover:underline"
              >
                Click here to Login
              </a>
            </p>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition duration-300 cursor-pointer"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
