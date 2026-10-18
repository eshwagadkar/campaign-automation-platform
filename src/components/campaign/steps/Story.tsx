import { CampaignFormField } from "@/components/campaign/CampaignFormField";
import { campaignPalette } from "@/components/campaign/campaign-config";
import { Text } from "@/components/ui/text";
import type { CampaignDraft, CampaignFieldErrors } from "@/types/campaign";
import { useState } from "react";
import { Pressable, TextInput, View } from "react-native";

type StoryStepProps = {
  draft: CampaignDraft;
  onChange: <K extends keyof CampaignDraft>(key: K, value: CampaignDraft[K]) => void;
  errors: CampaignFieldErrors;
};

type Selection = { start: number; end: number };

type EditorAction = { label: string; before: string; after: string; accessibilityLabel: string };
const EDITOR_ACTIONS: EditorAction[] = [
  { label: "B", before: "**", after: "**", accessibilityLabel: "Bold" },
  { label: "I", before: "*", after: "*", accessibilityLabel: "Italic" },
  { label: "U", before: "<u>", after: "</u>", accessibilityLabel: "Underline" },
  { label: "• List", before: "\n- ", after: "", accessibilityLabel: "Bulleted list" },
  { label: "H2", before: "\n## ", after: "", accessibilityLabel: "Heading" },
  { label: "↗ Link", before: "[", after: "](https://)", accessibilityLabel: "Link" },
];

