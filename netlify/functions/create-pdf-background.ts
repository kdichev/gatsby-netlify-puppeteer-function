const chromium = require("@sparticuz/chromium");
const puppeteer = require("puppeteer-core");

const handler = async () => {
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
  return {
    statusCode: 200,
    body: JSON.stringify({ ok: true, image: pdf }),
  };
};
export { handler };
