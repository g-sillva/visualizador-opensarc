"use client";

import React, { FC } from "react";
import styles from "./InputText.module.css";

interface InputTextProps {
  label: string;
  placeholder: string;
  value: string;
  icon?: string;
  onChange: (value: string) => void;
}

const InputText: FC<InputTextProps> = ({
  label,
  placeholder,
  value,
  icon,
  onChange,
}) => {
  const randomID = Math.random().toString(36).substring(7);

  return (
    <div className={styles.container}>
      <label htmlFor={randomID}>{label}</label>
      <div className={styles.inputWrapper}>
        {icon && <span className="material-symbols-outlined">{icon}</span>}
        <input
          type="text"
          className={icon ? styles.inputWithIcon : styles.input}
          id={randomID}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </div>
  );
};

export default InputText;
