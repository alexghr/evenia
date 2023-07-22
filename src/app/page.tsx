import { PrismaClient } from "@prisma/client";
import styles from "./page.module.scss";

async function getData() {
  const client = new PrismaClient();
  return client.event.findMany();
}

export default async function Home() {
  const events = await getData();

  return (
    <main className={styles.main}>
      <h1>Events</h1>
      <ul>
        {events.map((event) => (
          <li key={event.id}>
            {event.name} ({event.date.toString()})
          </li>
        ))}
      </ul>
    </main>
  );
}
