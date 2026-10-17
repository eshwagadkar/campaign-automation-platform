import { Text } from '@/components/ui/text';
import type { CategoryFilter } from "@/constants/home";
import { CAMPAIGNS, FEATURED_CAMPAIGN } from '@/data/campaigns';
import { useMemo, useState } from 'react';
import { Alert, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CampaignCard } from './CampaignCard';
import { CategoryFilters } from './CategoryFilters';
import { CreateBanner } from './CreateBanner';
import { FeaturedCampaign } from './FeaturedCampaign';
import { HomeBottomNav } from './HomeBottomNav';
import { HomeHeader } from './HomeHeader';
import { ImpactSummary } from './ImpactSummary';
import { SectionHeading } from './SectionHeading';

export function HomeScreen() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>("All");
  const[savedCampaigns, setSavedCampaigns] = useState<string[]>([]);

 const visibleCampaigns = useMemo(() =>
      selectedCategory === "All"
        ? CAMPAIGNS.filter((campaign) => campaign.id !== FEATURED_CAMPAIGN.id)
        : CAMPAIGNS.filter(
            (campaign) =>
              campaign.category === selectedCategory &&
              campaign.id !== FEATURED_CAMPAIGN.id,
          ),
    [selectedCategory],
  );

  const toggleSaved = (id: string) => {
    setSavedCampaigns((current) =>
      current.includes(id)
        ? current.filter((savedId) => savedId !== id)
        : [...current, id],
    );
  };

  const showComingSoon = (flow: string) =>
    Alert.alert(flow, `${flow} will be available in a future update.`);

    return (
        <SafeAreaView edges={['top', 'left', 'right']} className='flex-1 bg-background'>
            <View className='flex-1'>
                <ScrollView 
                    showsVerticalScrollIndicator={false}
                    contentContainerClassName='px-5 pb-6 pt-3'
                >
                    <HomeHeader onProfilePress={() => showComingSoon('Profile')} />
                    <View className="mb-6">
                        <Text className="text-[31px] font-extrabold leading-[38px] tracking-[-1.1px] text-foreground">
                             Good things happen{"\n"}when we <Text className="text-primary">show up.</Text>
                        </Text>
                        <Text className="mt-2.5 max-w-[310px] text-sm leading-[22px] text-muted-foreground">
                             Discover campaigns worth believing in. Help good ideas reach further.
                        </Text>
                    </View>

                    <ImpactSummary />

                    <SectionHeading
                        title="Featured campaign"
                        subtitle="A story worth sharing"
                        trailing={
                        <View className="rounded-lg bg-secondary px-2.5 py-2">
                            <Text className="text-[9px] font-extrabold tracking-[0.6px] text-primary">
                            ✦ FEATURED
                            </Text>
                        </View>
                        }
                    />
                    <FeaturedCampaign
                        campaign={FEATURED_CAMPAIGN}
                        isSaved={savedCampaigns.includes(FEATURED_CAMPAIGN.id)}
                        onToggleSaved={() => toggleSaved(FEATURED_CAMPAIGN.id)}
                        onOpen={() => showComingSoon("Campaign details")}
                    />

                    <SectionHeading
                        title="Explore campaigns"
                        subtitle="Find a cause that moves you"
                    />

                    <CategoryFilters selected={selectedCategory} onSelect={setSelectedCategory} />
                    
                    {visibleCampaigns.length > 0 ? (
                        visibleCampaigns.map((campaign) => (
                        <CampaignCard
                            key={campaign.id}
                            campaign={campaign}
                            isSaved={savedCampaigns.includes(campaign.id)}
                            onToggleSaved={() => toggleSaved(campaign.id)}
                            onOpen={() => showComingSoon("Campaign details")}
                        />
                        ))
                    ) : (
                        <View className="mb-4 rounded-2xl border border-border bg-card p-5">
                        <Text className="font-semibold text-foreground">More campaigns coming soon</Text>
                        <Text className="mt-1 text-sm text-muted-foreground">
                            We don't have another campaign in this category yet.
                        </Text>
                        </View>
                    )}

                    <CreateBanner onPress={() => showComingSoon("Create campaign")} />
                    <Text className="mb-2 mt-5 text-center text-[10px] text-muted-foreground">
                        Demo content · Campaign figures are illustrative
                    </Text>
                </ScrollView>
                <HomeBottomNav onNavigate={showComingSoon} />
            </View>
        </SafeAreaView>
    )
}