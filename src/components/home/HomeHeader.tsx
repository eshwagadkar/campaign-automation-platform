import { Text } from '@/components/ui/text';
import { Pressable, View } from 'react-native';

export function HomeHeader({ onProfilePress }: { onProfilePress: () => void }) {
  return (
    <View className="mb-7 flex-row items-center justify-between">
      <View className="gap-0.5">
        <Text className="text-[10px] font-extrabold tracking-[2px] text-muted-foreground">
          YOUR IMPACT STARTS HERE
        </Text>
        <Text className="text-[30px] font-black tracking-[-1.5px] text-primary">
          amplify<Text className="text-[#B4CC65]">.</Text>
        </Text>
      </View>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Open profile"
        onPress={onProfilePress}
        className="h-11 w-11 items-center justify-center rounded-full border border-[#CAD99A] bg-[#DCEB8B]"
      >
        <Text className="text-base font-extrabold text-primary">Y</Text>
      </Pressable>
    </View>
  );
}
