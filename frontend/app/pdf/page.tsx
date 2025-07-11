'use client';

import Nav from "@/components/Nav";
import { useState } from "react";

export default function PDFUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setSuccessMsg(""); // reset message on new file select
    }
  };

  const handleSubmit = async () => {
    if (!file) return alert("Please select a file first!");

    const formData = new FormData();
    formData.append("pdf", file);

    setUploading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}pdf/`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to upload");

      setSuccessMsg("✅ PDF uploaded successfully!");
      setFile(null);
    } catch (error) {
      console.error("Upload failed:", error);
      alert("❌ Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <section className="bg-slate-900 min-h-screen">
      <Nav />

      <div className="flex flex-col items-center justify-center px-4 py-20">
        <h1 className="text-4xl sm:text-5xl font-bold text-blue-400 mb-4 text-center">
          Upload Your PDF
        </h1>

        <p className="text-slate-300 text-center mb-8 max-w-xl">
          Submit your study notes or materials in PDF format. Our AI will process it and help generate questions.
        </p>

        {/* Upload Box */}
        <div className="bg-slate-800 border border-slate-700 p-6 rounded-xl w-full max-w-md flex flex-col gap-4 items-center">
          <input
            type="file"
            accept=".pdf,.txt"
            onChange={handleFileChange}
            className="block w-full text-sm text-slate-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
          />

          <button
            onClick={handleSubmit}
            disabled={uploading}
            className="cursor-pointer w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            {uploading ? "Uploading..." : "Submit PDF"}
          </button>

          {successMsg && (
            <p className="text-green-400 text-sm text-center">{successMsg}</p>
          )}
        </div>
      </div>
    </section>
  );
}
