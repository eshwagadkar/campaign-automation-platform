import { CampaignFormField } from "@/components/campaign/CampaignFormField";
import { CAMPAIGN_CATEGORIES, campaignPalette } from "@/components/campaign/campaign-config";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import type { CampaignCategory, CampaignDraft, CampaignFieldErrors } from "@/types/campaign";
import { useState } from "react";
import { Alert, Pressable, TextInput, View } from "react-native";

type BasicsStepProps = {
  draft: CampaignDraft;
  onChange: <K extends keyof CampaignDraft>(key: K, value: CampaignDraft[K]) => void;
  errors: CampaignFieldErrors;
};

export function BasicsStep({ draft, onChange, errors }: BasicsStepProps) {
  const [categoryOpen, setCategoryOpen] = useState(false);

  return (
    <View className="gap-6">
      <View className="gap-1">
        <Text className="text-2xl font-bold tracking-tight" style={{ color: campaignPalette.ink }}>
          Start with your idea.
        </Text>
        <Text className="text-sm leading-5" style={{ color: campaignPalette.muted }}>
          Tell us what you're building and who it will help. You can refine the details as you go.
        </Text>
      </View>

      <View className="gap-3 rounded-2xl border p-4" style={{ backgroundColor: campaignPalette.primarySoft, borderColor: "#C7D2FE" }}>
        <View className="flex-row items-center gap-2">
          <View className="h-8 w-8 items-center justify-center rounded-xl" style={{ backgroundColor: campaignPalette.white }}>
            <Text style={{ color: campaignPalette.primary }}>✦</Text>
          </View>
          <View className="flex-1 gap-0.5">
            <Text className="text-sm font-semibold" style={{ color: "#312E81" }}>Generate your campaign with AI</Text>
            <Text className="text-xs leading-4" style={{ color: "#4338CA" }}>
              Describe your idea and get a starting draft you can edit.
            </Text>
          </View>
        </View>
        <TextInput
          value={draft.aiPrompt}
          onChangeText={(value) => onChange("aiPrompt", value)}
          multiline
          textAlignVertical="top"
          placeholder="Who are you helping, why does it matter, and what will the campaign achieve?"
          placeholderTextColor="#818CF8"
          className="min-h-24 rounded-xl border bg-white p-3 text-sm"
          style={{ borderColor: "#C7D2FE", color: campaignPalette.ink }}
          accessibilityLabel="Describe your campaign idea for AI assistance"
        />
        <Pressable
          onPress={() => onChange("generateCover", !draft.generateCover)}
          accessibilityRole="checkbox"
          accessibilityState={{ checked: draft.generateCover }}
          className="flex-row items-center gap-2 self-start py-1"
        >
          <View className="h-5 w-5 items-center justify-center rounded border" style={{ borderColor: draft.generateCover ? campaignPalette.primary : "#94A3B8", backgroundColor: draft.generateCover ? campaignPalette.primary : campaignPalette.white }}>
            {draft.generateCover ? <Text className="text-xs font-bold" style={{ color: campaignPalette.white }}>✓</Text> : null}
          </View>
          <Text className="text-sm" style={{ color: "#334155" }}>Also generate a cover image</Text>
        </Pressable>
        <Button
          className="self-start"
          onPress={() => Alert.alert(
            "AI assistance isn't connected yet",
            "Your prompt is captured. Once an AI service is connected, this action can generate editable campaign suggestions.",
          )}
        >
          <Text>✦  Generate my campaign</Text>
        </Button>
      </View>

      <View className="gap-1">
        <Text className="text-lg font-bold" style={{ color: campaignPalette.ink }}>Campaign basics</Text>
        <Text className="text-sm" style={{ color: campaignPalette.muted }}>First, let's get the essentials in place.</Text>
      </View>

      <CampaignFormField
        label="Campaign title"
        required
        error={errors.title}
        helperText="Keep it to 60 characters or fewer. A clear title helps people understand your campaign at a glance."
      >
        <View className="gap-2">
          <TextInput
            value={draft.title}
            onChangeText={(value) => onChange("title", value.slice(0, 60))}
            placeholder="Give your campaign a memorable name"
            placeholderTextColor="#94A3B8"
            maxLength={60}
            returnKeyType="next"
            className="rounded-xl border bg-white px-4 py-3.5 text-base"
            style={{ borderColor: errors.title ? campaignPalette.danger : campaignPalette.border, color: campaignPalette.ink }}
            accessibilityLabel="Campaign title"
          />
          <Text className="text-xs" style={{ color: campaignPalette.muted, textAlign: "right" }}>
            {draft.title.length}/60
          </Text>
        </View>
      </CampaignFormField>

      <CampaignFormField label="Category" required error={errors.category}>
        <Pressable
          onPress={() => setCategoryOpen(!categoryOpen)}
          accessibilityRole="button"
          accessibilityLabel="Choose campaign category"
          className="flex-row items-center justify-between rounded-xl border bg-white px-4 py-3.5"
          style={{ borderColor: errors.category ? campaignPalette.danger : campaignPalette.border }}
        >
          <Text className="text-base" style={{ color: draft.category ? campaignPalette.ink : "#94A3B8" }}>
            {draft.category || "Choose a category"}
          </Text>
          <Text style={{ color: campaignPalette.muted }}>{categoryOpen ? "⌃" : "⌄"}</Text>
        </Pressable>
        {categoryOpen ? (
          <View className="mt-2 overflow-hidden rounded-xl border bg-white" style={{ borderColor: campaignPalette.border }}>
            {CAMPAIGN_CATEGORIES.map((category: CampaignCategory) => (
              <Pressable
                key={category}
                onPress={() => {
                  onChange("category", category);
                  setCategoryOpen(false);
                }}
                className="px-4 py-3"
                style={{ backgroundColor: draft.category === category ? campaignPalette.primarySoft : campaignPalette.white }}
              >
                <Text className="text-sm font-medium" style={{ color: draft.category === category ? campaignPalette.primary : campaignPalette.ink }}>
                  {category}
                </Text>
              </Pressable>
            ))}
          </View>
        ) : null}
      </CampaignFormField>

      <CampaignFormField
        label="Who's behind this campaign?"
        required
        error={errors.organizer}
        helperText="This name will appear on the published campaign."
      >
        <TextInput
          value={draft.organizer}
          onChangeText={(value) => onChange("organizer", value)}
          placeholder="Your name or organization"
          placeholderTextColor="#94A3B8"
          returnKeyType="done"
          className="rounded-xl border bg-white px-4 py-3.5 text-base"
          style={{ borderColor: errors.organizer ? campaignPalette.danger : campaignPalette.border, color: campaignPalette.ink }}
          accessibilityLabel="Campaign organizer"
        />
      </CampaignFormField>
    </View>
  );
}
