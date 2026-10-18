import { Text } from "@/components/ui/text";
import { Pressable, View } from "react-native";

const ITEMS = [
  { label: "Home", icon: "⌂" },
  { label: "Explore", icon: "⌕" },
  { label: "Create", icon: "+", create: true },
  { label: "Activity", icon: "◷" },
  { label: "Profile", icon: "○" },
] as const;

type NavDestination = (typeof ITEMS)[number]["label"];

export function HomeBottomNav({ 
  active,
  onNavigate 
} : {
  active: NavDestination; 
  onNavigate: (label: string) => void;
 }) {
  return (
    <View className="h-[68px] flex-row items-center justify-around border-t border-border bg-card px-1">
      {ITEMS.map((item) => {
        const isActive = item.label === active;
        return (
        <Pressable
          key={item.label}
          accessibilityRole="button"
          accessibilityLabel={item.label}
          accessibilityState={{ selected: isActive }}
            onPress={() => onNavigate(item.label)}
          className="flex-1 items-center justify-center gap-0.5"
        >
          {"create" in item && item.create ? (
            <View className="h-[30px] w-8 items-center justify-center rounded-[10px] bg-primary">
              <Text className="text-2xl leading-[26px] text-primary-foreground">+</Text>
            </View>
          ) : (
            <Text className={`text-[24px] leading-[27px] ${"active" in item && item.active ? "font-bold text-primary" : "text-muted-foreground"}`}>
              {item.icon}
            </Text>
          )}
          <Text className={`text-[9px] ${ "active" in item && item.active ? "font-extrabold text-primary" : "font-medium text-muted-foreground"}`}>
            {item.label}
          </Text>
        </Pressable>
        );
    })}
    </View>
  );
}
