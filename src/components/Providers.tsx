"use client";
import { SessionProvider } from "next-auth/react";
import { PropsWithChildren } from "react";
import { SWRConfig } from "swr";

export default function Providers({ children }: PropsWithChildren) {
  return (
    <SessionProvider>
      <SWRConfig
        value={{ fetcher: (url) => fetch(url).then((res) => res.json()) }}
      >
        {children}
      </SWRConfig>
    </SessionProvider>
  );

}
