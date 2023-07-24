import { ButtonHTMLAttributes, FC } from "react";
import { CommonProps, buttonClassName } from "./common";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & CommonProps;

const Button: FC<Props> = ({
  className = "",
  type = "button",
  appearance,
  ...props
}) => {
  return (
    <button
      {...props}
      type={type}
      className={buttonClassName(appearance, className)}
    />
  );
};

export default Button;
