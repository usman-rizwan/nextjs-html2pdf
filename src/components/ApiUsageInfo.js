export default function ApiUsageInfo() {
    return (
      <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-md">
        <h3 className="font-semibold text-blue-900 mb-2">API Usage:</h3>
        <p className="text-blue-800 text-sm mb-2">
          This page demonstrates the PDF generation API. You can also use it
          directly:
        </p>
        <code className="block bg-blue-100 p-3 rounded text-sm">
          POST /api/pdf
          <br />
          Content-Type: application/json
          <br />
          Body: {'{ html: "&lt;html&gt;...&lt;/html&gt;" }'}
        </code>
      </div>
    );
  }
  