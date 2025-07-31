'use client';

import { useState } from "react";
import { sampleHtml } from "@/helper/constants";
import ErrorMessage from "./ErrorMessage";

export default function PDFEditor() {
  const [htmlContent, setHtmlContent] = useState(sampleHtml);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState("");

  const generatePDF = async () => {
    setIsGenerating(true);
    setError("");

    try {
      const response = await fetch("/api/pdf", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ html: htmlContent }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to generate PDF");
      }

      const contentType = response.headers.get("Content-Type");
      if (contentType !== "application/pdf") {
        throw new Error("Response is not a PDF");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "generated-invoice.pdf";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      setError(err.message);
      console.error("PDF generation error:", err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <>
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          HTML Content:
        </label>
        <textarea
          value={htmlContent}
          onChange={(e) => setHtmlContent(e.target.value)}
          className="w-full h-96 p-3 border border-gray-300 rounded-md font-mono text-sm"
          placeholder="Enter HTML content here..."
        />
      </div>

      <div className="flex gap-4">
        <button
          onClick={generatePDF}
          disabled={isGenerating}
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isGenerating ? "Generating PDF..." : "Generate PDF"}
        </button>

        <button
          onClick={() => setHtmlContent("")}
          className="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
        >
          Clear
        </button>
      </div>

      {error && <ErrorMessage message={error} />}
    </>
  );
}
