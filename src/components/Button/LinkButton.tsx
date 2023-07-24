import { AnchorHTMLAttributes, FC, HTMLProps } from "react";
import Link, { LinkProps } from "next/link";
import { CommonProps, buttonClassName } from "./common";

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & LinkProps & CommonProps;

const LinkButton: FC<Props> = ({ className = "", appearance, ...props }) => {
  return <Link {...props} className={buttonClassName(appearance, className)} />;
};

export default LinkButton;
