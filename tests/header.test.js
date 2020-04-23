const puppeteer = require("puppeteer");

let browser, page;

beforeEach(async () => {
  browser = await puppeteer.launch({
    headless: false
  });
  page = await browser.newPage();
  await page.goto("localhost:3000");
});

afterEach(async () => {
  await browser.close();
});

it("can launch a browser", async () => {
  const text = await page.$eval("a.brand-logo", el => el.innerHTML);

  expect(text).toEqual("Blogster");
});
