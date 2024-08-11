import React from "react";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>@ 2024 - Visualizador OpenSarc</p>
      <a
        href="https://github.com/g-sillva/visualizador-opensarc"
        target="_blank"
        rel="noreferrer"
      >
        <img src="/github.png" alt="GitHub" />
      </a>
    </footer>
  );
};

export default Footer;
