import { Text } from "@/components/ui/text";
import { CAMPAIGN_CATEGORIES, type CategoryFilter } from "@/constants/home";
import { Pressable, ScrollView } from "react-native";

export function CategoryFilters({
  selected,
  onSelect,
}: {
  selected: CategoryFilter;
  onSelect: (category: CategoryFilter) => void;
}) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerClassName="gap-2 pb-4">
      {CAMPAIGN_CATEGORIES.map((category) => {
        const active = selected === category;
        return (
          <Pressable
            key={category}
            accessibilityRole="button"
            accessibilityState={{ selected: active }}
            onPress={() => onSelect(category)}
            className={`rounded-full border px-4 py-2.5 ${active ? "border-primary bg-primary" : "border-border bg-card"}`}
          >
            <Text className={`text-xs font-semibold ${active ? "text-primary-foreground" : "text-muted-foreground"}`}>
              {category}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}
