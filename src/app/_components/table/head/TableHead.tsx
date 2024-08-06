import React from "react";
import styles from "./TableHead.module.css";

const TableHead = () => {
  return (
    <thead className={styles.thead}>
      <tr>
        <th scope="col" style={{ width: "20%" }}>
          TIPO
        </th>
        <th scope="col" style={{ width: "25%" }}>
          DISCIPLINA
        </th>
        <th scope="col" style={{ width: "20%" }}>
          LOCAL
        </th>
        <th scope="col" style={{ width: "20%" }}>
          RESPONSÁVEL
        </th>
        <th scope="col" style={{ width: "15%" }}>
          SITUAÇÃO
        </th>
      </tr>
    </thead>
  );
};

export default TableHead;
