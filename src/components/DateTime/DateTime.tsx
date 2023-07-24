import React, { HTMLProps, useMemo } from "react";

type Props = Omit<HTMLProps<HTMLTimeElement>, "value"> & {
  options?: Intl.DateTimeFormatOptions;
  locale?: string;
  value: Date | string;
};

const DateTime: React.FC<Props> & {
  options: Formats;
} = ({
  value,
  locale = "en",
  options = DateTime.options.default,
  ...props
}) => {
  const formatter = useMemo(
    () => new Intl.DateTimeFormat(locale, options),
    [locale, options]
  );

  const date = new Date(value);
  return (
    <time dateTime={date.toISOString()} {...props}>
      {formatter.format(date)}
    </time>
  );
};

type Formats = {
  ddmmyyyy: Intl.DateTimeFormatOptions;
  default: Intl.DateTimeFormatOptions;
  dateAndMonth: Intl.DateTimeFormatOptions;
  dateAndTime: Intl.DateTimeFormatOptions;
};

export const DateTimeOptions: Formats = {
  ddmmyyyy: {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  },
  default: {
    day: "numeric",
    month: "long",
    year: "numeric",
  },
  dateAndMonth: {
    day: "numeric",
    month: "long",
  },
  dateAndTime: {
    dateStyle: "medium",
    timeStyle: "short",
  },
};

DateTime.options = DateTimeOptions;

export default DateTime;
