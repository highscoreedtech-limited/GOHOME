/**
 * Scripture verses for the rotating "Daily Encouragement" card.
 * Public-domain wording. Add or edit freely; the card cycles through them.
 */
export interface Verse {
  quote: string;
  citation: string;
}

export const verses: Verse[] = [
  {
    quote:
      "Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go.",
    citation: "Joshua 1:9",
  },
  {
    quote: "I can do all things through Christ who strengthens me.",
    citation: "Philippians 4:13",
  },
  {
    quote:
      "Trust in the Lord with all your heart, and lean not on your own understanding.",
    citation: "Proverbs 3:5",
  },
  {
    quote:
      "Come to me, all you who are weary and burdened, and I will give you rest.",
    citation: "Matthew 11:28",
  },
  {
    quote: "Cast all your anxiety on Him, because He cares for you.",
    citation: "1 Peter 5:7",
  },
  {
    quote:
      "For I know the plans I have for you, plans to give you a hope and a future.",
    citation: "Jeremiah 29:11",
  },
  {
    quote:
      "Weeping may endure for a night, but joy comes in the morning.",
    citation: "Psalm 30:5",
  },
  {
    quote: "The Lord is my shepherd; I shall not want.",
    citation: "Psalm 23:1",
  },
  {
    quote:
      "The Lord is near to all who call on Him, to all who call on Him in truth.",
    citation: "Psalm 145:18",
  },
  {
    quote:
      "Let not your heart be troubled. You believe in God; believe also in Me.",
    citation: "John 14:1",
  },
];
