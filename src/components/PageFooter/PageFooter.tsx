import { FC } from "react";
import styles from "./PageFooter.module.scss";
import Logo from "../Logo/Logo";
import { footerLinks } from "@/links";
import Link from "next/link";

const PageFooter: FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.wrapper}>
        <div className={styles.logo}>
          <Logo />
        </div>
        <nav className={styles.nav}>
          <ul className={styles.links}>
            {footerLinks.map(({ href, label, rel = "", target = "_self" }) => (
              <li key={href + ":" + label}>
                <Link
                  className={styles.link}
                  href={href}
                  rel={rel}
                  target={target}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
};
export default PageFooter;
