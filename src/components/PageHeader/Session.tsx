"use client";

import { FC } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import Button from "../Button/Button";

const Session: FC = () => {
  const sess = useSession();

  return sess.status === "authenticated" ? (
    <Button onClick={() => signOut()}>Disconnect</Button>
  ) : (
    <Button onClick={() => signIn()}>Connect</Button>
  );
};

export default Session;
