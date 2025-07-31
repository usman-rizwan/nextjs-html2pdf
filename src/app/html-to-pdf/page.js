import PDFEditor from "@/components/PDFEditor";

export default function PDFPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8 text-black">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            PDF Generation Test
          </h1>

          <PDFEditor />
        </div>
      </div>
    </div>
  );
}
