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
