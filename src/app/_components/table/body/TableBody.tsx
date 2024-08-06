import React, { FC } from "react";
import styles from "./TableBody.module.css";
import Badge from "../../badge/Badge";
import { Item } from "@/app/_models/Item";
import {
  convertResourceTypeText,
  convertResourceTypeIcon,
} from "@/app/_utils/converter";

interface TableBodyProps {
  data: Item[];
}

const TableBody: FC<TableBodyProps> = ({ data }) => {
  return (
    <tbody className={styles.tbody}>
      {data.map((item, i) => (
        <tr key={i}>
          <td style={{ width: "20%" }}>
            <p>{convertResourceTypeText(item.type)}</p>
          </td>
          <td style={{ width: "25%" }}>
            <p>{item.subject}</p>
          </td>
          <td style={{ width: "20%" }}>
            <p>
              <b>{item.resource}</b>
            </p>
          </td>
          <td style={{ width: "20%" }}>
            <p>{item.responsible}</p>
          </td>
          <td style={{ width: "15%" }}>
            <Badge type={item.status} />
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;
