"use client";
import { FC, useId } from "react";
import { useForm } from "react-hook-form";
import TextInput from "../TextInput/TextInput";
import Button from "../Button/Button";
import styles from "./Form.module.scss";
import { signIn } from "next-auth/react";

type Fields = {
  email: string;
  password: string;
  name: string;
};

const SignUpForm: FC = () => {
  const { register, handleSubmit, formState, setError } = useForm<Fields>({});
  const ids = {
    name: useId(),
    email: useId(),
    password: useId(),
  };

  const onSubmit = async (data: Fields) => {
    await fetch("/api/auth/signUp", {
       method: "POST",
       headers: { "Content-Type": "application/json" },
       body: JSON.stringify(data),
     });

    await signIn("credentials", {
      email: data.email,
      password: data.password,
    });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <h1 className={styles.title}>Sign up</h1>

      <div className={styles.field}>
        <label htmlFor={ids.name}>Name</label>
        <TextInput {...register("name")} id={ids.name} type="text" required />
      </div>

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

      {formState.errors.root && (
        <p className={styles.formError}>{formState.errors.root.message}</p>
      )}
    </form>
  );
};

export default SignUpForm;
