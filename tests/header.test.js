const puppeteer = require("puppeteer");

it("can launch a browser", async () => {
  const browser = await puppeteer.launch({
    headless: false
  });

  const page = await browser.newPage();
});
