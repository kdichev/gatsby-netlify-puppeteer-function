import { GatsbyFunctionRequest, GatsbyFunctionResponse } from "gatsby";
const puppeteer = require("puppeteer-core");
const chromium = require("@sparticuz/chromium-min");

export default async function createPdf(
  _: GatsbyFunctionRequest,
  res: GatsbyFunctionResponse
) {
  console.log(process.env["AWS_LAMBDA_JS_RUNTIME"]);
  console.log(/^nodejs/.test(process.env["AWS_LAMBDA_JS_RUNTIME"]) === true);
  console.log(
    process.env["AWS_LAMBDA_JS_RUNTIME"] &&
      /^nodejs/.test(process.env["AWS_LAMBDA_JS_RUNTIME"]) === true
  );
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
  res.status(200).json({ success: true });
}
