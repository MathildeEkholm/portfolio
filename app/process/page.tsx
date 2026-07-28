import Image from "next/image";
import SiteHeader from "../components/SiteHeader";
import ProjectsGrid from "../components/ProjectsGrid";
import Recommendation from "./Recommendation";

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

      <section className="bg-surface pb-20 pt-28 sm:pt-32">
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
            <div>
              <h1 className="text-4xl font-semibold leading-tight text-brand sm:text-5xl">
                From Insight to Impact
              </h1>
              <div className="mt-10 space-y-6">
                <p className="text-lg leading-relaxed text-ink-muted">
                  I design digital products by simplifying complex systems into clear, usable experiences.
                </p>
                <p className="text-lg leading-relaxed text-ink-muted">
                  My work follows the Design Thinking methodology — empathise, define, ideate, prototype and test. In practice it is rarely linear: I move between understanding users, framing the problem and testing ideas, letting each round of feedback reshape the direction.
                </p>
                <p className="text-lg leading-relaxed text-ink-muted">
                  I use AI as a thinking partner throughout — synthesising research, exploring more concepts than I could alone and building prototypes faster — while the decisions stay grounded in what real users need.
                </p>
                <p className="text-lg leading-relaxed text-ink-muted">
                  I combine research, prototyping and continuous testing to move from insight to working solutions.
                </p>
              </div>
            </div>
            <div className="flex justify-center md:justify-end">
              <div className="relative aspect-square w-[95%] overflow-hidden rounded-2xl">
                <Image
                  src="/images/presenting.png"
                  alt="Presenting and user research"
                  fill
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
            <div className="space-y-12">
              {processSteps.map((step, index) => (
                <div key={index} className="flex gap-4 border-l-2 border-brand pl-4 sm:gap-8 sm:pl-8">
                  <div className="flex-shrink-0">
                    <span className="text-4xl font-bold text-brand opacity-50">
                      {step.number}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-brand">
                      {step.title}
                    </h3>
                    <p className="mt-4 text-lg leading-relaxed text-ink-muted">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-surface-muted py-20">
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <h2 className="text-3xl font-semibold text-brand">Projects</h2>
          <div className="mt-16">
            <ProjectsGrid />
          </div>
        </div>
      </section>

    </main>
  );
}
