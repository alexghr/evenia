import { AnchorHTMLAttributes, FC, HTMLProps } from "react";
import styles from "./Button.module.scss";
import Link, { LinkProps } from "next/link";

const LinkButton: FC<AnchorHTMLAttributes<HTMLAnchorElement> & LinkProps> = ({
  className = "",
  ...props
}) => {
  return <Link {...props} className={styles.button + " " + className} />;
};

export default LinkButton;
