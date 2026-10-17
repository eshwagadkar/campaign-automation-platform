import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { View } from "react-native";

export function CreateBanner({ onPress }: { onPress: () => void }) {
  return (
    <Card className="mb-2 mt-3 gap-0 rounded-[20px] border-0 bg-secondary p-0 shadow-none">
      <CardContent className="p-5">
        <Text className="text-[10px] font-extrabold tracking-[1.6px] text-primary">
          HAVE AN IDEA?
        </Text>
        <Text className="mt-2.5 text-[27px] font-extrabold leading-[33px] tracking-[-0.7px] text-foreground">
          Your cause deserves{"\n"}to be seen.
        </Text>
        <Text className="mb-5 mt-2 text-xs leading-5 text-muted-foreground">
          Turn your idea into a campaign and invite others to amplify your impact.
        </Text>
        <View className="self-start">
          <Button size="lg" onPress={onPress}>
            <Text>Start a campaign  ↗</Text>
          </Button>
        </View>
      </CardContent>
    </Card>
  );
}
