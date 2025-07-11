'use client';
import { useState, useEffect } from "react";
import Nav from "@/components/Nav";
import { useRouter } from "next/navigation";
export default function Process() {
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const [uploading, setUploading] = useState(false);

  const [pdfMessage, setPdfMessage] = useState("");
  const [pdfMessageType, setPdfMessageType] = useState<"success" | "error" | "">("");

  const [videoMessage, setVideoMessage] = useState("");
  const [videoMessageType, setVideoMessageType] = useState<"success" | "error" | "">("");
  
  const router = useRouter()
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setPdfMessage("");
      setPdfMessageType("");
    }
  };

 const FileSubmit = async () => {
  if (!file) {
    setPdfMessage("Please select a file first!");
    setPdfMessageType("error");
    return;
  }

  const formData = new FormData();
  formData.append("pdf", file);
  setUploading(true);

  try {
    const response = await fetch("/api/sendpdf", {
      method: "POST",
      body: formData,
      credentials: "include", // Important for session/cookie-based auth
    });

    if (response.status === 401) {
      setPdfMessage("🔒 Please log in to upload.");
      setPdfMessageType("error");
        setTimeout(() => {
        router.push("/auth/login");
      }, 2000); // 2 seconds delay
      return;
    }

    if (!response.ok) {
      setPdfMessage("❌ Failed to upload PDF.");
      setPdfMessageType("error");
    } else {
      setPdfMessage("✅ PDF uploaded successfully!");
      setPdfMessageType("success");
      setFile(null);
    }
  } catch (error) {
    console.error("Upload failed", error);
    setPdfMessage("❌ Upload failed.");
    setPdfMessageType("error");
  } finally {
    setUploading(false);
  }
};

 const VidSubmit = async () => {
  if (!youtubeUrl.trim()) {
    setVideoMessage("Please enter a YouTube URL!");
    setVideoMessageType("error");
    return;
  }

  try {
    const response = await fetch("/api/sendurl", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include", // if using cookies/session auth
      body: JSON.stringify({ youtubeUrl }),
    });
     const data = await response.json();
       if (data.success) {
      setVideoMessage(data.message); // "Quiz generated successfully"
      setVideoMessageType("success");
    } else {
      setVideoMessage(data.message || "Something went wrong.");
      setVideoMessageType("error");
    }
    if (response.status === 401) {
      setVideoMessage("🔒 Please log in to submit.");
      setVideoMessageType("error");

      setTimeout(() => {
        router.push("/auth/login");
      }, 2000); // 2 seconds delay
// 👈 Redirect to login
      return;
    }

    if (!response.ok) {
      setVideoMessage("❌ Failed to submit YouTube URL.");
      setVideoMessageType("error");
    } else {
      setVideoMessage("✅ YouTube URL submitted successfully!");
      setVideoMessageType("success");
      setYoutubeUrl("");
    }
  } catch (error) {
    console.error("Video URL submit failed", error);
    setVideoMessage("❌ Video submission failed.");
    setVideoMessageType("error");
  }
};

  // Auto-dismiss messages
  useEffect(() => {
    if (pdfMessage) {
      const timeout = setTimeout(() => {
        setPdfMessage("");
        setPdfMessageType("");
      }, 5000);
      return () => clearTimeout(timeout);
    }
  }, [pdfMessage]);

  useEffect(() => {
    if (videoMessage) {
      const timeout = setTimeout(() => {
        setVideoMessage("");
        setVideoMessageType("");
      }, 5000);
      return () => clearTimeout(timeout);
    }
  }, [videoMessage]);

  return (
    <section className="min-h-screen bg-slate-900 text-white font-main">
      <Nav />

      <div className="flex flex-col justify-center items-center px-4 py-20 sm:py-32">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-blue-400 text-center mb-4">
          Submit Your Notes
        </h1>

        <p className="text-slate-300 text-center text-base sm:text-lg max-w-2xl mb-12">
          Upload your study materials below — either a lecture video or PDF notes.
          Our AI will process the content to help generate quizzes and study questions
          tailored to your input.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-8 w-full max-w-4xl">
          {/* 🎥 Video Upload Section */}
          <div className="flex-1 bg-slate-800/50 border border-slate-700 p-6 rounded-2xl hover:bg-slate-800/70 transition duration-300">
            <p className="text-xl font-semibold text-blue-300 mb-2 text-center">🎥 Video</p>
            <p className="text-slate-400 text-sm text-center leading-relaxed mb-4">
              Paste a YouTube video link. We'll transcribe the audio and extract quiz-worthy insights.
            </p>

            <input
              type="text"
              placeholder="Paste your YouTube URL..."
              value={youtubeUrl}
              onChange={(e) => setYoutubeUrl(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 mb-3"
            />

            <div className="h-5 mb-4">
              {videoMessage && (
                <p
                  aria-live="polite"
                  className={`text-center text-sm font-medium ${
                    videoMessageType === "success"
                      ? "text-green-400"
                      : videoMessageType === "error"
                      ? "text-red-400"
                      : "text-white"
                  }`}
                >
                  {videoMessage}
                </p>
              )}
            </div>

            <button
              onClick={VidSubmit}
              className=" cursor-pointer w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Submit Video URL
            </button>
          </div>

          {/* OR Divider */}
          <div className="text-slate-400 font-semibold hidden sm:block">OR</div>

          {/* 📄 PDF Upload Section */}
          <div className="flex-1 bg-slate-800/50 border border-slate-700 p-6 rounded-2xl hover:bg-slate-800/70 transition duration-300">
            <p className="text-xl font-semibold text-blue-300 mb-2 text-center">📄 PDF</p>
            <p className="text-slate-400 text-sm text-center leading-relaxed mb-4">
              Upload your notes in PDF format. The AI will extract key points and turn them into study materials.
            </p>

            <input
              type="file"
              accept=".pdf,.txt"
              onChange={handleFileChange}
              className="block w-full text-sm text-slate-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 mb-3"
            />

            <div className="h-5 mb-4">
              {pdfMessage && (
                <p
                  aria-live="polite"
                  className={`text-center text-sm font-medium ${
                    pdfMessageType === "success"
                      ? "text-green-400"
                      : pdfMessageType === "error"
                      ? "text-red-400"
                      : "text-white"
                  }`}
                >
                  {pdfMessage}
                </p>
              )}
            </div>

            <button
              onClick={FileSubmit}
              disabled={uploading}
              className={` cursor-pointer w-full py-2 rounded-lg transition ${
                uploading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
              } text-white`}
            >
              {uploading ? "Uploading..." : "Submit PDF"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
