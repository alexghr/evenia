import Link from "next/link";
import { FC } from "react";
import TextInput from "../TextInput/TextInput";
import styles from "./PageHeader.module.scss";
import Logo from "../Logo/Logo";
import Session from "./Session";

const PageHeader: FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.wrapper}>
        <Link href="/" className={styles.logo} title="Home">
          <Logo />
        </Link>
        <div className={styles.search}>
          <TextInput type="text" placeholder="Search" />
        </div>
        <div className={styles.auth}>
          <Session />
        </div>
      </div>
    </header>
  );
};

export default PageHeader;
