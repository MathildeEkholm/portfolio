export type Channel = {
  label: string;
  value: string;
  href: string;
  external: boolean;
  // Plain value handed to the clipboard; links out (LinkedIn) aren't copyable.
  copy?: string;
};

export const channels: Channel[] = [
  {
    label: "LinkedIn",
    value: "linkedin/mathilde-ekholm",
    href: "https://www.linkedin.com/in/mathilde-ekholm",
    external: true,
  },
  {
    label: "Email",
    value: "ekholmwork@gmail.com",
    href: "mailto:ekholmwork@gmail.com",
    external: false,
    copy: "ekholmwork@gmail.com",
  },
  {
    label: "Phone",
    value: "+45 3042 6782",
    href: "tel:+4530426782",
    external: false,
    copy: "+45 3042 6782",
  },
];
