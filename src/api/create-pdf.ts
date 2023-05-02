import { GatsbyFunctionRequest, GatsbyFunctionResponse } from "gatsby";
const chromium = require("@sparticuz/chromium");
const puppeteer = require("puppeteer-core");
const localPuppeteer = require("puppeteer");
const pup = true ? localPuppeteer : puppeteer;

export default async function createPdf(
  _: GatsbyFunctionRequest,
  res: GatsbyFunctionResponse
) {
  const browser = await (true
    ? localPuppeteer.launch({ headless: false })
    : pup.launch({
        args: chromium.args,
        defaultViewport: chromium.defaultViewport,
        executablePath: await chromium.executablePath(),
        headless: chromium.headless,
      }));

  const page = await browser.newPage();
  await page.goto("https://www.example.com", {
    waitUntil: "networkidle0",
  });
  const pdf = await page.pdf({ format: "A4" });
  console.log(pdf);
  await browser.close();
  res.status(200).json({ success: true });
}
