"use client";

import React, { FC, useState } from "react";
import styles from "./SelectOne.module.css";

interface SelectOneProps {
  label: string;
  selectedOption: string;
  options: string[];
  icon?: string;
  onSelect: (option: string) => void;
}

const SelectOne: FC<SelectOneProps> = ({
  label,
  selectedOption,
  options,
  icon,
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(selectedOption);

  const handleOptionClick = (option: string) => {
    setIsOpen(false);
    setSelected(option);
    onSelect(option);
  };

  return (
    <div className={styles.container}>
      <label>{label}</label>
      <div className={styles.inputWrapper} onClick={() => setIsOpen(!isOpen)}>
        <div className={styles.input}>
          {icon && <span className="material-symbols-outlined">{icon}</span>}
          <p className={icon ? styles.inputWithIcon : styles.ptext}>
            {selected}
          </p>
        </div>
        <div className={styles.arrowsWrapper}>
          <span className="material-symbols-outlined">keyboard_arrow_up</span>
          <span className="material-symbols-outlined">keyboard_arrow_down</span>
        </div>
      </div>
      {isOpen && (
        <div className={styles.options}>
          {options.map((option, i) => (
            <div
              key={i}
              className={styles.option}
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SelectOne;
