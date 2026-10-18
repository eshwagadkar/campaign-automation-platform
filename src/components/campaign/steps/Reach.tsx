import { CampaignFormField } from "@/components/campaign/CampaignFormField";
import { campaignPalette } from "@/components/campaign/campaign-config";
import { Text } from "@/components/ui/text";
import type { AdChannel, CampaignDraft, CampaignFieldErrors } from "@/types/campaign";
import { useEffect, useRef } from "react";
import { Animated, Pressable, TextInput, View } from "react-native";

type ReachStepProps = {
  draft: CampaignDraft;
  onChange: <K extends keyof CampaignDraft>(key: K, value: CampaignDraft[K]) => void;
  errors: CampaignFieldErrors;
};

const CHANNELS: { id: AdChannel; name: string; detail: string; mark: string; color: string }[] = [
  { id: "Facebook", name: "Facebook", detail: "Ads are created as drafts for human review in Meta Ads Manager.", mark: "f", color: "#1877F2" },
  { id: "Instagram", name: "Instagram", detail: "Feed and Explore. Created paused for review in Meta Ads Manager.", mark: "◎", color: "#E1306C" },
  { id: "YouTube", name: "YouTube", detail: "Image ads in the YouTube feed and Shorts. Created paused for review in Google Ads.", mark: "▶", color: "#FF0033" },
  { id: "Reddit", name: "Reddit", detail: "Ads are created as drafts for a human to review in Reddit Ads Manager.", mark: "●", color: "#FF4500" },
  { id: "LinkedIn", name: "LinkedIn", detail: "Ads are created as drafts for a human to review in Campaign Manager.", mark: "in", color: "#0A66C2" },
  { id: "X", name: "X", detail: "Ads are created as drafts for a human to review in X Ads Manager.", mark: "𝕏", color: "#111827" },
  { id: "TikTok", name: "TikTok", detail: "Ads are created as drafts for a human to review in TikTok Ads Manager.", mark: "♪", color: "#111827" },
  { id: "Pinterest", name: "Pinterest", detail: "Ads are created as drafts for a human to review in Pinterest Ads Manager.", mark: "P", color: "#BD081C" },
];

const inputClassName = "rounded-xl border px-3 py-3 text-sm";
const inputStyle = { borderColor: campaignPalette.border, backgroundColor: "#FFFFFF", color: campaignPalette.ink };

function formatReach(value: number) {
  return Math.round(value).toLocaleString("en-US");
}

function ChannelToggle({ selected }: { selected: boolean }) {
  const position = useRef(new Animated.Value(selected ? 20 : 0)).current;
  const colorProgress = useRef(new Animated.Value(selected ? 1 : 0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(position, {
        toValue: selected ? 20 : 0,
        useNativeDriver: true,
        speed: 22,
        bounciness: 4,
      }),
      Animated.timing(colorProgress, {
        toValue: selected ? 1 : 0,
        duration: 180,
        useNativeDriver: false,
      }),
    ]).start();
  }, [colorProgress, position, selected]);

  const trackColor = colorProgress.interpolate({
    inputRange: [0, 1],
    outputRange: ["#CBD5E1", campaignPalette.primary],
  });

  return (
    <Animated.View
      className="h-6 w-11 justify-center rounded-full px-0.5"
      style={{ backgroundColor: trackColor }}
    >
      <Animated.View
        className="h-5 w-5 rounded-full bg-white"
        style={{ transform: [{ translateX: position }] }}
      />
    </Animated.View>
  );
}

