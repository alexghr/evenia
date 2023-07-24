"use client";

import PageHeader from "@/components/PageHeader/PageHeader";
import TextArea from "@/components/TextArea/TextArea";
import TextInput from "@/components/TextInput/TextInput";
import { useForm } from "react-hook-form";
import styles from "./page.module.scss";
import Button from "@/components/Button/Button";
import FileInput from "@/components/FileInput/FileInput";

type Fields = {
  name: string;
  description: string;
  date: Date;
  location: string;
  image: File;
};

export default function CreateEventPage() {
  const { register, handleSubmit } = useForm<Fields>({});

  const onSubmit = (data: Fields) => {
    console.log(data);
  };

  return (
    <>
      <PageHeader />
      <main className={styles.main}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1>Event</h1>
          <p>Please fill all the required information</p>
          <div className={styles.columns}>
            <FileInput
              {...register("image")}
              placeholder={<>Click to upload</>}
              preview={(files) => {
                const first = files[0];
                return <img src={URL.createObjectURL(first)} />;
              }}
            />
            <div className={styles.right}>
              <TextInput
                {...register("name")}
                required
                placeholder="Event title"
              />
              <TextArea
                {...register("description")}
                required
                placeholder="Description"
                className={styles.description}
              />
              <TextInput
                {...register("date")}
                type="date"
                required
                placeholder="Date"
              />
              <TextInput
                {...register("location")}
                required
                placeholder="Location"
              />
            </div>
            <Button className={styles.submit} type="submit">
              Continue
            </Button>
          </div>
        </form>
      </main>
    </>
  );
}
