import { Text } from "@/components/ui/text";
import { View } from "react-native";

export function SectionHeading({
  title,
  subtitle,
  trailing,
}: {
  title: string;
  subtitle: string;
  trailing?: React.ReactNode;
}) {
  return (
    <View className="mb-4 flex-row items-center justify-between gap-3">
      <View className="flex-1 gap-1">
        <Text className="text-xl font-extrabold tracking-[-0.5px] text-foreground">
          {title}
        </Text>
        <Text className="text-xs text-muted-foreground">{subtitle}</Text>
      </View>
      {trailing}
    </View>
  );
}
