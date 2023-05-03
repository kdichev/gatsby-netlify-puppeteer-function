import { GatsbyFunctionRequest, GatsbyFunctionResponse } from "gatsby";
const chromium = require("chrome-aws-lambda");

export default async function createPdf(
  _: GatsbyFunctionRequest,
  res: GatsbyFunctionResponse
) {
  const browser = await chromium.puppeteer.launch({
    args: await chromium.args,
    executablePath: await chromium.executablePath,
    headless: true,
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
