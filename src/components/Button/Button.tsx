import { ButtonHTMLAttributes, FC, HTMLProps } from "react";
import styles from "./Button.module.scss";

const Button: FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({
  className = "",
  type = "button",
  ...props
}) => {
  return (
    <button
      {...props}
      type={type}
      className={styles.button + " " + className}
    />
  );
};

export default Button;
