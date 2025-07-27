'use client';

import { useRouter } from "next/navigation";

const Hero = () => {
  const router = useRouter();

  return (
    <section className="font-main bg-slate-900 text-white px-4 py-16 sm:py-20 flex flex-col items-center">
      {/* Hero Header */}
   <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mt-10">
  <div className="text-center">
    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight text-white">
      AI Quiz Generator
    </h1>
    <span className="block text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-blue-400 mt-2">
      Powered by Cohere
    </span>
  </div>

  <p className="mt-6 text-center text-sm sm:text-base md:text-xl text-gray-300 font-semibold max-w-2xl mx-auto px-2">
    Create quizzes instantly from any lecture, tutorial, or training video.
  </p>

  <p className="mt-4 text-center text-xs sm:text-sm md:text-base text-gray-400 max-w-xl mx-auto px-4">
    Just upload a video or paste a YouTube link — our AI handles transcription, analysis, and quiz creation for you.
  </p>
</div>



      {/* CTA */}
      <div className="mt-8 flex flex-col sm:flex-row items-center gap-6 sm:gap-10">
        <button
          onClick={() => router.push("/process")}
          className="cursor-pointer bg-blue-400 hover:bg-blue-500 text-black font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-xl text-sm sm:text-base transition duration-300 shadow-lg"
        >
          🎯 Generate Your First Quiz
        </button>
        <a
          href="#works"
          className="px-6 sm:px-8 py-3 sm:py-4 bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-600 hover:border-slate-500 rounded-2xl font-semibold text-sm sm:text-base transition-all duration-300"
        >
          See How It Works →
        </a>
      </div>

      {/* Why Use Our Quiz Generator */}
      <div className="mt-24 w-full max-w-6xl text-center px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-100 mb-6">
          Why Use Our Quiz Generator?
        </h2>
        <p className="text-base sm:text-lg text-slate-400 max-w-3xl mx-auto leading-relaxed">
          Experience effortless quiz creation from educational videos — fast,
          accurate, and tailored to boost retention.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mt-12 sm:mt-16">
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
              className="p-5 sm:p-6 bg-slate-800/50 border border-slate-700 rounded-2xl backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-slate-900/50"
            >
              <h3 className="text-lg sm:text-xl font-bold text-slate-100 mb-2">
                {item.title}
              </h3>
              <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* How It Works */}
      <div id="works" className="mt-24 w-full max-w-6xl px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-100 mb-6">
          How It Works
        </h2>
        <p className="text-base sm:text-lg text-slate-400 max-w-3xl mx-auto leading-relaxed">
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
              className="bg-slate-800/50 border border-slate-700 p-5 sm:p-6 rounded-2xl text-left hover:bg-slate-800/70 transition duration-300"
            >
              <span className="block text-blue-400 text-xl font-bold mb-3">
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
      <div className="mt-24 bg-gradient-to-r from-sky-500/10 to-yellow-500/10 border border-sky-500/20 rounded-2xl p-6 sm:p-10 text-center max-w-6xl mx-auto">
        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-100 mb-4">
          Ready to Turn Your Videos into Quizzes?
        </h3>
        <p className="text-sm sm:text-base text-slate-400 mb-6 sm:mb-8 max-w-2xl mx-auto">
          Upload any video and let our AI handle the rest — saving you hours of
          manual work while helping learners retain information better.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => router.push("/process")}
            className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-600 hover:to-cyan-600 text-white rounded-xl font-semibold transition-all duration-300 transform hover:scale-105"
          >
            🎥 Start Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
