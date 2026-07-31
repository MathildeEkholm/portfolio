export type ProcessStep = { title: string; description: string };

// A concrete interface decision and what it argues, so the case study points at
// the design rather than only describing the philosophy behind it.
export type Decision = { title: string; description: string; image?: string };

export type Project = {
  id: number;
  title: string;
  category: string;
  year: string;
  description: string;
  // Optional so the existing case is unaffected
  question?: string;
  role?: string[];
  engagement?: string;
  research?: string;
  decisions?: Decision[];
  overview: string;
  problem: string;
  solution: string;
  results: string[];
  image: string;
  // Shown on the overview page, framed in a device mock
  cover: string;
  coverDevice: "phone" | "laptop";
  process: ProcessStep[];
  tools: string[];
};

export const projects: Record<string, Project> = {
  "1": {
    id: 1,
    title: "Making Training Personal",
    category: "Product Design",
    year: "2024",
    description:
      "A redesigned Strava experience that prioritizes clarity and relevance over feature density",
    overview:
      "A comprehensive redesign of a digital product through collaborative user research and co-design methodology. This project demonstrates how involving users throughout the design process leads to more intuitive and effective interfaces.",
    problem:
      "The original product was difficult to navigate, with unclear information hierarchy and a lack of personalization features. Users struggled to find relevant content and felt the interface didn't meet their individual needs.",
    solution:
      "I conducted extensive user interviews and co-design sessions to understand user mental models and preferences. This collaborative approach led to a complete redesign that prioritized personalization, clear navigation, and intuitive user flows.",
    results: [
      "40% improvement in user satisfaction scores",
      "35% reduction in support tickets",
      "50% increase in feature adoption",
      "Successfully onboarded 15+ research participants",
    ],
    image: "/images/strava/codesign-workshop.png",
    cover: "/images/strava/01-training.png",
    coverDevice: "phone",
    process: [
      {
        title: "Research & Discovery",
        description:
          "Conducted 15+ user interviews to understand pain points, needs, and mental models. Created user personas and journey maps.",
      },
      {
        title: "Co-Design Sessions",
        description:
          "Held participatory design workshops where users directly contributed to wireframe design and feature prioritization.",
      },
      {
        title: "Prototyping & Iteration",
        description:
          "Developed interactive prototypes and conducted multiple rounds of user testing, iterating based on feedback.",
      },
      {
        title: "Implementation Support",
        description:
          "Collaborated with the development team to ensure design fidelity and provided specifications for complex interactions.",
      },
    ],
    tools: ["Figma", "Miro", "Adobe XD", "UserTesting"],
  },
  "3": {
    id: 3,
    title: "Designing AI for Organizational Sensemaking",
    category: "AI & Product Design",
    year: "2026",
    description:
      "A conceptual AI-powered workspace exploring how AI can facilitate organizational sensemaking",
    question:
      "How might AI help teams build shared understanding instead of simply generating answers?",
    role: [
      "Product Designer",
      "UX Researcher",
      "Interaction Designer",
      "Visual Designer",
    ],
    engagement: "Independent product concept",
    research: "Master's thesis research, covered by a confidentiality agreement",
    decisions: [
      {
        title: "Missing perspectives",
        image: "/images/loom/loom-missing-perspectives.png",
        description:
          "The interface reports what it does not know. Sales and Customer sit as visibly empty sectors on the canvas, and every signal lists the viewpoints its reading excludes. Most AI products hide their coverage gaps, because gaps undercut the impression of completeness.",
      },
      {
        title: "One possible interpretation",
        image: "/images/loom/loom-one-possible-interpretation.png",
        description:
          "The label does the arguing. Readings are offered for discussion rather than presented as conclusions, and the AI keeps a hedged voice throughout: a pattern may be related, you may want to compare these perspectives. When two groups describe the same thing differently, that difference is kept and named rather than resolved away.",
      },
      {
        title: "Claims you can audit",
        image: "/images/loom/loom-claims-you-can-audit.png",
        description:
          "Every AI insight links back to the evidence beneath it. Clicking show me highlights the specific observations a claim rests on, one per source group, so the reader can check the reasoning instead of trusting it.",
      },
      {
        title: "The box the AI leaves empty",
        image: "/images/loom/loom-shared-interpretation-full.png",
        description:
          "In a sensemaking session, the most important field in the product is the one the system deliberately does not fill in. LOOM gathers the evidence; the team writes what it means. Experiments are framed as small tests to learn more, explicitly not as actions or recommendations.",
      },
    ],
    overview:
      "LOOM is a conceptual AI-powered workspace designed to support organizational sensemaking rather than information retrieval. It explores how AI can augment human interpretation while preserving uncertainty, context and collaboration.",
    problem:
      "Customer feedback, retrospectives, Slack conversations and research sit in different places, and AI tools summarize them without showing how relationships and perspectives shape a decision. They optimize for certainty, which is the wrong instinct for problems that are genuinely ambiguous.",
    solution:
      "Instead of a dashboard, LOOM visualizes knowledge as a network of relationships: observations connect to emerging signals, and perspectives supply the context teams need to interpret them together. I designed it with AI as a collaborator, using Figma Make and AI-assisted exploration for the visual language, which put me in the same relationship to AI that the product proposes: a partner in interpretation rather than a source of answers.",
    results: [
      "A relationship-centered interaction model where the network itself becomes the primary interface",
      "The LOOM Design Language, a visual grammar built from primitive elements that unifies branding, interface and interaction",
      "A concept in which uncertainty, multiple perspectives and organizational relationships are first-class design elements rather than problems to eliminate",
    ],
    image: "/images/loom/knowledge-network-16x10.png",
    cover: "/images/loom/knowledge-network-16x10.png",
    coverDevice: "laptop",
    process: [
      {
        title: "Research",
        description:
          "LOOM builds on research insights from my master's thesis, carried out with an industry partner. That study is covered by a confidentiality agreement and cannot be shown here, so this case presents the design thinking it informed rather than the underlying research. The work draws on organizational sensemaking, AI-assisted collaboration, complex sociotechnical systems, Actor-Network Theory and knowledge visualization, and on the relationships between people, systems and organizational processes.",
      },
      {
        title: "Iteration & Reflection",
        description:
          "The concept went through three iterations. The first was a narrative, evidence-first flow built around attributed quotes and the perspectives a reading was missing. The second replaced it with a spatial knowledge network, which made relationships visible but lost the evidence trail that made the first version trustworthy. The current design is a synthesis of both: position encodes whose perspective a signal comes from, while every claim still links back to the observations beneath it.",
      },
    ],
    tools: ["Figma", "Figma Make", "AI-assisted Design Exploration"],
  },
};

export const projectList = Object.values(projects);
