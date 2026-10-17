import { CampaignProgress } from "@/components/home/CampaignProgress";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import type { Campaign } from "@/types/campaign";
import { Image, Pressable, View } from "react-native";

export function CampaignCard({
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
    <Card className="mb-4 gap-0 overflow-hidden rounded-[18px] border-border bg-card p-0 shadow-none">
      <View className="h-44 bg-secondary">
        <Image source={{ uri: campaign.image }} className="h-full w-full" resizeMode="cover" />
        <View className="absolute left-3 top-3 rounded-md bg-white/95 px-2.5 py-2">
          <Text className="text-[9px] font-extrabold tracking-[0.7px] text-primary">
            {campaign.category.toUpperCase()}
          </Text>
        </View>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={isSaved ? `Unsave ${campaign.title}` : `Save ${campaign.title}`}
          accessibilityState={{ selected: isSaved }}
          onPress={onToggleSaved}
          className="absolute right-3 top-3 h-11 w-11 items-center justify-center rounded-full bg-white/95"
        >
          <Text className="text-2xl text-primary">{isSaved ? "♥" : "♡"}</Text>
        </Pressable>
      </View>
      <CardContent className="gap-0 p-4">
        <CardTitle className="text-[17px] font-extrabold tracking-[-0.3px] text-foreground">
          {campaign.title}
        </CardTitle>
        <CardDescription className="mb-4 mt-1.5 text-xs leading-5">
          {campaign.description}
        </CardDescription>
        <CampaignProgress raised={campaign.raised} goal={campaign.goal} />
        <View className="mt-4 flex-row items-center justify-between gap-3">
          <Text className="flex-1 text-[11px] text-muted-foreground">
            ◉ {campaign.supporters} supporters
          </Text>
          <Button size="sm" onPress={onOpen}>
            <Text>View ↗</Text>
          </Button>
        </View>
      </CardContent>
    </Card>
  );
}
