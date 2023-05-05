import { GatsbyFunctionRequest, GatsbyFunctionResponse } from "gatsby";
const chromium = require("@sparticuz/chromium");
const puppeteer = require("puppeteer-core");
import fs from "fs";
import os from "os";

const glob = require("glob");

export default async function createPdf(
  _: GatsbyFunctionRequest,
  res: GatsbyFunctionResponse
) {
  console.log("process.cwd()", process.cwd());
  glob(__dirname + "/**/chromium.br", {}, (err, files) => {
    console.log(files);
  });
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
