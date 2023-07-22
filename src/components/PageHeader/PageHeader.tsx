import { FC } from "react";
import styles from "./PageHeader.module.scss";
import Link from "next/link";
import TextInput from "../TextInput/TextInput";
import Button from "../Button/Button";
import Image from "next/image";
import Logo from "../../../public/evenia.png";

const PageHeader: FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.wrapper}>
        <Link href="/" className={styles.logo}>
          <Image src={Logo} alt="Evenia" />
          <span>Evenia</span>
        </Link>
        <div className={styles.search}>
          <TextInput type="text" placeholder="Search" />
        </div>
        <div className={styles.auth}>
          <Button>Connect</Button>
        </div>
      </div>
    </header>
  );
};

export default PageHeader;
