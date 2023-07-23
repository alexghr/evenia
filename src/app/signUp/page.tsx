import SignUpForm from "@/components/AuthForms/SignUpForm";
import PageHeader from "@/components/PageHeader/PageHeader";
import styles from "./page.module.scss";

export default function SignUpPage() {
  return (
    <>
      <PageHeader />
      <main className={styles.main}>
        <SignUpForm />
      </main>
    </>
  );
}
