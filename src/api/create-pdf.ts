import { GatsbyFunctionRequest, GatsbyFunctionResponse } from "gatsby";
const puppeteer = require("puppeteer-core");
const chromium = require("@sparticuz/chromium-min");
const os = require("os");
const dirTree = require("directory-tree");

export default async function createPdf(
  _: GatsbyFunctionRequest,
  res: GatsbyFunctionResponse
) {
  var env = process.env;

  Object.keys(env).forEach(function (key) {
    console.log("export " + key + '="' + env[key] + '"');
  });
  try {
    const browser = await puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath(
        "https://github.com/Sparticuz/chromium/releases/download/v113.0.1/chromium-v113.0.1-pack.tar"
      ),
      headless: chromium.headless,
      ignoreHTTPSErrors: true,
    });
    const page = await browser.newPage();
    await page.goto("https://www.example.com", {
      waitUntil: "networkidle0",
    });
    const pdf = await page.pdf({ format: "A4" });
    console.log(pdf);
    await browser.close();
    res.status(200).json({ success: true, pdf });
  } catch (e) {
    res.status(500).json({
      error: {
        message: e instanceof Error ? e.message : "some error happened",
      },
    });
  }
}
