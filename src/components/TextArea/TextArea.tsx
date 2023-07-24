import { TextareaHTMLAttributes, forwardRef } from "react";
import styles from "./TextArea.module.scss";

export default forwardRef<
  HTMLTextAreaElement,
  TextareaHTMLAttributes<HTMLTextAreaElement>
>(function Input({ className = "", ...props }, ref) {
  return (
    <textarea
      {...props}
      ref={ref}
      className={styles.textarea + " " + className}
    />
  );
});
