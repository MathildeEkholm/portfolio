import Image from "next/image";
import SiteHeader from "../../components/SiteHeader";
import ShowcaseAnimation from "./ShowcaseAnimation";
import ScreenMarquee from "./ScreenMarquee";

const mockups = [
  { src: "/images/strava/01-training.png", label: "Training" },
  { src: "/images/strava/02-activity.png", label: "Activity" },
  { src: "/images/strava/03-overview.png", label: "Overview" },
  { src: "/images/strava/04-challenges.png", label: "Challenges" },
];

const designDecisions = [
  {
    title: "Training tab",
    description:
      "Emphasizes coach relationship and upcoming sessions (from research showing coach-guided users value structure)",
  },
  {
    title: "Activity tab",
    description:
      "Highlights weekly totals and activity breakdown (users care about progress over time, not daily granularity)",
  },
  {
    title: "Overview tab",
    description:
      "Focuses on personal achievement and progress tracking (social comparison and self-motivation are separate motivations)",
  },
  {
    title: "Challenges tab",
    description:
      "Emphasizes competitive and collaborative features (challenge-based motivation differs from solo training)",
  },
];

export default function StravaCaseStudy() {
  return (
    <main className="flex min-h-screen flex-col">
      <SiteHeader />

      <section className="bg-surface pb-20 pt-28 sm:pt-32">
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <div className="mb-16">
            <p className="text-sm font-medium tracking-[0.09em] text-brand-soft uppercase">
              Product Design
            </p>
            <h1 className="mt-4 text-4xl font-semibold text-brand sm:text-5xl">
              Making Training Personal
            </h1>
            <p className="mt-6 text-lg text-ink-muted">
              A redesigned Strava experience that prioritizes clarity and
              relevance over feature density.
            </p>
          </div>
        </div>

        <ScreenMarquee screens={mockups} />
      </section>

      <section className="bg-surface-muted py-20">
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <h2 className="text-3xl font-semibold text-brand">Context</h2>

          <div className="mt-12 grid grid-cols-1 gap-12 md:grid-cols-3">
            <div>
              <h3 className="text-xl font-semibold text-brand">
                The Original Challenge
              </h3>
              <p className="mt-4 text-lg leading-relaxed text-ink-muted">
                Strava&apos;s standardized interface doesn&apos;t reflect how
                different users engage with fitness. Users have varying
                motivations, some are coach-guided athletes, others are
                competitive, solo achievement trackers, or socially motivated.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-brand">
                The Academic Exploration
              </h3>
              <p className="mt-4 text-lg leading-relaxed text-ink-muted">
                Through my bachelor project, I conducted co-design research with
                interviews and workshops. Participants shaped their own fitness
                tracking experience, and the insights became three personalized
                design concepts for different user archetypes.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-brand">
                The Personal Touch
              </h3>
              <p className="mt-4 text-lg leading-relaxed text-ink-muted">
                Personalization research revealed powerful insights, but real
                products must serve many users without fragmenting the
                experience. I synthesized the findings into one unified
                interface built on clear hierarchy and navigation.
              </p>
            </div>
          </div>

          <div className="mt-16 rounded-2xl bg-surface p-8 sm:p-10">
            <h3 className="text-xl font-semibold text-brand">
              Key Design Decisions
            </h3>
            <ul className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
              {designDecisions.map((decision) => (
                <li key={decision.title} className="flex items-start gap-3">
                  <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-brand" />
                  <p className="text-lg leading-relaxed text-ink-muted">
                    <span className="font-medium text-ink">
                      {decision.title}:
                    </span>{" "}
                    {decision.description}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-surface py-20">
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <h2 className="text-3xl font-semibold text-brand">
            Research &amp; Design Process
          </h2>

          <div className="mt-12">
            <h3 className="text-xl font-semibold text-brand">
              The Original Challenge
            </h3>
            <p className="mt-4 text-lg leading-relaxed text-ink-muted">
              Fitness tracking apps like Strava rely on standardized interfaces
              that fail to accommodate the diversity of individual users. While
              users engage for motivation and self-improvement, their needs and
              relationships to data vary significantly, creating a gap between
              user and technology that reduces motivation and relevance.
            </p>
          </div>

          <div className="mt-16">
            <div>
              <h3 className="text-xl font-semibold text-brand">
                Process: Co-design Approach
              </h3>
              <p className="mt-4 text-lg leading-relaxed text-ink-muted">
                Using co-design methods, interviews, and workshops, participants
                designed their own fitness tracking experience using print-outs,
                paper, and pencils. These insights were translated into three
                personalized concepts reflecting different values, motivations,
                and preferences.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-ink-muted">
                The main challenge was designing for individuality rather than
                generalization. Instead of creating one &ldquo;optimal&rdquo;
                solution, the project explored multiple parallel designs to
                reflect the diversity of user needs.
              </p>
            </div>
            <figure className="mt-10">
              <Image
                src="/images/strava/codesign-workshop.png"
                alt="Co-design workshop materials"
                width={1810}
                height={1320}
                sizes="(max-width: 1024px) 100vw, 960px"
                className="h-auto w-full rounded-2xl object-cover md:h-[480px]"
              />
              <figcaption className="mt-4 text-sm text-ink-subtle">
                Materials and explorations from a co-design workshop session
              </figcaption>
            </figure>
          </div>

          <div className="mt-16 grid grid-cols-1 items-center gap-10 md:grid-cols-2">
            <figure className="md:order-first">
              <Image
                src="/images/strava/personalized-concept.png"
                alt="Personalized concept redesign"
                width={1200}
                height={1200}
                sizes="(max-width: 768px) 100vw, 460px"
                className="h-auto w-full rounded-2xl"
              />
              <figcaption className="mt-4 text-sm text-ink-subtle">
                Personalized redesign concept developed with one of the research
                participants
              </figcaption>
            </figure>
            <div>
              <h3 className="text-xl font-semibold text-brand">
                Solution: Personalized Concepts
              </h3>
              <p className="mt-4 text-lg leading-relaxed text-ink-muted">
                The solution consists of three personalized UI concepts designed
                to reflect different user needs, motivations, and behaviors.
                Rather than a single standardized interface, each concept
                improves clarity and relevance by aligning the interface with
                the user&apos;s personal goals and preferences.
              </p>
            </div>
          </div>

          <div className="mt-16 rounded-2xl bg-surface-muted p-8 sm:p-10">
            <h3 className="text-xl font-semibold text-brand">
              Intended Impact
            </h3>
            <ul className="mt-8 space-y-4">
              <li className="flex items-start gap-3">
                <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-brand" />
                <p className="text-lg leading-relaxed text-ink-muted">
                  <span className="font-medium text-ink">User Impact:</span>{" "}
                  Tailoring the experience to different user needs increases
                  engagement, retention, and consistency in app usage.
                </p>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-brand" />
                <p className="text-lg leading-relaxed text-ink-muted">
                  <span className="font-medium text-ink">Product Impact:</span>{" "}
                  With the new design, I explored how the personalized concepts
                  can be integrated into one cohesive experience. Further
                  validation would test how well that direction holds up in real
                  use.
                </p>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-surface-muted pt-20">
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          {/* one size down on mobile so it holds a single line at 390px */}
          <h2 className="text-2xl font-semibold text-brand sm:text-3xl">
            The Redesign in Motion
          </h2>
        </div>
        <ShowcaseAnimation />
      </section>
    </main>
  );
}
