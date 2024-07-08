import React, { FC } from "react";
import styles from "./Card.module.css";
import { convertIconFromType } from "@/app/_utils/converter";

interface CardProps {
  subject: string;
  resource: string;
  responsible: string;
  type: string;
  status: string;
}

const Card: FC<CardProps> = ({
  subject,
  resource,
  responsible,
  type,
  status,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h4>{subject}</h4>
        <span className="material-symbols-outlined">
          {convertIconFromType(type)}
        </span>
      </div>
      <h2 className={styles.title}>{resource}</h2>
      <div>
        <p className={styles.description}>{responsible}</p>
        <p className={styles.description}>{status}</p>
      </div>
    </div>
  );
};

export default Card;
