"use client";
import { FC, useId } from "react";
import { useForm } from "react-hook-form";
import TextInput from "../TextInput/TextInput";
import Button from "../Button/Button";
import styles from "./Form.module.scss";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { authLinks } from "@/links";

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
    const resp = await fetch("/api/auth/signUp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (resp.status === 409) {
      setError("root", {
        message: "Email already used",
      });
    } else if (resp.status !== 204) {
      setError("root", {
        message: "Couldn't create account. Please try again",
      });
    } else if (resp.status === 204) {
      await signIn("credentials", {
        email: data.email,
        password: data.password,
        callbackUrl: "/",
        redirect: true,
      });
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <h1 className={styles.title}>Sign up</h1>

      <p>
        Already have an account?{" "}
        <Link href={authLinks.signIn}>Sign in here</Link>
      </p>

      <div className={styles.field}>
        <label htmlFor={ids.name}>Name</label>
        <TextInput
          {...register("name")}
          id={ids.name}
          type="text"
          required
          data-dirty={formState.dirtyFields.name}
        />
      </div>

      <div className={styles.field}>
        <label htmlFor={ids.email}>Email</label>
        <TextInput
          {...register("email")}
          id={ids.email}
          type="email"
          required
          data-dirty={formState.dirtyFields.email}
        />
      </div>

      <div className={styles.field}>
        <label htmlFor={ids.password}>Password</label>
        <TextInput
          {...register("password")}
          id={ids.password}
          type="password"
          required
          data-dirty={formState.dirtyFields.password}
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
