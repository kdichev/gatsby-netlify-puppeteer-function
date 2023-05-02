import { GatsbyFunctionRequest, GatsbyFunctionResponse } from "gatsby";
const chromium = require("@sparticuz/chromium");
const puppeteer = require("puppeteer-core");
import path from "path";
import os from "os";

const fs = require("fs");

console.log(os);
console.log(os.homedir());

export default async function createPdf(
  _: GatsbyFunctionRequest,
  res: GatsbyFunctionResponse
) {
  console.log(path.join(os.homedir(), ".cache", "puppeteer"));
  const browser = await puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath(),
    headless: chromium.headless,
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
