export const site = {
  name: "Stuart Reese",
  firstName: "Stuart",
  title: "Director of Grants & Co-Director of Operations",
  org: "Nonprofit Security Advisors",
  location: "Jackson, Mississippi",
  tagline: "Relational. Strategic. Leader.",
  intro:
    "I help mission-driven organizations build systems that support people instead of slowing them down.",
  url: "https://stuartreese.com",
  email: "stuartreese9@gmail.com",
  description:
    "Stuart Reese is a nonprofit operations and grants leader in Jackson, Mississippi. Take a minute to find out more about how he works.",
  links: {
    linkedin: "https://www.linkedin.com/in/stuart-reese-1w9s8r7",
    calendly: "https://calendly.com/stuartreese9/30min",
    instagram: "https://www.instagram.com/stuartreese",
    strava: "https://www.strava.com/athletes/24203237",
    github: "https://github.com/stuartreese",
  },
};

export const headlineStats = [
  { value: 11, suffix: "+", label: "years leading in nonprofits and community organizations" },
  { value: 2, prefix: "$", suffix: "M", label: "annual budget managed as an executive director" },
  { value: 100, suffix: "+", label: "volunteers recruited, trained, and led at one time" },
  { value: 60, suffix: "+", label: "seasonal staff hired and trained each year" },
];

export const story = {
  lead:
    "In the fall of 2024 my family and I moved to the Jackson area to be closer to my wife's work and our kids' school. After serving at The Mustard Seed, the door opened to Nonprofit Security Advisors, where I serve as Director of Grants and Co-Director of Operations.",
  focus: [
    "Strengthening internal systems and processes",
    "Guiding grant strategy, compliance, and execution",
    "Partnering with leadership to scale impact and sustainability",
    "Helping mission-driven organizations operate with clarity and confidence",
  ],
  background:
    "Before NPSA, I spent several years in nonprofit and community leadership roles. That work centered on organizational improvement, relationship building, communication, hospitality, and technology. Those experiences shaped how I lead and how I solve problems. I am motivated by work where I can make a real impact.",
  bestWhen: [
    { title: "Collaborating with diverse stakeholders", detail: "Boards, staff, volunteers, donors, and guests. I like the room full." },
    { title: "Building systems that support people", detail: "Good process should feel like a tailwind, not a speed bump." },
    { title: "Helping organizations work effectively and faithfully", detail: "Clarity and confidence are contagious. So is the opposite." },
  ],
  quote: "You will find me at my best when the people and the process are pulling in the same direction.",
};

export type Metric = {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
};

export type Role = {
  id: string;
  title: string;
  company: string;
  start: string;
  end: string;
  location: string;
  summary: string;
  description: string[];
  metrics: Metric[];
};

