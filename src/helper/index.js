import pc from "puppeteer-core";
import ch from "@sparticuz/chromium-min";
import p from "puppeteer";

const puppeteer = process.env.NODE_ENV === "production" ? pc : p;

const options =
  process.env.NODE_ENV === "production"
    ? {
        defaultViewport: ch.defaultViewport,
        executablePath: await ch.executablePath(
          "https://github.com/Sparticuz/chromium/releases/download/v110.0.1/chromium-v110.0.1-pack.tar"
        ),
        ignoreHTTPSErrors: true,
      }
    : {};

export { puppeteer, options };
