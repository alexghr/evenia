import SignInForm from "@/components/AuthForms/SignInForm";
import PageHeader from "@/components/PageHeader/PageHeader";
import styles from "./page.module.scss";

export default function SignUpPage() {
  return (
    <>
      <PageHeader />
      <main className={styles.main}>
        <SignInForm />
      </main>
    </>
  );
}
