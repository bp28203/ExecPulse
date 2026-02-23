export const CATEGORIES = ["All", "Strategic", "Direct", "People", "Formal"];

export const HERO_IMAGES = [
  { id: 'img1', url: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=1200" },
  { id: 'img2', url: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=80&w=1200" },
  { id: 'img3', url: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=1200" }
];

export const REVIEWS = [
  {
    name: "Marcus Chen",
    role: "VP of Operations",
    text: "Executive Edge has completely streamlined how I prepare for board meetings. It captures the nuance of leadership speech perfectly.",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400"
  },
  {
    name: "Sarah Jenkins",
    role: "Director of Product",
    text: "The 'Radical Candor' tone is a game changer for my 1-on-1s. It helps me be direct while staying supportive of my team.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400"
  },
  {
    name: "David Miller",
    role: "Chief Strategy Officer",
    text: "I use the 'Board-Ready' filter for every major announcement. It saves me hours of manual editing and polishing.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400"
  }
];

export const USER_PROVIDED_IMAGE = "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1200";

export const CATEGORY_THEMES = {
  Strategic: {
    card: "bg-indigo-50 dark:bg-indigo-900 border-indigo-200 dark:border-indigo-500 hover:bg-indigo-100 dark:hover:bg-indigo-800 transition-all",
    tag: "text-indigo-900 dark:text-indigo-100 bg-indigo-200 dark:bg-indigo-600 border-indigo-300 dark:border-indigo-400",
    text: "text-indigo-950 dark:text-white",
    subtext: "text-indigo-800/80 dark:text-indigo-200/80"
  },
  Direct: {
    card: "bg-rose-50 dark:bg-rose-900 border-rose-200 dark:border-rose-500 hover:bg-rose-100 dark:hover:bg-rose-800 transition-all",
    tag: "text-rose-900 dark:text-rose-100 bg-rose-200 dark:bg-rose-600 border-rose-300 dark:border-rose-400",
    text: "text-rose-950 dark:text-white",
    subtext: "text-rose-800/80 dark:text-rose-200/80"
  },
  People: {
    card: "bg-teal-50 dark:bg-teal-900 border-teal-200 dark:border-teal-500 hover:bg-teal-100 dark:hover:bg-teal-800 transition-all",
    tag: "text-teal-900 dark:text-teal-100 bg-teal-200 dark:bg-teal-600 border-teal-300 dark:border-teal-400",
    text: "text-teal-950 dark:text-white",
    subtext: "text-teal-800/80 dark:text-teal-200/80"
  },
  Formal: {
    card: "bg-amber-50 dark:bg-amber-900 border-amber-200 dark:border-amber-500 hover:bg-amber-100 dark:hover:bg-amber-800 transition-all",
    tag: "text-amber-950 dark:text-amber-100 bg-amber-200 dark:bg-amber-600 border-amber-300 dark:border-amber-400",
    text: "text-amber-950 dark:text-white",
    subtext: "text-amber-800/80 dark:text-indigo-200/80"
  },
  All: {
    card: "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-600 hover:border-blue-500 transition-all",
    tag: "text-slate-700 dark:text-slate-100 bg-slate-200 dark:bg-slate-700 border-slate-300 dark:border-slate-500",
    text: "text-slate-900 dark:text-white",
    subtext: "text-slate-600 dark:text-slate-300"
  }
};

export const TONE_CONFIG = {
  Executive: { category: "Strategic", description: "Authoritative & outcome-oriented.", prompt: "Rewrite this to sound like a seasoned executive: authoritative, high-level, and focused on outcomes." },
  Metaphor: { category: "Strategic", description: "Clear, professional analogies.", prompt: "Rewrite the following text using a clear, professional metaphor or analogy that strengthens the message. Keep it concise and leadership-appropriate. Do not be overly dramatic or poetic." },
  Storytelling: { category: "People", description: "Short, narrative-led leading.", prompt: "Rewrite the following text in a short storytelling style suitable for leadership communication." },
  Assertive: { category: "Direct", description: "Direct, firm, and confident.", prompt: "Rewrite this to be direct and firm. Eliminate hedging language like 'I think' or 'maybe'." },
  Concise: { category: "Direct", description: "Brief and efficient.", prompt: "Rewrite this to be as brief as possible while retaining all key information." },
  Diplomatic: { category: "People", description: "Tactful and nuanced.", prompt: "Rewrite this to be tactful and inclusive, maintaining accountability while softening critiques." },
  Strategic: { category: "Strategic", description: "Visionary & long-term focused.", prompt: "Rewrite this to emphasize long-term goals and 'big picture' implications." },
  "Board-Ready": { category: "Formal", description: "Formal and risk-aware.", prompt: "Rewrite this for a Board of Directors. Focus on ROI, governance, and risk mitigation." },
  "C-Suite Brief": { category: "Formal", description: "High-speed briefing.", prompt: "Rewrite this as a rapid brief for a CEO (Bottom Line Up Front)." },
  Influential: { category: "People", description: "Persuasive and inspirational.", prompt: "Rewrite this using persuasive techniques to build buy-in and inspire action." },
  Empathetic: { category: "People", description: "Supportive and high EQ.", prompt: "Rewrite this to sound empathetic and supportive while remaining professional." },
  "Radical Candor": { category: "Direct", description: "Direct but caring.", prompt: "Rewrite using Radical Candor: be extremely direct but show you care about the person." }
};

export const INSIGHT_EXAMPLES = [
  { label: "Strategic", text: "Leveraging cross-functional synergies to optimize ROI." },
  { label: "Assertive", text: "We are moving forward with the Q3 roadmap immediately." },
  { label: "Diplomatic", text: "I appreciate the perspective; let's refine the approach together." },
  { label: "Board-Ready", text: "Projected growth aligns with our long-term fiscal governance." }
];
