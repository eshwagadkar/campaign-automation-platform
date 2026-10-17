import { CampaignProgress } from "@/components/home/CampaignProgress";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import type { Campaign } from "@/types/campaign";
import { Image, Pressable, View } from "react-native";

export function FeaturedCampaign({
  campaign,
  isSaved,
  onToggleSaved,
  onOpen,
}: {
  campaign: Campaign;
  isSaved: boolean;
  onToggleSaved: () => void;
  onOpen: () => void;
}) {
  return (
    <Card className="mb-8 gap-0 overflow-hidden rounded-[20px] border-border bg-card p-0 shadow-none">
      <View className="h-[225px] bg-secondary">
        <Image source={{ uri: campaign.image }} className="h-full w-full" resizeMode="cover" />
        <View className="absolute inset-0 bg-black/25" />
        <View className="absolute left-3.5 right-3.5 top-3.5 flex-row items-center justify-between">
          <View className="rounded-md bg-white/95 px-2.5 py-2">
            <Text className="text-[9px] font-extrabold tracking-[0.8px] text-primary">
              {campaign.category.toUpperCase()}
            </Text>
          </View>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={isSaved ? "Remove featured campaign from saved" : "Save featured campaign"}
            accessibilityState={{ selected: isSaved }}
            onPress={onToggleSaved}
            className="h-11 w-11 items-center justify-center rounded-full bg-white/95"
          >
            <Text className="text-2xl text-primary">{isSaved ? "♥" : "♡"}</Text>
          </Pressable>
        </View>
        <View className="absolute bottom-5 left-5 right-5">
          <Text className="text-[29px] font-extrabold leading-[34px] tracking-[-0.7px] text-white">
            {campaign.title.endsWith("greener") ? "Make our cities\ngreener." : campaign.title}
          </Text>
          <Text className="mt-1.5 text-xs text-white">
            {campaign.tagline ?? "Small actions. Lasting change."}
          </Text>
        </View>
      </View>
      <CardContent className="p-4">
        <CampaignProgress raised={campaign.raised} goal={campaign.goal} showPercent />
        <View className="mt-4 flex-row items-center justify-between gap-2">
          <Text className="flex-1 text-[11px] text-muted-foreground">
            ◉ {campaign.supporters} people backing this
          </Text>
          <Button size="icon" variant="secondary" className="h-10 w-10 rounded-full" onPress={onOpen} accessibilityLabel="View featured campaign">
            <Text className="text-lg font-bold text-primary">↗</Text>
          </Button>
        </View>
      </CardContent>
    </Card>
  );
}
