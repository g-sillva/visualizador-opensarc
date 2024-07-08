"use client";

import React, { cache, useEffect, useState } from "react";
import styles from "./page.module.css";
import { Item } from "../_models/Item";
import Card from "../_components/card/Card";
import { convertTimeCode } from "../_utils/converter";
import InputText from "../_components/input-text/InputText";

export default function Home() {
  const [data, setData] = useState<any>();
  const [filters, setFilters] = useState({ general: "" });
  const [filteredData, setFilteredData] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);

  const handleGeneralFilter = (value: string) => {
    setFilters({ ...filters, general: value });

    const filteredData = Object.keys(data).reduce((acc: any, key) => {
      const items = data[key] as Item[];
      const filteredItems = items.filter((item) => {
        const values = Object.values(item).join(" ").toLowerCase();
        return values.includes(value.toLowerCase());
      });

      if (filteredItems.length) {
        acc[key] = filteredItems;
      }

      return acc;
    }, {});

    setFilteredData(filteredData);
  };

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    const fetchData = cache(async () => {
      try {
        const response = await fetch("/visualizador-opensarc/api/getData");
        const data = await response.json();
        return data;
      } catch (error: any) {
        setError(error.message);
      }
    });

    fetchData().then((data) => {
      setData(data);
      setFilteredData(data);
      setIsLoading(false);
    });
  }, []);

  return (
    <main className={styles.main}>
      {isLoading ? (
        <div>Carregando...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <>
          <div className={styles.filtersWrapper}>
            <InputText
              placeholder="Buscar..."
              label="Filtrar"
              value={filters.general}
              onChange={handleGeneralFilter}
            />
          </div>
          {Object.keys(filteredData).length === 0 ? (
            <div>Nenhum resultado encontrado</div>
          ) : (
            Object.keys(filteredData).map((key) => {
              const items = filteredData[key] as Item[];
              return (
                <div key={key}>
                  <div className={styles.timeHeader}>
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
                </div>
              );
            })
          )}
        </>
      )}
    </main>
  );
}
