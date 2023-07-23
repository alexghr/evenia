type FooterLink = {
  href: string;
  label: string;
  rel?: string;
  target?: string;
};

export const footerLinks: readonly FooterLink[] = [
  {
    href: "/",
    label: "Home",
  },
  {
    href: "#",
    label: "Create event",
  },
  {
    href: "#",
    label: "Sign up",
  },
  {
    href: "#",
    label: "Explore event",
  },
];

export const eventLink = (id: number) => `/event/${id}`;

export const authLinks = {
  signIn: "/signIn",
  signUp: "/signUp",
};
