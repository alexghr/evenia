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
