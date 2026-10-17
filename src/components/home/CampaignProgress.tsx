import { Text } from "@/components/ui/text";
import { formatAmount } from "@/constants/home";
import { View } from "react-native";

export function CampaignProgress({
  raised,
  goal,
  showPercent = false,
}: {
  raised: number;
  goal: number;
  showPercent?: boolean;
}) {
  const progress = Math.min((raised / goal) * 100, 100);

  return (
    <View>
      <View className="mb-2.5 flex-row items-center justify-between gap-2">
        <Text className="text-sm font-extrabold text-primary">
          {formatAmount(raised)}
          {!showPercent && (
            <Text className="text-[11px] font-normal text-muted-foreground">
              {` of ${formatAmount(goal)}`}
            </Text>
          )}
        </Text>
        {showPercent ? (
          <Text className="text-xs font-extrabold text-primary">
            {Math.round(progress)}%
          </Text>
        ) : null}
      </View>
      <View
        accessibilityRole="progressbar"
        accessibilityLabel={`${Math.round(progress)} percent funded`}
        accessibilityValue={{ min: 0, max: 100, now: Math.round(progress) }}
        className="h-1.5 overflow-hidden rounded-full bg-muted"
      >
        <View
          className="h-full rounded-full bg-primary"
          style={{ width: `${progress}%` }}
        />
      </View>
    </View>
  );
}
