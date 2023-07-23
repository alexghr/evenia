import Button from "@/components/Button/Button";
import DateTime from "@/components/DateTime/DateTime";
import PageHeader from "@/components/PageHeader/PageHeader";
import { PrismaClient } from "@prisma/client";
import Image from "next/image";
import styles from "./page.module.scss";
export default async function EventPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const client = new PrismaClient();
  const parsedId = parseInt(id, 10);

  const event = await (Number.isFinite(parsedId)
    ? client.event.findFirst({
        where: {
          id: parsedId,
        },
      })
    : Promise.resolve(null));

  return event ? (
    <>
      <PageHeader />
      <main className={styles.main}>
        <div className={styles.grid}>
          <div className={styles.imageWrapper}>
            {event.imageUrl && (
              <Image src={event.imageUrl} alt="" width={800} height={800} />
            )}
          </div>
          <div className={styles.titleWrapper}>
            <DateTime
              value={event.date}
              options={DateTime.options.dateAndMonth}
            />
            <h1 className={styles.title}>{event.name}</h1>
            <Button>Register</Button>
          </div>
          <div className={styles.descriptionWrapper}>{event.description}</div>
          <div className={styles.locationWrapper}>
            <div className={styles.date}>
              <p>Date and time:</p>
              <DateTime value={event.date} options={DateTime.options.default} />
            </div>

            <div className={styles.location}>
              <p>Location:</p>
              <p>{event.location}</p>
            </div>
          </div>
        </div>
      </main>
    </>
  ) : (
    <>
      <PageHeader />
      <main className={styles.main}>
        <h1>Not found</h1>
      </main>
    </>
  );
}
