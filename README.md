# Next.js HTML to PDF API

A Next.js application that provides an internal PDF generation API using Puppeteer, designed to replace external PDF generation services.

---

## 🚀 Features

- **PDF Generation API**: Convert HTML to PDF using Puppeteer  
- **RESTful Endpoint**: `POST /api/pdf` with JSON body containing HTML  
- **Binary Response**: Returns PDF as `application/pdf` binary stream  
- **Error Handling**: Comprehensive error handling and validation  
- **Test Interface**: Built-in test page for API demonstration  

---

## 📦 Installation

Install dependencies:

```bash
npm install
```

---

## 📡 API Usage

### Endpoint

```http
POST /api/pdf
```

### Request Format

```json
{
  "html": "<html><body><h1>Hello World</h1></body></html>"
}
```

### Response

- **Success**: PDF binary stream with `Content-Type: application/pdf`
- **Failure**: JSON error object with status code and message

---

### 🧪 Example Usage (Node.js)

```javascript
const response = await fetch("https://nextjs-html2pdf.vercel.app/api/pdf", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ html: htmlContent }),
});

if (response.headers.get("Content-Type") !== "application/pdf") {
  const data = await response.json();
  console.error("PDF generation error:", data);
  throw new Error("Could not generate PDF.");
}

const pdfArrayBuffer = await response.arrayBuffer();
return pdfArrayBuffer;
```

---

## 🛠 Development

Start the development server:

```bash
npm run dev
```

---

## 🧱 Project Structure

```
src/app/
├── api/
│   └── pdf/
│       └── route.js          # PDF generation API endpoint
├── html-to-pdf/
│   └── page.js               # Test interface for PDF generation
└── page.js                   # Main page with link to test
```

---

## ⚙️ API Implementation Highlights

1. **Input Validation**: Ensures HTML is provided and is a valid string  
2. **Puppeteer Configuration**: Headless and secure, with optimized flags  
3. **PDF Options**: A4 page, custom margins, background graphics enabled  
4. **Error Handling**: Graceful failure with proper browser cleanup  
5. **Content-Type Validation**: Ensures returned file is a valid PDF  

---

## ❗ Error Codes

| Code | Description                                 |
|------|---------------------------------------------|
| 400  | Invalid input (missing or malformed HTML)   |
| 405  | Method not allowed (only POST supported)    |
| 500  | Internal server error (Puppeteer failure)   |

---

## 🧪 Testing Interface

A simple test page is included at `/html-to-pdf` where you can:

- Enter custom HTML  
- Generate and preview PDFs  
- Download the output  
- View error messages if generation fails  
