const Hero = () => {
  return (
    <section className="font-main bg-slate-900 text-white px-4 py-20 flex flex-col items-center">
      {/* Hero Header */}
      <h1 className="text-center text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mt-14 leading-tight">
        AI Quiz Generator
        <br className="hidden sm:block" />
        <span className="text-blue-400">Powered by AI</span>
      </h1>

      <p className="mt-6 text-center text-base sm:text-lg md:text-2xl text-gray-300 font-semibold max-w-2xl">
        Create quizzes instantly from any lecture, tutorial, or training video.
      </p>

      <p className="mt-4 text-center text-sm sm:text-base md:text-lg text-gray-400 max-w-xl">
        Just upload a video or paste a YouTube link — our AI handles
        transcription, analysis, and quiz creation for you.
      </p>

      {/* CTA */}
      <div className="mt-8 flex flex-col sm:flex-row items-center gap-10">
        <button className=" cursor-pointer bg-blue-400 hover:bg-blue-500 text-black font-bold px-8 py-4 rounded-xl text-sm sm:text-base transition duration-300 shadow-lg">
          🎯 Generate Your First Quiz
        </button>
        <a
          href="/vid"
          className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-600 hover:border-slate-500 rounded-2xl font-semibold text-lg transition-all duration-300"
        >
          See How It Works →
        </a>
      </div>

      {/* Features */}
      {/* Why Use Our Quiz Generator Section */}
      <div className="mt-32 w-full max-w-6xl text-center px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-slate-100 mb-6">
          Why Use Our Quiz Generator?
        </h2>
        <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
          Experience effortless quiz creation from educational videos — fast,
          accurate, and tailored to boost retention.
        </p>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
          {[
            {
              title: "🎯 Save Time",
              description:
                "No need to manually create questions. Let the AI do the work in seconds.",
            },
            {
              title: "📹 Video to Quiz",
              description:
                "Paste a YouTube link or upload a video — quizzes are created automatically.",
            },
            {
              title: "📊 Personalized Learning",
              description:
                "Questions are based on key concepts to improve comprehension and memory.",
            },
            {
              title: "⚡ Fast & Easy",
              description:
                "Minimal clicks, clean interface — quiz generation couldn’t be simpler.",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="p-6 bg-slate-800/50 border border-slate-700 rounded-2xl backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-slate-900/50"
            >
              <h3 className="text-xl font-bold text-slate-100 mb-2 group-hover:text-sky-400 transition-colors">
                {item.title}
              </h3>
              <p className="text-slate-400 leading-relaxed text-sm sm:text-base group-hover:text-slate-300 transition-colors">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* How It Works */}
      <div
        id="how-it-works"
        className="mt-32 w-full max-w-6xl px-4 text-center"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-slate-100 mb-6">
          How It Works
        </h2>
        <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
          From video to quiz in just a few clicks — powered by cutting-edge AI.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-12">
          {[
            "Upload a video or paste a YouTube link",
            "AI transcribes and analyzes the content",
            "Key points are turned into quiz questions",
            "You preview, edit, and export your quiz",
          ].map((step, index) => (
            <div
              key={index}
              className="bg-slate-800/50 border border-slate-700 p-6 rounded-2xl text-left hover:bg-slate-800/70 transition duration-300"
            >
              <span className="block text-blue-400 text-2xl font-bold mb-3">
                {index + 1}.
              </span>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {step}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Final CTA */}
      <div className="mt-24 bg-gradient-to-r from-sky-500/10 to-yellow-500/10 border border-sky-500/20 rounded-2xl p-10 text-center max-w-6xl mx-auto">
        <h3 className="text-2xl md:text-3xl font-bold text-slate-100 mb-4">
          Ready to Turn Your Videos into Quizzes?
        </h3>
        <p className="text-slate-400 mb-8 max-w-2xl mx-auto">
          Upload any video and let our AI handle the rest — saving you hours of
          manual work while helping learners retain information better.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-600 hover:to-cyan-600 text-white rounded-xl font-semibold transition-all duration-300 transform hover:scale-105">
            🎥 Start Now
          </button>
          <a
            href="#"
            className="inline-flex items-center gap-3 px-6 py-3 bg-slate-700 hover:bg-slate-600 text-slate-100 border border-slate-600 hover:border-slate-500 rounded-xl font-semibold transition-all duration-300"
          >
            💡 Learn More
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
