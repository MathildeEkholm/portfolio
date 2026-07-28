import SiteHeader from "../components/SiteHeader";

const channels = [
  {
    label: "LinkedIn",
    value: "linkedin.com/in/mathilde-ekholm",
    href: "https://www.linkedin.com/in/mathilde-ekholm",
    external: true,
  },
  {
    label: "Email",
    value: "ekholmwork@gmail.com",
    href: "mailto:ekholmwork@gmail.com",
    external: false,
  },
  {
    label: "Phone",
    value: "+45 3042 6782",
    href: "tel:+4530426782",
    external: false,
  },
];

export default function Contact() {
  return (
    <main className="flex min-h-screen flex-col">
      <SiteHeader />

      <section className="flex-1 bg-surface-muted pb-20 pt-28 sm:pt-32">
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <h1 className="text-4xl font-semibold leading-tight text-brand sm:text-5xl">
            Get in Touch
          </h1>
          <p className="mt-6 text-lg text-ink-muted">
            I&apos;m always interested in hearing about new projects and
            opportunities.
          </p>

          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3">
            {channels.map((channel) => (
              <a
                key={channel.label}
                href={channel.href}
                {...(channel.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="group rounded-lg border border-line bg-surface p-8 transition-colors hover:border-brand/30"
              >
                <p className="text-sm font-medium tracking-[0.09em] text-brand-soft uppercase">
                  {channel.label}
                </p>
                <p className="mt-3 text-base font-medium text-ink group-hover:text-brand">
                  {channel.value}
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}
