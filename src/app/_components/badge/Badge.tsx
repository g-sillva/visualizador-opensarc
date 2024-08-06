import React, { FC } from "react";
import styles from "./Badge.module.css";

interface BadgeProps {
  type: string;
}

const Badge: FC<BadgeProps> = ({ type }) => {
  const convertedType =
    type === "Disponível"
      ? "available"
      : type.includes("Retirado")
      ? "removed"
      : "no-info";

  return (
    <div className={styles.badge + " " + styles[convertedType]}>
      <span className="material-symbols-outlined">
        {convertedType === "available"
          ? "check_circle"
          : convertedType === "removed"
          ? "block"
          : "warning"}
      </span>
      {convertedType === "available"
        ? "Disponível"
        : convertedType === "removed"
        ? "Retirado"
        : "N/A"}
    </div>
  );
};

export default Badge;
