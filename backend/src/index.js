const express = require("express");
const puppeteer =
  process.env.NODE_ENV === "production"
    ? require("puppeteer-core")
    : require("puppeteer");
const chromium = require("@sparticuz/chromium");
const app = express();

require("dotenv").config();

async function scrapeData(page) {
  return await page.evaluate(() => {
    const labTypes = ["lab", "lad", "lapro"];
    const tables = document.querySelectorAll(
      "#MSO_ContentTable div div:nth-child(3) > div > table"
    );
    const result = {};

    tables.forEach((table) => {
      const resourceTable = table.querySelector("tr td:nth-child(2)");
      const lines = resourceTable.querySelectorAll("tr");
      const timeCode = table.querySelector("tr td:nth-child(1) span").innerText;

      lines.forEach((line, i) => {
        if (i === 0) return;

        const resource = line
          .querySelector("td:nth-child(1) span")
          .innerText.trim();
        const subject = line.querySelector("td:nth-child(2)").innerText.trim();
        const responsible = line
          .querySelector("td:nth-child(3) span")
          .innerText.trim();
        const status = line
          .querySelector("td:nth-child(4) span")
          .innerText.trim();

        let type = resource.toLowerCase();
        if (labTypes.some((labType) => type.includes(labType))) {
          type = "laboratory";
        } else if (type.includes("audit")) {
          type = "auditorium";
        } else {
          type = "classroom";
        }

        const item = {
          timeCode,
          resource,
          subject,
          responsible,
          type,
          status,
        };

        if (result[timeCode]) {
          result[timeCode].push(item);
        } else {
          result[timeCode] = [item];
        }
      });
    });

    return result;
  });
}

app.get("/health", (req, res) => {
  res.send({ status: "UP" });
});

app.get("/api/v1/data", async (req, res) => {
  try {
    let browser;
    if (process.env.NODE_ENV === "production") {
      browser = await puppeteer.launch({
        args: chromium.args,
        defaultViewport: chromium.defaultViewport,
        executablePath: await chromium.executablePath(),
        headless: "new",
        ignoreHTTPSErrors: true,
      });
    } else {
      browser = await puppeteer.launch({
        args: [
          "--disable-dev-shm-usage",
          "--disable-gpu",
          "--disable-setuid-sandbox",
          "--headless",
          "--no-sandbox",
          "--single-process",
        ],
        ignoreHTTPSErrors: true,
      });
    }

    const page = await browser.newPage();
    await page.goto(process.env.URL_SARC);

    const result = await scrapeData(page);

    await browser.close();

    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
