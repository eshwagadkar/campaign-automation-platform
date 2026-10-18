import type { CampaignCategory } from "@/types/campaign";

export const CAMPAIGN_STEPS = [
  "Basics",
  "Story",
  "Campaign & visuals",
  "Reach",
  "Submit",
] as const;

export const CAMPAIGN_CATEGORIES: CampaignCategory[] = [
  "Environment",
  "Education",
  "Community",
];

export const campaignPalette = {
  canvas: "#F8FAFC",
  ink: "#0F172A",
  muted: "#64748B",
  border: "#CBD5E1",
  primary: "#4F46E5",
  primarySoft: "#EEF2FF",
  white: "#FFFFFF",
  danger: "#DC2626",
};
