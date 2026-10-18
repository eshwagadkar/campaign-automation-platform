import { CAMPAIGN_STEPS, campaignPalette } from "@/components/campaign/campaign-config";
import { CampaignStepIndicator } from "@/components/campaign/CampaignStepIndicator";
import { BasicsStep } from "@/components/campaign/steps/Basics";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { INITIAL_CAMPAIGN_DRAFT, type CampaignDraft, type CampaignFieldErrors } from "@/types/campaign";
import { useMemo, useState } from "react";
import { Alert, KeyboardAvoidingView, Platform, Pressable, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StoryStep } from "./steps/Story";

function ComingSoonStep({ step }: { step: number }) {
  const descriptions = [
    "Tell the story behind your campaign and the impact you want to make.",
    "Add campaign imagery and supporting visual details.",
    "Describe your audience and how you'll reach supporters.",
    "Review your campaign and set the fundraising goal before submission.",
  ];

  return (
    <View className="gap-3 rounded-2xl border bg-white p-5" style={{ borderColor: "#E2E8F0" }}>
      <Text className="text-xl font-bold" style={{ color: campaignPalette.ink }}>{CAMPAIGN_STEPS[step]}</Text>
      <Text className="text-sm leading-6" style={{ color: campaignPalette.muted }}>{descriptions[step - 1]}</Text>
      <Text className="text-sm" style={{ color: campaignPalette.muted }}>
        This step is a placeholder for now. Your Basics details remain in the wizard while we implement each step in order.
      </Text>
    </View>
  );
}

export function CampaignWizard() {
  const [step, setStep] = useState(0);
  const [draft, setDraft] = useState<CampaignDraft>(INITIAL_CAMPAIGN_DRAFT);
  const [showErrors, setShowErrors] = useState(false);

  const errors = useMemo<CampaignFieldErrors>(() => {
    if (!showErrors) return {};
     if (step === 0) {
      return {
        title: draft.title.trim() ? "" : "Enter a campaign title.",
        category: draft.category ? "" : "Choose a category.",
        organizer: draft.organizer.trim() ? "" : "Enter the person or organization behind this campaign.",
      };
    }
    if (step === 1) {
      return {
        shortDescription: draft.shortDescription.trim() ? "" : "Add a short campaign summary.",
        fullDescription: draft.fullDescription.trim() ? "" : "Tell the full story behind your campaign.",
      };
    }
    return {};
  }, [draft, showErrors, step]);

  const hasBasicsErrors = !draft.title.trim() || !draft.category || !draft.organizer.trim();

  const updateDraft = <K extends keyof CampaignDraft>(key: K, value: CampaignDraft[K]) => {
    setDraft((current) => ({ ...current, [key]: value }));
  };

  const continueStep = () => {
    if (step === 0) {
      setShowErrors(true);
      if (hasBasicsErrors) return;
    }
    if (step < CAMPAIGN_STEPS.length - 1) {
      setShowErrors(false);
      setStep((current) => current + 1);
      return;
    }
    Alert.alert("Ready for review", "The final review and submission behavior will be implemented in Step 5.");
  };

  const saveDraft = () => {
    Alert.alert(
      "Draft not saved permanently yet",
      "Your entries are preserved while this screen remains open. Persistent draft storage will be added next.",
    );
  };

  return (
    <SafeAreaView className="flex-1" edges={["top", "left", "right"]} style={{ backgroundColor: campaignPalette.canvas }}>
      <KeyboardAvoidingView className="flex-1" behavior={Platform.OS === "ios" ? "padding" : undefined}>
        <View className="border-b bg-white px-5 py-3" style={{ borderColor: "#E2E8F0" }}>
          <View className="flex-row items-center gap-2">
            <View className="h-8 w-8 items-center justify-center rounded-xl" style={{ backgroundColor: campaignPalette.primary }}>
              <Text className="font-bold" style={{ color: campaignPalette.white }}>✦</Text>
            </View>
            <View className="flex-1">
              <Text className="text-sm font-bold" style={{ color: campaignPalette.ink }}>Create a campaign</Text>
              <Text className="text-xs" style={{ color: campaignPalette.muted }}>Your idea, made actionable</Text>
            </View>
            <Pressable onPress={saveDraft} className="rounded-lg px-3 py-2" accessibilityRole="button">
              <Text className="text-xs font-semibold" style={{ color: campaignPalette.primary }}>Save draft</Text>
            </Pressable>
          </View>
        </View>

        <ScrollView
          className="flex-1"
          contentContainerClassName="gap-6 px-5 py-6"
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View className="gap-2">
            <Text className="text-xs font-semibold tracking-widest" style={{ color: campaignPalette.primary }}>✦ START YOUR JOURNEY</Text>
            <Text className="text-3xl font-bold tracking-tight" style={{ color: campaignPalette.ink }}>Let's build your big idea</Text>
          </View>
          <CampaignStepIndicator step={step} />
         {step === 1 ? (
            <Pressable
              onPress={() => Alert.alert(
                "Start over?",
                "This will clear all campaign details entered so far.",
                [
                  { text: "Cancel", style: "cancel" },
                  {
                    text: "Start over",
                    style: "destructive",
                    onPress: () => {
                      setDraft(INITIAL_CAMPAIGN_DRAFT);
                      setShowErrors(false);
                      setStep(0);
                    },
                  },
                ],
              )}
              className="self-start py-1"
              accessibilityRole="button"
            >
              <Text className="text-xs underline" style={{ color: campaignPalette.muted }}>Start over</Text>
            </Pressable>
          ) : null}
          {step === 0 ? (
            <BasicsStep draft={draft} onChange={updateDraft} errors={errors} />
          ) : step === 1 ? (
            <StoryStep draft={draft} onChange={updateDraft} errors={errors} />
          ) : (
            <ComingSoonStep step={step} />
          )}
        </ScrollView>

        <View className="flex-row items-center gap-3 border-t bg-white px-5 py-3" style={{ borderColor: "#E2E8F0" }}>
          <Button
            variant="outline"
            className="flex-1"
            disabled={step === 0}
            onPress={() => {
              setShowErrors(false);
              setStep((current) => Math.max(0, current - 1));
            }}
          >
            <Text>Back</Text>
          </Button>
          <Button variant="outline" className="flex-1" onPress={saveDraft}>
            <Text>Save draft</Text>
          </Button>
          <Button className="flex-[1.2]" onPress={continueStep}>
            <Text>{step === CAMPAIGN_STEPS.length - 1 ? "Review" : "Continue  →"}</Text>
          </Button>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
