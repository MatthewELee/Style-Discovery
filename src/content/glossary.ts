// The vocabulary used to tag concepts. See docs/GLOSSARY.md.
// A concept's meta.ts can only use keys defined here, so a typo fails the build.

export const visualTerms = {
  Clean: "Little unnecessary clutter; elements are easy to distinguish.",
  Modern:
    "Reflects contemporary design conventions, such as current typography, layouts, and interaction patterns.",
  Premium:
    "Communicates high quality or exclusivity through visual presentation and content.",
  Vibrant: "Energetic use of saturated colors, imagery, and contrast.",
  Muted: "Uses subdued, less saturated colors.",
  Cohesive: "Colors, typography, imagery, and components feel like they belong together.",
  Consistent: "The same design rules and patterns are applied throughout the site.",
  Airy: "Uses generous spacing to make content feel open rather than crowded.",
  Dense: "Displays a large amount of information in a relatively small space.",
  "High-contrast":
    "Creates strong visual differences, such as light text on a dark background.",
} as const;

export const uxTerms = {
  Frictionless: "Removes unnecessary steps, obstacles, or confusion from a task.",
  Engaging: "Holds the visitor's interest and encourages interaction.",
  Discoverable: "Important features and information are easy to find.",
  Scannable:
    "Users can quickly understand a page by looking at headings, lists, and highlighted information.",
  Accessible:
    "Usable by people with a broad range of abilities and assistive technologies.",
  "User-centric":
    "Decisions are based on user needs and behavior rather than just aesthetics or business preferences.",
  "Information architecture":
    "How information is organized, categorized, and connected across the website.",
  "Visual hierarchy":
    "How size, position, color, and contrast indicate what users should notice first.",
  "Call to action":
    "An element that prompts a user to act, such as “Contact Us” or “Book Now.”",
  "User flow": "The sequence of steps someone takes to accomplish a task on the site.",
} as const;

export type VisualTag = keyof typeof visualTerms;
export type UxTag = keyof typeof uxTerms;

export function defineTerm(tag: VisualTag | UxTag): string {
  return tag in visualTerms ? visualTerms[tag as VisualTag] : uxTerms[tag as UxTag];
}
