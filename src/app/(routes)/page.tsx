import styles from "./page.module.css";
import puppeteer from "puppeteer";
import { scrapeData } from "@/app/_utils/scraper";
import Table from "../_components/table/Table";
import { Item } from "../_models/Item";

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
      {Object.keys(data).map((key) => (
        <Table key={key} data={data[key] as Item[]} />
      ))}
    </main>
  );
}
