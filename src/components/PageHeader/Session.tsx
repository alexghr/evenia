"use client";

import { eventLinks } from "@/links";
import { signIn, signOut, useSession } from "next-auth/react";
import { FC } from "react";
import Button from "../Button/Button";
import LinkButton from "../Button/LinkButton";

const Session: FC = () => {
  const sess = useSession();

  return sess.status === "authenticated" ? (
    <>
      <LinkButton appearance="secondary" href={eventLinks.create}>
        Create event
      </LinkButton>
      <Button onClick={() => signOut()}>Disconnect</Button>
    </>
  ) : (
    <Button onClick={() => signIn()}>Connect</Button>
  );
};

export default Session;