export function ReachStep({ draft, onChange, errors }: ReachStepProps) {
  const goal = Number(draft.fundingGoal);
  const hasValidGoal = draft.fundingGoal.trim() !== "" && Number.isFinite(goal) && goal >= 100;
  // Illustrative estimate based on the reference screen's assumption of about 27 people per $1.
  const estimatedReach = hasValidGoal ? goal * 27.1 : 0;

  const toggleChannel = (channel: AdChannel) => {
    const selected = draft.adChannels.includes(channel)
      ? draft.adChannels.filter((item) => item !== channel)
      : [...draft.adChannels, channel];
    onChange("adChannels", selected);
  };

  return (
    <View className="gap-6 rounded-2xl border bg-white p-4" style={{ borderColor: "#E2E8F0" }}>
      <View className="gap-1 border-b pb-4" style={{ borderColor: "#E2E8F0" }}>
        <Text className="text-lg font-bold" style={{ color: campaignPalette.ink }}>Reach and funding</Text>
        <Text className="text-sm leading-5" style={{ color: campaignPalette.muted }}>How much you're raising, and who the message should reach.</Text>
      </View>

      <View className="gap-4">
        <View className="flex-row gap-3">
          <View className="flex-1 gap-1">
            <CampaignFormField label="Funding goal" required error={errors.fundingGoal} helperText="$100 minimum. This is a starting point—your team reviews the final goal based on your reach and impact.">
              <View className="flex-row items-center rounded-xl border px-3" style={{ borderColor: errors.fundingGoal ? campaignPalette.danger : campaignPalette.border, backgroundColor: "#FFFFFF" }}>
                <Text className="text-sm" style={{ color: campaignPalette.muted }}>$</Text>
                <TextInput
                  value={draft.fundingGoal}
                  onChangeText={(value) => onChange("fundingGoal", value.replace(/[^0-9]/g, ""))}
                  keyboardType="number-pad"
                  placeholder="100"
                  accessibilityLabel="Funding goal in US dollars"
                  className="min-w-0 flex-1 px-2 py-3 text-sm"
                  style={{ color: campaignPalette.ink }}
                />
              </View>
            </CampaignFormField>
          </View>
          <View className="flex-1 gap-1">
            <CampaignFormField label="Funding window" helperText="Starts after your campaign is approved.">
              <View className="rounded-xl border px-3 py-3" style={{ borderColor: campaignPalette.border, backgroundColor: "#FFFFFF" }}>
                <Text className="text-sm" style={{ color: campaignPalette.ink }}>{draft.fundingWindow}</Text>
              </View>
              <View className="flex-row flex-wrap gap-2">
                {["30 days", "60 days", "90 days"].map((window) => {
                  const selected = draft.fundingWindow === window;
                  return (
                    <Pressable
                      key={window}
                      onPress={() => onChange("fundingWindow", window)}
                      accessibilityRole="radio"
                      accessibilityState={{ selected }}
                      className="rounded-lg border px-2 py-1.5"
                      style={{ borderColor: selected ? campaignPalette.primary : campaignPalette.border, backgroundColor: selected ? campaignPalette.primarySoft : "#FFFFFF" }}
                    >
                      <Text className="text-xs font-medium" style={{ color: selected ? campaignPalette.primary : campaignPalette.muted }}>{window}</Text>
                    </Pressable>
                  );
                })}
              </View>
            </CampaignFormField>
          </View>
        </View>

        <View className="gap-2 rounded-2xl border p-4" style={{ borderColor: "#C7D2FE", backgroundColor: campaignPalette.primarySoft }}>
          <Text className="text-xs font-semibold uppercase tracking-wide" style={{ color: campaignPalette.primary }}>Estimated reach at goal</Text>
          <Text className="text-3xl font-bold" style={{ color: campaignPalette.ink }}>{hasValidGoal ? `${formatReach(estimatedReach)} people` : "—"}</Text>
          <Text className="text-sm leading-5" style={{ color: campaignPalette.muted }}>
            {hasValidGoal
              ? `$${formatReach(goal)} raised could put this message in front of about ${formatReach(estimatedReach)} people. $1 ≈ 27 people.`
              : "Enter a funding goal of at least $100 to see the illustrative estimate."}
          </Text>
          <Text className="text-xs leading-4" style={{ color: campaignPalette.muted }}>Estimate only. Based on an illustrative rate after platform fees and payment processing. Actual delivery varies by audience, channel and auction; this is not a guaranteed reach.</Text>
        </View>
      </View>

      <View className="gap-4">
        <CampaignFormField label="Who is the target audience?" helperText="Describe them in your own words. Your team translates this into ad targeting before the campaign runs.">
          <TextInput
            value={draft.targetAudience}
            onChangeText={(value) => onChange("targetAudience", value)}
            placeholder="People in the affected area who care about this cause…"
            multiline
            textAlignVertical="top"
            className={`${inputClassName} min-h-24`}
            style={inputStyle}
          />
          <Text className="text-xs leading-4" style={{ color: campaignPalette.muted }}>Targeting uses broad location and interest only—not personal data about the people who see it.</Text>
        </CampaignFormField>

        <CampaignFormField label="Why would it matter to them?" helperText="Write it for someone who has never heard of your cause. This becomes the 'Why it matters to you' summary on the audience page.">
          <TextInput
            value={draft.audienceRelevance}
            onChangeText={(value) => onChange("audienceRelevance", value)}
            placeholder="e.g. The gap between caring about a cause and knowing how to help…"
            multiline
            textAlignVertical="top"
            className={`${inputClassName} min-h-24`}
            style={inputStyle}
          />
        </CampaignFormField>
      </View>

      <View className="gap-4 border-t pt-5" style={{ borderColor: "#E2E8F0" }}>
        <View className="gap-1">
          <Text className="text-lg font-bold" style={{ color: campaignPalette.ink }}>Where should the ad run?</Text>
          <Text className="text-sm leading-5" style={{ color: campaignPalette.muted }}>Choose the networks you'd like your campaign to be promoted on.</Text>
        </View>
        <View className="gap-2">
          {CHANNELS.map((channel) => {
            const selected = draft.adChannels.includes(channel.id);
            return (
              <Pressable
                key={channel.id}
                onPress={() => toggleChannel(channel.id)}
                accessibilityRole="switch"
                accessibilityState={{ checked: selected }}
                accessibilityLabel={`${channel.name} advertising channel`}
                className="flex-row items-center gap-3 rounded-xl border p-3"
                style={{ borderColor: selected ? campaignPalette.primary : "#DCE3ED", backgroundColor: selected ? campaignPalette.primarySoft : "#FFFFFF" }}
              >
                <View className="h-8 w-8 items-center justify-center rounded-full" style={{ backgroundColor: "#F1F5F9" }}>
                  <Text className="text-sm font-bold" style={{ color: channel.color }}>{channel.mark}</Text>
                </View>
                <View className="flex-1 gap-0.5">
                  <Text className="text-sm font-semibold" style={{ color: campaignPalette.ink }}>{channel.name}</Text>
                  <Text className="text-xs leading-4" style={{ color: campaignPalette.muted }}>{channel.detail}</Text>
                </View>
                <ChannelToggle selected={selected} />
              </Pressable>
            );
          })}
        </View>
        {errors.adChannels ? (
          <Text accessibilityRole="alert" className="text-xs font-medium" style={{ color: campaignPalette.danger }}>
            {errors.adChannels}
          </Text>
        ) : null}
        <Text className="text-xs leading-4" style={{ color: campaignPalette.muted }}>Selecting a channel records your preference only. Ads are not created, reviewed or launched from this prototype.</Text>
      </View>
    </View>
  );
}
