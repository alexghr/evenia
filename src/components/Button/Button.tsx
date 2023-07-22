import { FC, HTMLProps } from "react";
import styles from "./Button.module.scss";

const Button: FC<
  HTMLProps<HTMLButtonElement> & { type?: "button" | "submit" | "reset" }
> = ({ className = "", type = "button", ...props }) => {
  return (
    <button
      {...props}
      type={type}
      className={styles.button + " " + className}
    />
  );
};

export default Button;
