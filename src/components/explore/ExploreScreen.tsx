import { CampaignCard } from "@/components/home/CampaignCard";
import { CategoryFilters } from "@/components/home/CategoryFilters";
import { HomeBottomNav } from "@/components/home/HomeBottomNav";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import type { CategoryFilter } from "@/constants/home";
import { CAMPAIGNS } from "@/data/campaigns";
import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { Alert, Pressable, ScrollView, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export function ExploreScreen() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>("All");
  const [savedCampaigns, setSavedCampaigns] = useState<string[]>([]);

  const visibleCampaigns = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return CAMPAIGNS.filter((campaign) => {
      const matchesCategory = selectedCategory === "All" || campaign.category === selectedCategory;
      const matchesQuery = !normalizedQuery ||
        `${campaign.title} ${campaign.description} ${campaign.category}`.toLowerCase().includes(normalizedQuery);
      return matchesCategory && matchesQuery;
    });
  }, [query, selectedCategory]);

  const navigate = (destination: string) => {
    if (destination === "Explore") return;
    if (destination === "Home") router.push("/");
    else if (destination === "Create") router.push("/create");
    else Alert.alert(destination, `${destination} will be available in a future update.`);
  };

  const toggleSaved = (id: string) => {
    setSavedCampaigns((current) => current.includes(id)
      ? current.filter((savedId) => savedId !== id)
      : [...current, id]);
  };

  return (
    <SafeAreaView edges={["top", "left", "right"]} className="flex-1 bg-background">
      <View className="flex-1">
        <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName="px-5 pb-6 pt-3">
          <View className="mb-6 flex-row items-center justify-between">
            <View>
              <Text className="text-[10px] font-extrabold tracking-[2px] text-muted-foreground">FIND YOUR CAUSE</Text>
              <Text className="mt-1 text-[30px] font-black tracking-[-1.2px] text-primary">Explore.</Text>
            </View>
            <View className="h-11 w-11 items-center justify-center rounded-full bg-secondary">
              <Text className="text-xl text-primary">⌕</Text>
            </View>
          </View>

          <Text className="mb-4 text-sm leading-5 text-muted-foreground">
            Discover people turning good ideas into meaningful change.
          </Text>

          <View className="mb-5 flex-row items-center rounded-2xl border border-border bg-card px-4">
            <Text className="mr-2 text-lg text-muted-foreground">⌕</Text>
            <TextInput
              value={query}
              onChangeText={setQuery}
              placeholder="Search campaigns or causes"
              placeholderTextColor="#858B82"
              accessibilityLabel="Search campaigns"
              returnKeyType="search"
              className="h-12 flex-1 text-sm text-foreground"
            />
            {query.length > 0 ? (
              <Pressable accessibilityRole="button" accessibilityLabel="Clear search" onPress={() => setQuery("")}>
                <Text className="px-1 text-lg text-muted-foreground">×</Text>
              </Pressable>
            ) : null}
          </View>

          <CategoryFilters selected={selectedCategory} onSelect={setSelectedCategory} />

          <View className="mb-4 mt-1 flex-row items-end justify-between">
            <View>
              <Text className="text-xl font-extrabold tracking-[-0.5px] text-foreground">Campaigns</Text>
              <Text className="mt-1 text-xs text-muted-foreground">Causes powered by people like you</Text>
            </View>
            <Text className="text-xs font-semibold text-muted-foreground">{visibleCampaigns.length} found</Text>
          </View>

          {visibleCampaigns.length > 0 ? visibleCampaigns.map((campaign) => (
            <CampaignCard
              key={campaign.id}
              campaign={campaign}
              isSaved={savedCampaigns.includes(campaign.id)}
              onToggleSaved={() => toggleSaved(campaign.id)}
              onOpen={() => Alert.alert(campaign.title, "Campaign details will be connected in a future update.")}
            />
          )) : (
            <Card className="mb-5 rounded-2xl border-border bg-card shadow-none">
              <CardContent className="items-center px-5 py-8">
                <Text className="text-3xl text-primary">⌕</Text>
                <Text className="mt-3 text-base font-bold text-foreground">No campaigns found</Text>
                <Text className="mt-1 text-center text-sm leading-5 text-muted-foreground">
                  Try another search or choose a different category.
                </Text>
                <Button variant="outline" className="mt-4" onPress={() => { setQuery(""); setSelectedCategory("All"); }}>
                  <Text>Clear filters</Text>
                </Button>
              </CardContent>
            </Card>
          )}
          <View className="mt-2 rounded-2xl bg-secondary p-5">
            <Text className="text-[10px] font-extrabold tracking-[1.5px] text-primary">GOT AN IDEA?</Text>
            <Text className="mt-2 text-xl font-extrabold text-foreground">Bring your cause to life.</Text>
            <Text className="mt-1 text-sm leading-5 text-muted-foreground">Start a campaign and invite your community to be part of it.</Text>
            <View className="mt-4 self-start">
              <Button onPress={() => router.push("/create")}><Text>Create a campaign ↗</Text></Button>
            </View>
          </View>
          <Text className="mb-2 mt-5 text-center text-[10px] text-muted-foreground">Demo content · Campaign figures are illustrative</Text>
        </ScrollView>
        <HomeBottomNav active="Explore" onNavigate={navigate} />
      </View>
    </SafeAreaView>
  );
}
