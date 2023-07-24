import { Event } from "@prisma/client";
import Image from "next/image";
import { FC } from "react";
import styles from "./EventCard.module.scss";
import DateTime, { DateTimeOptions } from "../DateTime/DateTime";

type Props = Pick<Event, "name" | "date" | "imageUrl"> & {
  locale?: string;
};

export const cardWidthPx = 210;
const imageHeightPx = (210 / 16) * 9;

const EventCard: FC<Props> = ({ name, date, imageUrl, locale }) => {
  return (
    <article className={styles.card} style={{ width: cardWidthPx }}>
      <div className={styles.imageWrapper} style={{ height: imageHeightPx }}>
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={name}
            width={cardWidthPx}
            height={imageHeightPx}
          />
        )}
      </div>
      <div className={styles.bodyWrapper}>
        <DateTime
          className={styles.date}
          options={DateTime.options.dateAndTime}
          value={date}
          locale={locale}
        />
        <h2 className={styles.title}>{name}</h2>
      </div>
    </article>
  );
};

export default EventCard;
