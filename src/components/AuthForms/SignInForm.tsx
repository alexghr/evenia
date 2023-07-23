"use client";
import { FC, useId } from "react";
import { useForm } from "react-hook-form";
import TextInput from "../TextInput/TextInput";
import Button from "../Button/Button";
import styles from "./Form.module.scss";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

type Fields = {
  email: string;
  password: string;
};

const SignInForm: FC = () => {
  const qs = useSearchParams();
  const router = useRouter();
  const { register, handleSubmit } = useForm<Fields>({});
  const ids = {
    email: useId(),
    password: useId(),
  };
  const onSubmit = async (data: Fields) => {
    const resp = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (resp?.ok) {
      router.replace(qs.get("callbackUrl") ?? "/");
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <h1 className={styles.title}>Sign In</h1>

      <div className={styles.field}>
        <label htmlFor={ids.email}>Email</label>
        <TextInput
          {...register("email")}
          id={ids.email}
          type="email"
          required
        />
      </div>

      <div className={styles.field}>
        <label htmlFor={ids.password}>Password</label>
        <TextInput
          {...register("password")}
          id={ids.password}
          type="password"
          required
        />
      </div>

      <Button className={styles.submit} type="submit">
        Sign Up
      </Button>
    </form>
  );
};

export default SignInForm;
