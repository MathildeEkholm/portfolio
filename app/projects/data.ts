export type ProcessStep = { title: string; description: string };

export type Project = {
  id: number;
  title: string;
  category: string;
  year: string;
  description: string;
  overview: string;
  problem: string;
  solution: string;
  results: string[];
  image: string;
  process: ProcessStep[];
  tools: string[];
  testimonial: string;
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
    testimonial:
      "Mathilde's collaborative approach transformed how we think about product design. The co-design sessions were invaluable in creating a product our users truly love.",
  },
  "2": {
    id: 2,
    title: "Conversational AI for Elderly Users",
    category: "Accessibility Design",
    year: "2023",
    description:
      "Accessibility-focused interface design for elderly user engagement",
    overview:
      "Designing an accessible interface for a conversational AI platform specifically tailored to elderly users. This project prioritizes clarity, simplicity, and accessibility to create a welcoming experience for users aged 65+.",
    problem:
      "Existing AI interfaces were designed for tech-savvy users and posed significant accessibility challenges for elderly users. Small text, complex navigation, and unclear language created barriers to adoption.",
    solution:
      "I designed a simplified, accessible interface with large typography, high contrast, clear language, and intuitive navigation. Every design decision was validated through user testing with elderly participants.",
    results: [
      "Successfully tested with 50+ elderly users",
      "WCAG AAA accessibility compliance",
      "95% task completion rate in user testing",
      "Positive feedback from elderly user group advocates",
    ],
    image: "/images/project-2.svg",
    process: [
      {
        title: "Accessibility Audit",
        description:
          "Conducted thorough accessibility audit of existing interfaces, identifying specific barriers for elderly users.",
      },
      {
        title: "Simplified Design System",
        description:
          "Created a design system prioritizing large typography, high contrast, clear language, and reduced cognitive load.",
      },
      {
        title: "Inclusive User Testing",
        description:
          "Conducted extensive testing with elderly participants to validate design choices and accessibility improvements.",
      },
      {
        title: "Documentation & Guidelines",
        description:
          "Created comprehensive accessibility guidelines to ensure ongoing compliance and future design consistency.",
      },
    ],
    tools: ["Figma", "WAVE", "Axe DevTools", "Lighthouse"],
    testimonial:
      "This design proves that accessibility doesn't require compromise. The interface is beautiful, intuitive, and truly serves its users.",
  },
  "3": {
    id: 3,
    title: "LOOM: Designing AI for Organizational Sensemaking",
    category: "AI & Product Design",
    year: "2026",
    description:
      "A conceptual AI-powered workspace exploring how AI can facilitate organizational sensemaking",
    overview:
      "LOOM is a conceptual AI-powered workspace designed to support organizational sensemaking rather than information retrieval. Organizations generate vast amounts of information every day, yet meaningful knowledge often remains fragmented across conversations, documents, meetings and teams. While traditional AI tools excel at summarizing information, they rarely help people understand how relationships, perspectives and organizational dynamics shape decision-making. LOOM explores how AI can augment human interpretation while preserving uncertainty, context and collaboration.",
    problem:
      "Organizations have access to more data than ever before, but understanding what it actually means remains difficult. Customer feedback, retrospectives, Slack conversations and research are often stored in different places. AI can summarize information, but rarely helps teams build a shared understanding. Traditional AI-assisted products try to reduce uncertainty and provide definitive answers, which doesn't align with how organizational challenges actually work.",
    solution:
      "I developed LOOM as a living network of relationships where fragmented observations evolve into shared understanding. Instead of generating definitive answers, LOOM helps teams discover emerging signals, explore multiple perspectives and build shared understanding through facilitated collaboration. The design philosophy positions AI as a facilitator that helps organizations navigate complexity together, rather than replacing human judgment.",
    results: [
      "Created custom visual language built from primitive elements",
      "Developed relationships-centered interaction model",
      "Established coherent design system reflecting organizational sensemaking philosophy",
      "Demonstrated alternative approach to AI-assisted knowledge work",
    ],
    image: "/images/project-3.svg",
    process: [
      {
        title: "Research",
        description:
          "Explored organizational sensemaking, AI-assisted collaboration, complex sociotechnical systems, Actor-Network Theory, knowledge visualization, and collaborative decision-making. Emphasized relationships between people, systems and organizational processes.",
      },
      {
        title: "Concept Development",
        description:
          "Defined product philosophy and created the LOOM Design Language. Developed visual grammar built around relationships, signals and perspectives. Reimagined AI as a facilitator of understanding rather than provider of answers.",
      },
      {
        title: "Product Design",
        description:
          "Designed workspace architecture, interaction model centered around a living knowledge network, information hierarchy, network visualization, motion principles, and UI components built from primitive visual elements. Made relationships the primary navigation model.",
      },
      {
        title: "Iteration & Reflection",
        description:
          "Continuously refined the concept to communicate relationships instead of metrics, shared understanding instead of certainty, and human interpretation instead of AI automation.",
      },
    ],
    tools: ["Figma", "Figma Make", "AI-assisted Design Exploration"],
    testimonial:
      "LOOM demonstrates an alternative approach to AI-assisted knowledge work. Instead of optimizing for speed or automation, it explores how AI can support collective interpretation and reveal organizational relationships.",
  },
};

export const projectList = Object.values(projects);
