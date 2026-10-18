import { CAMPAIGN_STEPS, campaignPalette } from "@/components/campaign/campaign-config";
import { Text } from "@/components/ui/text";
import { View } from "react-native";

export function CampaignStepIndicator({ step }: { step: number }) {
  return (
    <View className="gap-3">
      <View className="flex-row items-center justify-between">
        <Text className="text-xs font-semibold tracking-widest" style={{ color: campaignPalette.primary }}>
          STEP {step + 1} OF {CAMPAIGN_STEPS.length}
        </Text>
        <Text className="text-xs" style={{ color: campaignPalette.muted }}>
          {Math.round(((step + 1) / CAMPAIGN_STEPS.length) * 100)}% complete
        </Text>
      </View>
      <View className="flex-row gap-1.5">
        {CAMPAIGN_STEPS.map((label, index) => (
          <View
            key={label}
            className="h-1 flex-1 rounded-full"
            style={{ backgroundColor: index <= step ? campaignPalette.primary : "#E2E8F0" }}
          />
        ))}
      </View>
      <View className="flex-row items-center justify-between">
        <Text className="text-sm font-semibold" style={{ color: campaignPalette.ink }}>
          {CAMPAIGN_STEPS[step]}
        </Text>
        <Text className="text-xs" style={{ color: campaignPalette.muted }}>
          {step === 0 ? "Let's get the essentials" : "Your details stay saved as you move between steps"}
        </Text>
      </View>
    </View>
  );
}
