import styles from "./Button.module.scss";

export type CommonProps = {
  appearance?: "primary" | "secondary";
};

export const buttonClassName = (
  appearance: CommonProps["appearance"] = "primary",
  extra = ""
) => styles.button + " " + styles[appearance] + " " + extra;
