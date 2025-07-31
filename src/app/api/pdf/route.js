import { options, puppeteer } from "@/helper";

export async function POST(request) {
  try {
    // Parse the request body
    const { html } = await request.json();
    console.log("req html ", html);

    // Validate input
    if (!html || typeof html !== "string") {
      return new Response(
        JSON.stringify({
          error: "HTML content is required and must be a string",
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    // Launch Puppeteer browser
    const browser = await puppeteer.launch(options);

    try {
      const page = await browser.newPage();

      await page.setContent(html, {
        waitUntil: ["networkidle0", "domcontentloaded"],
      });

      // Generate PDF
      const pdfBuffer = await page.pdf({
        format: "A4",
        printBackground: true,
        margin: {
          top: "20px",
          right: "20px",
          bottom: "20px",
          left: "20px",
        },
      });

      await browser.close();

      return new Response(pdfBuffer, {
        status: 200,
        headers: {
          "Content-Type": "application/pdf",
          "Content-Length": pdfBuffer.length.toString(),
          "Cache-Control": "no-cache",
        },
      });
    } catch (browserError) {
      await browser.close();
      throw browserError;
    }
  } catch (error) {
    console.error("PDF generation error:", error);

    return new Response(
      JSON.stringify({
        error: "Failed to generate PDF",
        details: error.message,
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}

// Handle unsupported methods
export async function GET() {
  return new Response(
    JSON.stringify({
      error: "Method not allowed. Use POST with HTML content.",
    }),
    {
      status: 405,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}
