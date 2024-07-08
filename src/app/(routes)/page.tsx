import styles from "./page.module.css";
import puppeteer from "puppeteer";
import { scrapeData } from "@/app/_utils/scraper";
import { Item } from "../_models/Item";
import Card from "../_components/card/Card";
import { convertTimeCode } from "../_utils/converter";

const getData = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto("https://sarc.pucrs.br/Default/");

  const result = await scrapeData(page);

  await browser.close();
  return result;
};

export default async function Home() {
  const data = await getData();

  return (
    <main className={styles.main}>
      {Object.keys(data).map((key) => {
        const items = data[key] as Item[];
        return (
          <>
            <div key={key} className={styles.timeHeader}>
              <hr />
              <div className={styles.text}>
                <h1>{key}</h1>
                <p>{convertTimeCode(items[0].timeCode)}</p>
              </div>
              <hr />
            </div>
            <div className={styles.cardsContainer}>
              {items.map((item, i) => (
                <Card
                  key={i}
                  subject={item.subject}
                  resource={item.resource}
                  responsible={item.responsible}
                  type={item.type}
                  status={item.status}
                />
              ))}
            </div>
          </>
        );
      })}
    </main>
  );
}
