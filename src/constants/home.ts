export const CAMPAIGN_CATEGORIES = [
  "All",
  "Art",
  "Animal Welfare",
  "Civic",
  "Community",
  "Consumer",
  "Disaster Relief",
  "Economic Policy",
  "Education",
  "Environment",
  "Food & Beverage",
  "Geopolitical",
  "Health",
  "Journalism",
  "Local Business",
  "Music",
  "News",
  "Non-Profit",
  "Politics",
  "Poverty",
  "Public Policy",
  "Safety",
  "Science",
  "Sports",
  "Technology",
  "Other"
] as const;

export type CategoryFilter = (typeof CAMPAIGN_CATEGORIES)[number]

export const COMMUNITY_IMPACT = {
  amount: "₹12.8L",
  campaigns: "86",
  supporters: "2.4k",
} as const;

export const formatAmount = (amount: number) =>
  `₹${amount.toLocaleString("en-IN")}`;