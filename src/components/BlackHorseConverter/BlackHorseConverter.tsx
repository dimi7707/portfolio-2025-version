import { useState } from "react";
import styles from "./BlackHorseConverter.module.scss";

const LETTER_TO_NUMBER: Record<string, number> = {
  E: 0,
  B: 1,
  L: 2,
  A: 3,
  C: 4,
  K: 5,
  H: 6,
  O: 7,
  R: 8,
  S: 9,
};
const NUMBER_TO_LETTER = ["E", "B", "L", "A", "C", "K", "H", "O", "R", "S"];

const DEFAULT_RATE = 3900;

const BlackHorseConverter = () => {
  const [mode, setMode] = useState<"code-to-number" | "number-to-code">(
    "code-to-number",
  );
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [rate, setRate] = useState(DEFAULT_RATE);
  const [editRate, setEditRate] = useState(false);
  const [rateInput, setRateInput] = useState(rate.toString());
  const [error, setError] = useState("");
  const [rateError, setRateError] = useState("");

  // --- Conversión de código a número ---
  const convertCodeToNumber = (code: string) => {
    let numStr = "";
    for (let char of code) {
      if (LETTER_TO_NUMBER[char as keyof typeof LETTER_TO_NUMBER] === undefined)
        return null;
      numStr += LETTER_TO_NUMBER[char as keyof typeof LETTER_TO_NUMBER];
    }
    return numStr; // Devuelvo el string, no el número parseado
  };

  // --- Conversión de número a código ---
  const convertNumberToCode = (num: string) => {
    if (!/^[0-9]{1,4}$/.test(num)) return null;
    let code = "";
    for (let digit of num) {
      code += NUMBER_TO_LETTER[parseInt(digit, 10)];
    }
    return code;
  };

  // --- Manejo de conversión ---
  const handleConvert = () => {
    setError("");
    setResult("");
    if (mode === "code-to-number") {
      if (!/^[BLACKHORSE]{1,4}$/.test(input)) {
        setError(
          "El código solo puede contener letras válidas (B, L, A, C, K, H, O, R, S, E) y tener entre 1 y 4 caracteres.",
        );
        return;
      }
      const numberStr = convertCodeToNumber(input);
      if (numberStr === null) {
        setError("Código inválido.");
        return;
      }
      const number = parseInt(numberStr, 10);
      const total = number * rate;
      setResult(`${numberStr} x ${rate} = ${total.toLocaleString("es-CO")}`);
    } else {
      if (!/^[0-9]{1,10}$/.test(input)) {
        setError("El número debe ser un valor numérico válido.");
        return;
      }
      const inputNumber = parseInt(input, 10);
      if (isNaN(inputNumber) || inputNumber <= 0) {
        setError("El número debe ser mayor que cero.");
        return;
      }
      const quotient = Math.floor(inputNumber / rate);
      if (quotient <= 0 || quotient > 9999) {
        setError(
          "El resultado de la división debe ser un número positivo de hasta 4 dígitos.",
        );
        return;
      }
      const code = convertNumberToCode(quotient.toString());
      if (!code) {
        setError("No se pudo convertir el número a código Black Horse.");
        return;
      }
      setResult(code);
    }
  };

  // --- Manejo de cambio de modo ---
  const handleModeChange = (newMode: "code-to-number" | "number-to-code") => {
    setMode(newMode);
    setInput("");
    setResult("");
    setError("");
  };

  // --- Manejo de edición del rate ---
  const handleEditRate = () => {
    setEditRate(true);
    setRateInput(rate.toString());
    setRateError("");
  };
  const handleSaveRate = () => {
    if (!/^[0-9]+$/.test(rateInput) || parseInt(rateInput, 10) <= 0) {
      setRateError("El valor debe ser un número positivo.");
      return;
    }
    setRate(parseInt(rateInput, 10));
    setEditRate(false);
    setRateError("");
  };
  const handleCancelRate = () => {
    setEditRate(false);
    setRateInput(rate.toString());
    setRateError("");
  };

  // --- Validación reactiva del input ---
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value.toUpperCase());
    setError("");
    if (mode === "code-to-number") {
      if (/[^BLACKHORSE]/i.test(value)) {
        setError("Solo se permiten letras B, L, A, C, K, H, O, R, S, E.");
      }
    } else {
      if (/[^0-9]/.test(value)) {
        setError("Solo se permiten números en este campo.");
      }
    }
  };

  return (
    <div className={styles.bhcContainer}>
      <div className={styles.bhcTitleRow}>
        <h2>Black Horse Converter</h2>
      </div>
      <div className={styles.bhcRow}>
        <div className={styles.bhcRateBox}>
          <label htmlFor="rate-input">Valor constante:</label>
          {editRate ? (
            <>
              <input
                id="rate-input"
                type="text"
                value={rateInput}
                onChange={(e) => setRateInput(e.target.value)}
                className={styles.bhcRateInputEditable}
                autoFocus
              />
              <button className={styles.bhcBtnSave} onClick={handleSaveRate}>
                Guardar
              </button>
              <button
                className={styles.bhcBtnCancel}
                onClick={handleCancelRate}
              >
                Cancelar
              </button>
              {rateError && <span className={styles.bhcError}>{rateError}</span>}
            </>
          ) : (
            <>
              <input
                id="rate-input"
                type="text"
                value={rate}
                disabled
                className={styles.bhcRateInput}
              />
              <button className={`${styles.bhcBtn} ${styles.bhcBtnEdit}`} onClick={handleEditRate}>
                Editar
              </button>
            </>
          )}
        </div>
      </div>
      <div className={styles.bhcModeSwitch}>
        <button
          className={`${styles.bhcBtnSwitch} ${mode === "code-to-number" ? styles.active : ""}`}
          onClick={() => handleModeChange("code-to-number")}
        >
          Código → Número
        </button>
        <button
          className={`${styles.bhcBtnSwitch} ${mode === "number-to-code" ? styles.active : ""}`}
          onClick={() => handleModeChange("number-to-code")}
        >
          Número → Código
        </button>
      </div>
        <div className={styles.bhcMain}>
        <input
          className={styles.bhcInput}
          type="text"
          placeholder={
            mode === "code-to-number"
              ? "Ingresa el código (B, L, A, C, K, H, O, R, S, E)"
              : "Ingresa la cantidad"
          }
          value={input}
          onChange={handleInputChange}
          maxLength={mode === "code-to-number" ? 4 : undefined}
        />
        <button className={styles.bhcBtnConvert} onClick={handleConvert}>
          Convertir
        </button>
      </div>
      {error && <div className={styles.bhcError}>{error}</div>}
      {result && <div className={styles.bhcResult}>{result}</div>}
      <div className={styles.bhcInfo}>
        <p>
          <b>Referencia Black Horse:</b>
        </p>
        <p>E=0, B=1, L=2, A=3, C=4, K=5, H=6, O=7, R=8, S=9</p>
      </div>
    </div>
  );
};

export default BlackHorseConverter;
