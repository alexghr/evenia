"use client";

import PageHeader from "@/components/PageHeader/PageHeader";
import TextArea from "@/components/TextArea/TextArea";
import TextInput from "@/components/TextInput/TextInput";
import { useForm } from "react-hook-form";
import styles from "./page.module.scss";
import Button from "@/components/Button/Button";
import FileInput from "@/components/FileInput/FileInput";
import { useRouter } from "next/navigation";
import { eventLinks } from "@/links";
import { signIn, useSession } from "next-auth/react";

type Fields = {
  name: string;
  description: string;
  date: Date;
  location: string;
  image: FileList;
};

export default function CreateEventPage() {
  const { register, handleSubmit } = useForm<Fields>({});
  const router = useRouter();
  const sess = useSession();

  const onSubmit = async (data: Fields) => {
    const imageBase64 =
      data.image.length > 0 ? await fileToBase64(data.image[0]) : null;

    const resp = await fetch("/api/event", {
      method: "POST",
      body: JSON.stringify({
        name: data.name,
        description: data.description,
        location: data.location,
        date: data.date,
        image: imageBase64,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (resp.status === 201) {
      const event = await resp.json();
      router.replace(eventLinks.event(event.id));
    }
  };

  return (
    <>
      <PageHeader />
      <main className={styles.main}>
        {sess.status === "authenticated" && (
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
                  type="datetime-local"
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
        )}
        {sess.status === "unauthenticated" && (
          <>
            <p>You need to be authenticated before you can submit an event.</p>
            <Button onClick={() => signIn()}>Sign in</Button>
          </>
        )}
      </main>
    </>
  );
}

export function fileToBase64(
  file: File | null | undefined
): Promise<string | null> {
  return new Promise((resolve) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result as string);
      };
      reader.onerror = () => {
        resolve(null);
      };

      reader.readAsDataURL(file);
    } else {
      resolve(null);
    }
  });
}
