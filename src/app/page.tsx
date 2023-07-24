"use client";

import EventCard, { cardWidthPx } from "@/components/EventCard/EventCard";
import PageHeader from "@/components/PageHeader/PageHeader";
import { eventLinks } from "@/links";
import Link from "next/link";
import styles from "./page.module.scss";
import useSWR from "swr";
import type { Event } from "@prisma/client";

export default function Home({
  params: { lang },
}: {
  params: { lang: string };
}) {
  const { data } = useSWR<ReadonlyArray<Event>>("/api/events");

  return (
    <>
      <PageHeader />
      <main className={styles.main}>
        <h1 className={styles.title}>Our events</h1>
        <ol
          className={styles.events}
          style={{ "--card-width": cardWidthPx + "px" } as any}
        >
          {data?.map((event) => (
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
