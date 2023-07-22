import { HTMLProps, forwardRef } from "react";
import styles from "./TextInput.module.scss";

export default forwardRef<HTMLInputElement, HTMLProps<HTMLInputElement>>(
  function Input({ className = "", ...props }, ref) {
    return (
      <input {...props} ref={ref} className={styles.input + " " + className} />
    );
  }
);
