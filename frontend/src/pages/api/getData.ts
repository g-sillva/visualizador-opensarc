import type { NextApiRequest, NextApiResponse } from "next";
import puppeteer from "puppeteer-core";

type ResponseData = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: require("puppeteer").executablePath(),
    args: ["--no-sandbox"],
  });

  const page = await browser.newPage();
  await page.goto("https://sarc.pucrs.br/Default/");

  const result = await scrapeData(page);

  await browser.close();

  res.status(200).json(result);

  return result;
}

async function scrapeData(page: any) {
  return await page.evaluate(() => {
    const labTypes = ["lab", "lad", "lapro"];
    const tables = document.querySelectorAll(
      "#MSO_ContentTable div div:nth-child(3) > div > table"
    );
    const result: any = {};

    tables.forEach((table: any) => {
      const resourceTable = table.querySelector("tr td:nth-child(2)");
      const lines = resourceTable.querySelectorAll("tr");
      const timeCode = table.querySelector("tr td:nth-child(1) span").innerText;

      lines.forEach((line: any, i: number) => {
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
