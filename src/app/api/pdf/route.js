export async function POST(request) {
  try {
    const { html } = await request.json();

    console.log('html' , html);
    
    
    if (!html || typeof html !== "string") {
      return new Response(
        JSON.stringify({ error: "HTML content is required and must be a string" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const isVercel = !!process.env.VERCEL_ENV;
    
    let puppeteer, launchOptions;

    if (isVercel) {
      const chromium = (await import("@sparticuz/chromium")).default;
      puppeteer = await import("puppeteer-core");
      launchOptions = {
        args: chromium.args,
        executablePath: await chromium.executablePath(),
        defaultViewport: chromium.defaultViewport,
        headless: chromium.headless,
        ignoreHTTPSErrors: true,
      };
    } else {
      puppeteer = await import("puppeteer");
      launchOptions = {
        headless: "new",
        args: [
          "--no-sandbox",
          "--disable-setuid-sandbox",
          "--disable-dev-shm-usage",
          "--disable-accelerated-2d-canvas",
          "--no-first-run",
          "--no-zygote",
          "--disable-gpu",
        ],
      };
    }

    const browser = await puppeteer.launch(launchOptions);
    const page = await browser.newPage();

    await page.setContent(html, {
      waitUntil: ["networkidle0", "domcontentloaded"],
    });

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
        "Content-Disposition": 'inline; filename="generated.pdf"',
        "Cache-Control": "no-cache",
      },
    });
  } catch (error) {
    console.error("PDF generation error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to generate PDF", details: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

export async function GET() {
  return new Response(
    JSON.stringify({ error: "Method not allowed. Use POST with HTML content." }),
    { status: 405, headers: { "Content-Type": "application/json" } }
  );
}
