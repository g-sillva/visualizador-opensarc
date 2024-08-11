"use client";

import React, { cache, useEffect, useState } from "react";
import styles from "./page.module.css";
import { Item } from "../_models/Item";
import Card from "../_components/card/Card";
import { convertResourceTypeText, convertTimeCode } from "../_utils/converter";
import InputText from "../_components/input-text/InputText";
import SelectOne from "../_components/select-one/SelectOne";

export default function Home() {
  const [data, setData] = useState<any>();
  const [filters, setFilters] = useState({
    general: "",
    subject: "Todas",
    responsible: "Todos",
    type: "Todos",
    resource: "Todos",
    status: "Todos",
  });
  const [filteredData, setFilteredData] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);

  const handleGeneralFilter = (value: string) => {
    setFilters({ ...filters, general: value });
  };

  const handleSubjectFilter = (value: string) => {
    setFilters({ ...filters, subject: value });
  };

  const handleResponsibleFilter = (value: string) => {
    setFilters({ ...filters, responsible: value });
  };

  const handleTypeFilter = (value: string) => {
    setFilters({ ...filters, type: value });
  };

  const handleResourceFilter = (value: string) => {
    setFilters({ ...filters, resource: value });
  };

  const handleStatusFilter = (value: string) => {
    setFilters({ ...filters, status: value });
  };

  const getSubjectOptions = () => {
    const subjects = Object.keys(data).reduce((acc: string[], key) => {
      const items = data[key] as Item[];
      items.forEach((item) => {
        if (!acc.includes(item.subject)) {
          acc.push(item.subject);
        }
      });

      return acc;
    }, []);
    return ["Todas", ...subjects];
  };

  const getResponsibleOptions = () => {
    const responsibles = Object.keys(data).reduce((acc: string[], key) => {
      const items = data[key] as Item[];
      items.forEach((item) => {
        if (!acc.includes(item.responsible)) {
          acc.push(item.responsible);
        }
      });

      return acc;
    }, []);
    return ["Todos", ...responsibles];
  };

  const getTypeOptions = () => {
    const types = Object.keys(data).reduce((acc: string[], key) => {
      const items = data[key] as Item[];
      items.forEach((item) => {
        if (!acc.includes(convertResourceTypeText(item.type))) {
          acc.push(convertResourceTypeText(item.type));
        }
      });

      return acc;
    }, []);
    return ["Todos", ...types];
  };

  const getResourceOptions = () => {
    const resources = Object.keys(data).reduce((acc: string[], key) => {
      const items = data[key] as Item[];
      items.forEach((item) => {
        if (!acc.includes(item.resource)) {
          acc.push(item.resource);
        }
      });

      return acc;
    }, []);
    return ["Todos", ...resources];
  };

  const getStatusOptions = () => {
    const statuses = Object.keys(data).reduce((acc: string[], key) => {
      const items = data[key] as Item[];
      items.forEach((item) => {
        if (!acc.includes(item.status)) {
          acc.push(item.status);
        }
      });

      return acc;
    }, []);
    return ["Todos", ...statuses];
  };

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    const fetchData = cache(async () => {
      try {
        const response = await fetch("/api/getData");
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

  useEffect(() => {
    if (!data) return;

    const filteredData = Object.keys(data).reduce((acc: any, key) => {
      const items = data[key] as Item[];
      const filteredItems = items.filter((item) => {
        if (filters.subject !== "Todas" && item.subject !== filters.subject) {
          return false;
        }

        if (
          filters.responsible !== "Todos" &&
          item.responsible !== filters.responsible
        ) {
          return false;
        }

        if (
          filters.type !== "Todos" &&
          convertResourceTypeText(item.type) !== filters.type
        ) {
          return false;
        }

        if (
          filters.resource !== "Todos" &&
          item.resource !== filters.resource
        ) {
          return false;
        }

        if (filters.status !== "Todos" && item.status !== filters.status) {
          return false;
        }

        const values = Object.values(item).join(" ").toLowerCase();
        return values.includes(filters.general.toLowerCase());
      });

      if (filteredItems.length) {
        acc[key] = filteredItems;
      }

      return acc;
    }, {});

    setFilteredData(filteredData);
  }, [filters]);

  return (
    <main className={styles.main}>
      <div className={styles.header}>
        <h1>Visualizador OpenSarc</h1>
        <p>Visualização melhorada dos recursos alocados no OpenSarc.</p>
      </div>
      {isLoading ? (
        <div className={styles.message}>Carregando...</div>
      ) : error ? (
        <div className={styles.message}>{error}</div>
      ) : (
        <>
          <div className={styles.filtersWrapper}>
            <SelectOne
              label="Disciplina"
              selectedOption={filters.subject}
              options={getSubjectOptions()}
              onSelect={handleSubjectFilter}
            />
            <SelectOne
              label="Responsável"
              selectedOption={filters.responsible}
              options={getResponsibleOptions()}
              onSelect={handleResponsibleFilter}
            />
            <SelectOne
              label="Tipo"
              selectedOption={filters.type}
              options={getTypeOptions()}
              onSelect={handleTypeFilter}
            />
            <SelectOne
              label="Recurso"
              selectedOption={filters.resource}
              options={getResourceOptions()}
              onSelect={handleResourceFilter}
            />
            <SelectOne
              label="Status"
              selectedOption={filters.status}
              options={getStatusOptions()}
              onSelect={handleStatusFilter}
            />
            <InputText
              label="Geral"
              placeholder="Buscar..."
              value={filters.general}
              onChange={handleGeneralFilter}
            />
          </div>
          {Object.keys(filteredData).length === 0 ? (
            <div className={styles.message}>Nenhum resultado encontrado :(</div>
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
