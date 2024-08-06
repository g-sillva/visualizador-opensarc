import React, { FC } from "react";
import styles from "./Table.module.css";
import TableHead from "./head/TableHead";
import TableBody from "./body/TableBody";
import { Item } from "@/app/_models/Item";

interface TableProps {
  data: Item[];
}

const Table: FC<TableProps> = ({ data }) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>{data[0].timeCode}</h2>
        <p>17:30 às 19:00</p>
      </div>
      <table style={{ width: "100%" }}>
        <TableHead />
        <TableBody data={data} />
      </table>
    </div>
  );
};

export default Table;
