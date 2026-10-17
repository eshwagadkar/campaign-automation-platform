export type CampaignCategory = "Environment" | "Education" | "Community";

export type Campaign = {
  id: string;
  category: CampaignCategory;
  title: string;
  description: string;
  raised: number;
  goal: number;
  supporters: number;
  image: string;
  tagline?: string;
};