export function StoryStep({ draft, onChange, errors }: StoryStepProps) {
  const [descriptionSelection, setDescriptionSelection] = useState<Selection>({ start: 0, end: 0 });
  const [careSelection, setCareSelection] = useState<Selection>({ start: 0, end: 0 });

  const applyFormatting = (action: EditorAction) => {
    const text = draft.fullDescription;
    const start = Math.min(descriptionSelection.start, text.length);
    const end = Math.min(descriptionSelection.end, text.length);
    const selected = text.slice(start, end);
    const replacement = `${action.before}${selected || (action.after ? "text" : "")}${action.after}`;
    const nextText = `${text.slice(0, start)}${replacement}${text.slice(end)}`;
    const selectedStart = start + action.before.length;
    const selectedEnd = selectedStart + (selected ? selected.length : action.after ? 4 : 0);

    onChange("fullDescription", nextText);
    setDescriptionSelection({ start: selectedStart, end: selectedEnd });
  };

  const applyCareFormatting = (action: EditorAction) => {
    const text = draft.whyBackersCare;
    const start = Math.min(careSelection.start, text.length);
    const end = Math.min(careSelection.end, text.length);
    const selected = text.slice(start, end);
    const replacement = `${action.before}${selected || (action.after ? "text" : "")}${action.after}`;
    const nextText = `${text.slice(0, start)}${replacement}${text.slice(end)}`;
    const selectedStart = start + action.before.length;
    const selectedEnd = selectedStart + (selected ? selected.length : action.after ? 4 : 0);

    onChange("whyBackersCare", nextText);
    setCareSelection({ start: selectedStart, end: selectedEnd });
  };

  return (
    <View className="gap-6">
      <View className="gap-1 border-b pb-4" style={{ borderColor: "#E2E8F0" }}>
        <Text className="text-xl font-bold" style={{ color: campaignPalette.ink }}>Tell your story</Text>
        <Text className="text-sm" style={{ color: campaignPalette.muted }}>Pitch your message to the world.</Text>
      </View>

      <CampaignFormField
        label="Short description"
        required
        error={errors.shortDescription}
        helperText="This appears as the summary at the top of your campaign page and may be used as the ad headline."
      >
        <View className="gap-2">
          <TextInput
            value={draft.shortDescription}
            onChangeText={(value) => onChange("shortDescription", value.slice(0, 150))}
            placeholder="Summarize your campaign in one or two clear sentences."
            placeholderTextColor="#94A3B8"
            maxLength={150}
            multiline
            textAlignVertical="top"
            className="min-h-24 rounded-xl border bg-white px-3.5 py-3 text-sm leading-5"
            style={{ borderColor: errors.shortDescription ? campaignPalette.danger : campaignPalette.border, color: campaignPalette.ink }}
            accessibilityLabel="Short campaign description"
          />
          <Text className="text-xs" style={{ color: draft.shortDescription.length > 140 ? campaignPalette.danger : campaignPalette.muted, textAlign: "right" }}>
            {draft.shortDescription.length}/150
          </Text>
        </View>
      </CampaignFormField>

      <CampaignFormField
        label="Full campaign description"
        required
        error={errors.fullDescription}
        helperText="Use clear paragraphs and headings. Formatting shortcuts insert Markdown syntax; a rendered rich-text preview can be added later."
      >
        <View className="overflow-hidden rounded-xl border bg-white" style={{ borderColor: errors.fullDescription ? campaignPalette.danger : campaignPalette.border }}>
          <View className="flex-row flex-wrap items-center gap-1 border-b px-2 py-2" style={{ borderColor: "#E2E8F0", backgroundColor: "#F8FAFC" }}>
            {EDITOR_ACTIONS.map((action) => (
              <Pressable
                key={action.label}
                onPress={() => applyFormatting(action)}
                accessibilityRole="button"
                accessibilityLabel={action.accessibilityLabel}
                className="min-h-8 rounded-md px-2.5 py-1.5"
                style={{ backgroundColor: "#FFFFFF" }}
              >
                <Text className="text-xs font-semibold" style={{ color: campaignPalette.ink }}>{action.label}</Text>
              </Pressable>
            ))}
          </View>
          <TextInput
            value={draft.fullDescription}
            onChangeText={(value) => onChange("fullDescription", value)}
            onSelectionChange={(event) => setDescriptionSelection(event.nativeEvent.selection)}
            selection={descriptionSelection}
            placeholder={"Tell the story behind your campaign.\n\nWhat problem are you addressing? What will you do about it? What change do you hope to make?"}
            placeholderTextColor="#94A3B8"
            multiline
            textAlignVertical="top"
            className="min-h-56 px-3.5 py-3 text-sm leading-6"
            style={{ color: campaignPalette.ink }}
            accessibilityLabel="Full campaign description editor"
          />
        </View>
      </CampaignFormField>

      <CampaignFormField
        label="Sources"
        helperText="Add URLs or citations that support your campaign. Put each source on a separate line; these can appear on the campaign page and help reviewers verify claims."
      >
        <TextInput
          value={draft.sources}
          onChangeText={(value) => onChange("sources", value)}
          placeholder={"https://example.com/report\nStudy: Annual Report 2025, p. 12"}
          placeholderTextColor="#94A3B8"
          multiline
          textAlignVertical="top"
          className="min-h-24 rounded-xl border bg-white px-3.5 py-3 text-sm leading-5"
          style={{ borderColor: campaignPalette.border, color: campaignPalette.ink }}
          accessibilityLabel="Campaign sources and citations"
        />
      </CampaignFormField>

      <CampaignFormField
        label="Why should backers care?"
        helperText="Explain the impact of supporting your campaign. This can appear as a separate section in the campaign preview."
      >
        <View className="overflow-hidden rounded-xl border bg-white" style={{ borderColor: campaignPalette.border }}>
          <View className="flex-row flex-wrap items-center gap-1 border-b px-2 py-2" style={{ borderColor: "#E2E8F0", backgroundColor: "#F8FAFC" }}>
            {EDITOR_ACTIONS.slice(0, 5).map((action) => (
              <Pressable
                key={action.label}
                onPress={() => applyCareFormatting(action)}
                accessibilityRole="button"
                accessibilityLabel={`${action.accessibilityLabel} in why backers should care`}
                className="min-h-8 rounded-md px-2.5 py-1.5"
                style={{ backgroundColor: "#FFFFFF" }}
              >
                <Text className="text-xs font-semibold" style={{ color: campaignPalette.ink }}>{action.label}</Text>
              </Pressable>
            ))}
          </View>
          <TextInput
            value={draft.whyBackersCare}
            onChangeText={(value) => onChange("whyBackersCare", value)}
            onSelectionChange={(event) => setCareSelection(event.nativeEvent.selection)}
            selection={careSelection}
            placeholder="What makes this campaign meaningful? How will support make a measurable difference?"
            placeholderTextColor="#94A3B8"
            multiline
            textAlignVertical="top"
            className="min-h-32 px-3.5 py-3 text-sm leading-6"
            style={{ color: campaignPalette.ink }}
            accessibilityLabel="Why backers should care"
          />
        </View>
      </CampaignFormField>
    </View>
  );
}
