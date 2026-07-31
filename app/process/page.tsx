import Image from "next/image";
import SiteHeader from "../components/SiteHeader";
import ProjectsGrid from "../components/ProjectsGrid";
import Recommendation from "./Recommendation";
import ProcessTimeline from "./ProcessTimeline";

export default function Process() {
  const processSteps = [
    {
      number: "01",
      title: "Understanding Users and Context",
      description:
        "I focus on understanding users through interviews, observations, and research. This helps me uncover real needs, behaviors, and the context in which the product is used.",
    },
    {
      number: "02",
      title: "Identify Key Problems",
      description:
        "I synthesize research insights to clarify user needs and define meaningful problem statements that guide the design direction.",
    },
    {
      number: "03",
      title: "Explore Ideas and Concepts",
      description:
        "I explore a wide range of ideas through sketching and concept development, focusing on solutions that balance user needs, context and business goals. I create wireframes and interactive prototypes to test structure, flows, and interactions before moving into final design.",
    },
    {
      number: "04",
      title: "Testing & Optimization",
      description:
        "I test solutions with users to gather feedback, identify usability issues, and validate whether the design meets real needs. This ensures the solution is intuitive, functional, and works seamlessly across devices.",
    },
    {
      number: "05",
      title: "Refine and Deliver",
      description:
        "I iterate based on insights and feedback, refining the design to ensure clarity, usability, and readiness for implementation.",
    },
  ];

  return (
    <main className="flex min-h-screen flex-col">
      <SiteHeader />

      <section className="bg-surface pb-20 pt-36 sm:pt-44">
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          {/* text column gets the wider share; both columns start at the top */}
          <div className="grid grid-cols-1 items-start gap-12 md:grid-cols-[1.15fr_0.85fr]">
            <div>
              {/* stepped down at md, where the column is narrowest, so the
                  title holds one line at every width */}
              <h1 className="text-3xl font-semibold leading-tight text-brand sm:text-4xl md:text-3xl lg:text-4xl">
                From Insight to Impact
              </h1>
              <div className="mt-10 space-y-6">
                <p className="text-lg leading-relaxed text-ink-muted">
                  I design digital products by simplifying complex systems into
                  clear, usable experiences.
                </p>
                <p className="text-lg leading-relaxed text-ink-muted">
                  My work follows the Design Thinking methodology: empathise,
                  define, ideate, prototype and test. In practice it is rarely
                  linear: I move between understanding users, framing the
                  problem and testing ideas, letting each round of feedback
                  reshape the direction.
                </p>
                <p className="text-lg leading-relaxed text-ink-muted">
                  I use AI as a thinking partner throughout, synthesising
                  research, exploring more concepts than I could alone and
                  building prototypes faster, while the decisions stay grounded
                  in what real users need.
                </p>
                <p className="text-lg leading-relaxed text-ink-muted">
                  I combine research, prototyping and continuous testing to move
                  from insight to working solutions.
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center gap-5 md:items-end">
              {/* same aspect ratio as the workshop shot below, so the two
                  render at equal heights. object-position sits below centre,
                  which takes most of the crop off the top and a little off
                  the bottom. */}
              <div className="relative aspect-[3/2] w-[85%] overflow-hidden rounded-2xl md:w-full">
                <Image
                  src="/images/presenting.png"
                  alt="Presenting and user research"
                  fill
                  sizes="(max-width: 768px) 85vw, 380px"
                  className="object-cover object-[center_65%]"
                />
              </div>
              <div className="relative aspect-[3/2] w-[85%] overflow-hidden rounded-2xl md:w-full">
                <Image
                  src="/images/strava/codesign-workshop.png"
                  alt="Co-design workshop: printed app screens laid out and rearranged on a table"
                  fill
                  sizes="(max-width: 768px) 85vw, 380px"
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          <div className="mt-20 md:mt-32">
            <Recommendation />
          </div>

          <div className="mt-20 md:mt-32">
            <h2 className="mb-16 text-3xl font-semibold text-brand">
              My Process
            </h2>
            <ProcessTimeline steps={processSteps} />
          </div>
        </div>
      </section>

      <section className="bg-surface-muted py-20">
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <ProjectsGrid />
        </div>
      </section>
    </main>
  );
}
