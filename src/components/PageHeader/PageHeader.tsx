import Link from "next/link";
import { FC } from "react";
import TextInput from "../TextInput/TextInput";
import styles from "./PageHeader.module.scss";
// import Logo from "../../../public/evenia.png";
import LinkButton from "../Button/LinkButton";
import Logo from "../Logo/Logo";

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
          <LinkButton href="/auth/signIn">Connect</LinkButton>
        </div>
      </div>
    </header>
  );
};

export default PageHeader;
