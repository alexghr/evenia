import Image from "next/image";
import { FC } from "react";
import evenia from "../../../public/evenia.png";
import styles from "./Logo.module.scss";

const Logo: FC = () => (
  <div className={styles.logo}>
    <Image className={styles.image} src={evenia} alt="Evenia" />
    <span className={styles.text}>Evenia</span>
  </div>
);

export default Logo;
