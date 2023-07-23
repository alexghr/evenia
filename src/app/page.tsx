import styles from "./page.module.scss";
import EventCard, { cardWidthPx } from "@/components/EventCard/EventCard";
import Link from "next/link";
import { eventLink } from "@/links";
import PageHeader from "@/components/PageHeader/PageHeader";
import PageFooter from "@/components/PageFooter/PageFooter";
import prismaClient from "@/prismaClient";

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
              <Link className={styles.link} href={eventLink(event.id)}>
                <EventCard {...event} locale={lang} />
              </Link>
            </li>
          ))}
        </ol>
      </main>
    </>
  );
}
