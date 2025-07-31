import pc from "puppeteer-core";
import ch from "@sparticuz/chromium-min";
import p from "puppeteer";

const isProduction = process.env.NODE_ENV === "production";

const puppeteer = isProduction ? pc : p;

async function getOptions() {
  if (isProduction) {
    return {
      args: ch.args,
      defaultViewport: ch.defaultViewport,
      executablePath: await ch.executablePath(
        "https://github.com/Sparticuz/chromium/releases/download/v110.0.1/chromium-v110.0.1-pack.tar"
      ),
      headless: ch.headless,
      ignoreHTTPSErrors: true,
    };
  } else {
    return {
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
}

export { puppeteer, getOptions };
