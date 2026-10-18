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

export type CampaignDraft = {
  title: string;
  category: CampaignCategory | "";
  organizer: string;
  aiPrompt: string;
  generateCover: boolean;
  shortDescription: string;
  fullDescription: string;
  sources: string;
  whyBackersCare: string;
};

export type CampaignFieldErrors = Partial<
  Record<
    | "title"
    | "category"
    | "organizer"
    | "shortDescription"
    | "fullDescription",
    string
  >
>;

export const INITIAL_CAMPAIGN_DRAFT: CampaignDraft = {
  title: "",
  category: "",
  organizer: "",
  aiPrompt: "",
  generateCover: false,
  shortDescription: "",
  fullDescription: "",
  sources: "",
  whyBackersCare: "",
};
