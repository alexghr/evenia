import { FC } from "react";
import styles from "./PageFooter.module.scss";

const PageFooter: FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.wrapper}>
        <div className={styles.logo}>Evenia</div>
        <nav className={styles.nav}>
          <ul className={styles.links}></ul>
        </nav>
      </div>
    </footer>
  );
};
export default PageFooter;
