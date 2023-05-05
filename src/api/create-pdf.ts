import { GatsbyFunctionRequest, GatsbyFunctionResponse } from "gatsby";
const chromium = require("@sparticuz/chromium");
const puppeteer = require("puppeteer-core");
const dirTree = require("directory-tree");

export default async function createPdf(
  _: GatsbyFunctionRequest,
  res: GatsbyFunctionResponse
) {
  console.log(process.cwd());
  const tree = dirTree(process.cwd());
  const browser = await puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath(
      "/var/task/node_modules/@sparticuz/chromium/bin"
    ),
    headless: chromium.headless,
  });

  const page = await browser.newPage();
  await page.goto("https://www.example.com", {
    waitUntil: "networkidle0",
  });
  const pdf = await page.pdf({ format: "A4" });
  console.log(pdf);
  await browser.close();
  res.status(200).json({ success: true, tree });
}
