import type { Campaign } from "@/types/campaign";

// Illustrative demo data.
export const CAMPAIGNS: Campaign[] = [
  {
    id: "1",
    category: "Environment",
    title: "Make our cities greener",
    description:
      "Help local communities bring more green spaces to urban neighborhoods.",
    raised: 72500,
    goal: 100000,
    supporters: 248,
    image:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1000&auto=format&fit=crop&q=85",
    tagline: "Small actions. Lasting change.",
  },
  {
    id: "2",
    category: "Education",
    title: "A brighter future for every child",
    description:
      "Amplify access to learning resources for underserved communities.",
    raised: 42000,
    goal: 80000,
    supporters: 156,
    image:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1000&auto=format&fit=crop&q=85",
  },
  {
    id: "3",
    category: "Community",
    title: "Stronger neighborhoods together",
    description:
      "Help community-led initiatives reach the people who need them.",
    raised: 31000,
    goal: 60000,
    supporters: 94,
    image:
      "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=1000&auto=format&fit=crop&q=85",
  },
];

export const FEATURED_CAMPAIGN = CAMPAIGNS[0];
