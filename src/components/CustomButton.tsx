import React from "react";
import "../styles/global.css";
import styles from "./CustomButton.module.scss";

export default function CustomButton() {
  return (
    <div>
      <button type="button" className={styles.button}>
        Hola soy un botón feliz :)
      </button>
    </div>
  );
}
