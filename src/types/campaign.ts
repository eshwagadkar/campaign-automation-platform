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
  coverImageUri: string;
  coverImageName: string;
  useSlideshow: boolean;
  slideshowImageUris: string[];
  useCustomAdVisuals: boolean;
  adHeadline: string;
  adDescription: string;
  adImageUri: string;
};

export type CampaignFieldErrors = Partial<
  Record<
    | "title"
    | "category"
    | "organizer"
    | "shortDescription"
    | "fullDescription"
    | "coverImageUri",
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
  coverImageUri: "",
  coverImageName: "",
  useSlideshow: false,
  slideshowImageUris: [],
  useCustomAdVisuals: false,
  adHeadline: "",
  adDescription: "",
  adImageUri: "",
};
