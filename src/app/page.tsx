import EventCard, { cardWidthPx } from "@/components/EventCard/EventCard";
import PageHeader from "@/components/PageHeader/PageHeader";
import { eventLinks } from "@/links";
import prismaClient from "@/prismaClient";
import Link from "next/link";
import styles from "./page.module.scss";

async function getData() {
  return prismaClient.event.findMany();
}

export default async function Home({
  params: { lang },
}: {
  params: { lang: string };
}) {
  const events = await getData();

  return (
    <>
      <PageHeader />
      <main className={styles.main}>
        <h1 className={styles.title}>Our events</h1>
        <ol
          className={styles.events}
          style={{ "--card-width": cardWidthPx + "px" } as any}
        >
          {events.map((event) => (
            <li key={event.id}>
              <Link className={styles.link} href={eventLinks.event(event.id)}>
                <EventCard {...event} locale={lang} />
              </Link>
            </li>
          ))}
        </ol>
      </main>
    </>
  );
}