export const roles: Role[] = [
  {
    id: "npsa",
    title: "Director of Grants & Co-Director of Operations",
    company: "Nonprofit Security Advisors",
    start: "Dec 2025",
    end: "Present",
    location: "Remote",
    summary:
      "Leading grant strategy and internal operations for a firm that helps churches, schools, and nonprofits secure federal security funding.",
    description: [
      "Lead grant strategy, compliance, and execution for Nonprofit Security Grant Program clients across multiple states.",
      "Co-direct day-to-day operations, strengthening the internal systems and processes the team relies on.",
      "Partner with leadership to scale the firm's impact and long-term sustainability.",
      "Build tooling and workflows that give the team clarity on pipeline, deadlines, and client status.",
    ],
    metrics: [],
  },
  {
    id: "mustard-seed",
    title: "Executive Director",
    company: "The Mustard Seed",
    start: "Nov 2024",
    end: "Dec 2025",
    location: "Brandon, MS",
    summary:
      "Ran a residential community for adults with developmental disabilities: strategy, staff, budget, board, and facilities.",
    description: [
      "Led organization-wide strategic planning so initiatives stayed aligned with mission and long-term goals.",
      "Oversaw complex, cross-functional projects including facilities, fundraising campaigns, and community engagement.",
      "Managed budgets, timelines, and stakeholder relationships while ensuring compliance and operational excellence.",
      "Served as primary liaison to the Board, translating priorities into actionable plans and measurable outcomes.",
      "Coordinated teams across departments and built a culture of collaboration and accountability.",
    ],
    metrics: [
      { value: 37, label: "staff led, including 3 directors" },
      { value: 2, prefix: "$", suffix: "M", label: "annual budget managed" },
      { value: 100, suffix: "%", label: "fully staffed within six months, up from 73% understaffed" },
      { value: 34, suffix: "%", label: "improvement in employee engagement scores" },
      { value: 60, suffix: "%", label: "faster onboarding after launching a new HR and payroll platform" },
      { value: 4, suffix: "%", label: "annual reduction in operating costs without sacrificing quality of care" },
      { value: 9, suffix: "%", label: "increase in contributions and new donor partnerships in year one" },
      { value: 13, suffix: "%", label: "increase in staff retention through structured reviews and career pathways" },
    ],
  },
  {
    id: "lake-forest-ranch",
    title: "Assistant Director",
    company: "Lake Forest Ranch",
    start: "Oct 2021",
    end: "Nov 2024",
    location: "Macon, MS",
    summary:
      "Programs, hospitality, staffing, and brand for a camp and retreat center in the Mississippi woods.",
    description: [
      "Developed and led camp programs that reflected the organization's mission and created meaningful experiences for participants.",
      "Managed event logistics end to end: scheduling, resources, and delegation to staff and volunteers.",
      "Directed hospitality and guest experience for retreat groups, keeping standards high and relationships warm.",
      "Identified operational bottlenecks and designed process improvements that made staff more efficient and guests happier.",
      "Trained and mentored staff and volunteers to own their roles inside a culture of service and teamwork.",
    ],
    metrics: [
      { value: 60, suffix: "+", label: "seasonal staff recruited, hired, and trained each year" },
      { value: 33, suffix: "%", label: "improvement in seasonal staff retention" },
      { value: 200, label: "campers and leaders served per week" },
      { value: 30, suffix: "+", label: "retreat groups hosted annually" },
      { value: 65, suffix: "%", label: "increase in group satisfaction and repeat bookings" },
      { value: 75, suffix: "%", label: "jump in registration inquiries after a refreshed brand, logo, and website" },
      { value: 50, suffix: "%", label: "improvement in operational efficiency through better scheduling" },
    ],
  },
  {
    id: "pinelake",
    title: "Connections Director",
    company: "Pinelake Church",
    start: "Apr 2019",
    end: "Oct 2021",
    location: "Madison, MS",
    summary:
      "Led hospitality, guest services, and volunteer teams for a large, fast-moving campus.",
    description: [
      "Led hospitality efforts so guests and members felt welcomed and supported from the parking lot in.",
      "Planned and executed community engagement projects that advanced organizational goals.",
      "Guided teams through onboarding, training, and coordination for large events.",
      "Developed servant-leadership initiatives that grew team capacity and impact.",
    ],
    metrics: [
      { value: 900, suffix: "+", label: "weekly attendance served through guest services" },
      { value: 100, suffix: "+", label: "volunteers led, trained, and scheduled across campus" },
      { value: 20, suffix: "%", label: "improvement in volunteer retention and engagement" },
      { value: 10, suffix: "%", label: "increase in small group participation through new onboarding pathways" },
      { value: 10, suffix: "+", label: "large-scale events coordinated each year" },
      { value: 25, suffix: "%", label: "reduction in guest follow-up time" },
    ],
  },
  {
    id: "citizens-village",
    title: "Connections Director",
    company: "Citizens Church & The Village Church",
    start: "Dec 2017",
    end: "Apr 2019",
    location: "Plano, TX",
    summary:
      "Built guest assimilation, membership, and volunteer programs from the ground up for a new church plant.",
    description: [
      "Led guest assimilation and connection processes, including membership classes, orientations, and onboarding.",
      "Recruited, trained, and shepherded volunteer teams toward a culture of hospitality and warmth.",
      "Implemented and managed volunteer and connection programs for a smooth, welcoming environment.",
      "Tracked and analyzed engagement metrics to refine workflows and improve the member experience.",
    ],
    metrics: [
      { value: 5, label: "organizational areas with volunteer recruitment, training, and placement" },
      { value: 10, suffix: "%", label: "increase in active volunteer participation" },
      { value: 60, suffix: "%", label: "reduction in guest follow-up response time" },
      { value: 50, label: "new members onboarded annually through classes and pathways" },
    ],
  },
  {
    id: "village-tech",
    title: "Technology Associate",
    company: "The Village Church",
    start: "Aug 2015",
    end: "Dec 2017",
    location: "Flower Mound, TX",
    summary:
      "Frontline technology support and process documentation for a large multi-site staff.",
    description: [
      "Supported staff and volunteers by troubleshooting technology so programs and events ran without disruption.",
      "Developed and maintained guides and workflows to streamline team processes.",
      "Managed recurring technical challenges as projects with sustainable solutions.",
      "Coordinated with teams to identify needs, prioritize tasks, and deliver tech initiatives on time.",
    ],
    metrics: [
      { value: 125, label: "staff supported across hardware, software, and network systems" },
      { value: 95, suffix: "%", label: "resolution rate within SLA standards" },
      { value: 15, suffix: "%", label: "reduction in repeat support tickets through better documentation" },
    ],
  },
];

export const interests = [
  {
    id: "family",
    title: "Family",
    icon: "🏡",
    blurb: "They keep me grounded and remind me what really matters.",
    detail: "Most of my best days end around a table with them.",
  },
  {
    id: "community",
    title: "Community",
    icon: "🤝",
    blurb: "Serving the people around us has been part of my life for as long as I can remember.",
    detail: "My family and I take seriously how we care for our neighbors.",
  },
  {
    id: "running",
    title: "Running",
    icon: "🏃",
    blurb: "My time to push myself, clear my head, and chase a goal.",
    detail: "Follow along on Strava if you want to keep me honest.",
    href: site.links.strava,
    cta: "See my runs",
  },
  {
    id: "cooking",
    title: "Cooking & Hosting",
    icon: "🍳",
    blurb: "My way of caring for people.",
    detail: "Nothing beats a good meal and a long conversation.",
  },
  {
    id: "woods",
    title: "The Woods",
    icon: "🌲",
    blurb: "Where I slow down, recharge, and enjoy the simple things.",
    detail: "The outdoors is where I feel most alive.",
  },
  {
    id: "yard",
    title: "Yard Work",
    icon: "🌱",
    blurb: "Hands-on and satisfying.",
    detail: "I love seeing the results of hard work and getting dirty.",
  },
];

export const education = {
  school: "Mississippi State University",
  degree: "Bachelor of Science, Kinesiology",
  years: "2006 to 2011",
};

export const certifications = [
  { name: "Google Data Analytics Professional Certificate", status: "Completed 2025", done: true },
  { name: "Project Management Professional (PMP), PMI", status: "In progress", done: false },
];

export const learning = ["SQL", "R", "Python"];
