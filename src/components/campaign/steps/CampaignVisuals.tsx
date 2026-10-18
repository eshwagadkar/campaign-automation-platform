import { CampaignFormField } from "@/components/campaign/CampaignFormField";
import { campaignPalette } from "@/components/campaign/campaign-config";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import type { CampaignDraft, CampaignFieldErrors } from "@/types/campaign";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { Alert, Image, Pressable, TextInput, View } from "react-native";

type CampaignVisualsStepProps = {
  draft: CampaignDraft;
  onChange: <K extends keyof CampaignDraft>(key: K, value: CampaignDraft[K]) => void;
  errors: CampaignFieldErrors;
};

const MAX_IMAGE_SIZE = 3 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

export function CampaignVisualsStep({ draft, onChange, errors }: CampaignVisualsStepProps) {
  const [isPicking, setIsPicking] = useState(false);

  const pickImages = async (multiple = false, target: "cover" | "slideshow" | "ad" = "cover") => {
    try {
      setIsPicking(true);
      const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permission.granted) {
        Alert.alert("Photo access needed", "Allow photo library access to choose campaign images.");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: !multiple,
        aspect: multiple ? undefined : [16, 9],
        quality: 0.85,
        allowsMultipleSelection: multiple,
        selectionLimit: multiple ? 8 : 1,
      });
      if (result.canceled) return;

      const assets = result.assets ?? [];
      const invalidType = assets.find((asset) => asset.mimeType && !ACCEPTED_IMAGE_TYPES.includes(asset.mimeType));
      const oversized = assets.find((asset) => typeof asset.fileSize === "number" && asset.fileSize > MAX_IMAGE_SIZE);
      if (invalidType) {
        Alert.alert("Unsupported image", "Choose a JPG, PNG or WebP image.");
        return;
      }
      if (oversized) {
        Alert.alert("Image too large", "Each image must be 3 MB or smaller. Choose a smaller image.");
        return;
      }

      if (target === "cover" && assets[0]) {
        onChange("coverImageUri", assets[0].uri);
        onChange("coverImageName", assets[0].fileName ?? "Campaign cover image");
      } else if (target === "ad" && assets[0]) {
        onChange("adImageUri", assets[0].uri);
      } else if (target === "slideshow") {
        const selectedUris = assets.map((asset) => asset.uri);
        onChange("slideshowImageUris", Array.from(new Set([...draft.slideshowImageUris, ...selectedUris])).slice(0, 8));
      }
    } catch {
      Alert.alert("Couldn't open photos", "Please try selecting your image again.");
    } finally {
      setIsPicking(false);
    }
  };

  const CheckboxRow = ({ checked, onPress, title, description }: { checked: boolean; onPress: () => void; title: string; description: string }) => (
    <Pressable
      onPress={onPress}
      accessibilityRole="checkbox"
      accessibilityState={{ checked }}
      className="flex-row items-start gap-3 rounded-xl border p-3"
      style={{ borderColor: checked ? campaignPalette.primary : "#CBD5E1", backgroundColor: checked ? campaignPalette.primarySoft : "#F8FAFC" }}
    >
      <View className="mt-0.5 h-5 w-5 items-center justify-center rounded border" style={{ borderColor: checked ? campaignPalette.primary : "#94A3B8", backgroundColor: checked ? campaignPalette.primary : "#FFFFFF" }}>
        {checked ? <Text className="text-xs font-bold" style={{ color: "#FFFFFF" }}>✓</Text> : null}
      </View>
      <View className="flex-1 gap-1">
        <Text className="text-sm font-semibold" style={{ color: campaignPalette.ink }}>{title}</Text>
        <Text className="text-xs leading-4" style={{ color: campaignPalette.muted }}>{description}</Text>
      </View>
    </Pressable>
  );

  const inputClassName = "rounded-xl border px-3 py-3 text-sm";
  const inputStyle = { borderColor: campaignPalette.border, backgroundColor: "#FFFFFF", color: campaignPalette.ink };

  return (
    <View className="gap-6 rounded-2xl border bg-white p-4" style={{ borderColor: "#E2E8F0" }}>
      <View className="gap-1 border-b pb-4" style={{ borderColor: "#E2E8F0" }}>
        <Text className="text-lg font-bold" style={{ color: campaignPalette.ink }}>Campaign visuals</Text>
        <Text className="text-sm leading-5" style={{ color: campaignPalette.muted }}>These visuals appear on your campaign page — this is what backers see.</Text>
      </View>

      <CampaignFormField label="Campaign cover image" required error={errors.coverImageUri} helperText="JPG, PNG or WebP · maximum 3 MB. Landscape images work best.">
        {draft.coverImageUri ? (
          <View className="gap-3">
            <Image source={{ uri: draft.coverImageUri }} resizeMode="cover" className="h-48 w-full rounded-xl" accessibilityLabel="Campaign cover preview" />
            <Text className="text-xs" style={{ color: campaignPalette.muted }} numberOfLines={1}>{draft.coverImageName || "Campaign cover image"}</Text>
            <View className="flex-row gap-2">
              <Button variant="outline" className="flex-1" onPress={() => void pickImages(false, "cover")} disabled={isPicking}><Text>Replace image</Text></Button>
              <Button variant="outline" onPress={() => { onChange("coverImageUri", ""); onChange("coverImageName", ""); }}><Text>Remove</Text></Button>
            </View>
          </View>
        ) : (
          <Pressable
            onPress={() => void pickImages(false, "cover")}
            disabled={isPicking}
            accessibilityRole="button"
            className="min-h-36 items-center justify-center gap-2 rounded-xl border border-dashed p-5"
            style={{ borderColor: "#A5B4FC", backgroundColor: "#F8FAFC" }}
          >
            <Text className="text-2xl" style={{ color: campaignPalette.primary }}>⇧</Text>
            <Text className="text-sm font-semibold" style={{ color: campaignPalette.ink }}>{isPicking ? "Opening photos…" : "Tap to choose a cover image"}</Text>
            <Text className="text-xs text-center" style={{ color: campaignPalette.muted }}>Choose from your photo library · JPG, PNG or WebP</Text>
          </Pressable>
        )}
        <Button variant="outline" className="self-start" onPress={() => Alert.alert("AI image generation", "AI cover generation will be available when an image-generation service is connected.")}>
          <Text>✦ Generate with AI</Text>
        </Button>
      </CampaignFormField>

      <View className="gap-3 border-t pt-5" style={{ borderColor: "#E2E8F0" }}>
        <View className="flex-row items-start gap-3">
          <View className="h-10 w-10 items-center justify-center rounded-xl" style={{ backgroundColor: "#FFF7ED" }}><Text style={{ color: "#C2410C" }}>▣</Text></View>
          <View className="flex-1 gap-1">
            <Text className="text-base font-bold" style={{ color: campaignPalette.ink }}>Campaign slideshow</Text>
            <Text className="text-sm leading-5" style={{ color: campaignPalette.muted }}>Show a carousel at the top of your campaign page instead of a single image.</Text>
          </View>
        </View>
        <CheckboxRow checked={draft.useSlideshow} onPress={() => onChange("useSlideshow", !draft.useSlideshow)} title="Add a campaign slideshow" description="Your cover image will be the first slide. Add up to 8 additional images." />
        {draft.useSlideshow ? (
          <View className="gap-3 rounded-xl border p-3" style={{ borderColor: "#E2E8F0" }}>
            {draft.slideshowImageUris.length > 0 ? (
              <View className="flex-row flex-wrap gap-2">
                {draft.slideshowImageUris.map((uri) => (
                  <View key={uri} className="relative">
                    <Image source={{ uri }} className="h-20 w-20 rounded-lg" />
                    <Pressable onPress={() => onChange("slideshowImageUris", draft.slideshowImageUris.filter((item) => item !== uri))} className="absolute right-1 top-1 h-6 w-6 items-center justify-center rounded-full" style={{ backgroundColor: "#0F172A" }} accessibilityLabel="Remove slideshow image" accessibilityRole="button"><Text style={{ color: "#FFFFFF" }}>×</Text></Pressable>
                  </View>
                ))}
              </View>
            ) : <Text className="text-xs" style={{ color: campaignPalette.muted }}>No additional slides selected yet.</Text>}
            <Button variant="outline" onPress={() => void pickImages(true, "slideshow")} disabled={isPicking || draft.slideshowImageUris.length >= 8}><Text>Add slideshow images</Text></Button>
          </View>
        ) : null}
      </View>

      <View className="gap-3 border-t pt-5" style={{ borderColor: "#E2E8F0" }}>
        <View className="flex-row items-start gap-3">
          <View className="h-10 w-10 items-center justify-center rounded-xl" style={{ backgroundColor: "#EEF2FF" }}><Text style={{ color: campaignPalette.primary }}>◉</Text></View>
          <View className="flex-1 gap-1">
            <Text className="text-base font-bold" style={{ color: campaignPalette.ink }}>Ad visuals</Text>
            <Text className="text-sm leading-5" style={{ color: campaignPalette.muted }}>By default, ads reuse your campaign image and text. Customize them only if the ad needs its own creative.</Text>
          </View>
        </View>
        <View className="rounded-lg p-3" style={{ backgroundColor: campaignPalette.primarySoft }}>
          <Text className="text-xs leading-4" style={{ color: campaignPalette.primary }}>These are what people see in the ad and on the page it opens.</Text>
        </View>
        <CheckboxRow checked={draft.useCustomAdVisuals} onPress={() => onChange("useCustomAdVisuals", !draft.useCustomAdVisuals)} title="Give the ad its own image and text" description="When off, the ad reuses your campaign visuals." />
        {draft.useCustomAdVisuals ? (
          <View className="gap-4 rounded-xl border p-3" style={{ borderColor: "#E2E8F0" }}>
            <CampaignFormField label="Ad headline" helperText="Optional. Keep it clear and specific.">
              <TextInput value={draft.adHeadline} onChangeText={(value) => onChange("adHeadline", value)} placeholder="A short headline for your ad" className={inputClassName} style={inputStyle} maxLength={60} />
            </CampaignFormField>
            <CampaignFormField label="Ad text" helperText="Optional supporting copy for the ad.">
              <TextInput value={draft.adDescription} onChangeText={(value) => onChange("adDescription", value)} placeholder="What should people know?" multiline textAlignVertical="top" className={`${inputClassName} min-h-24`} style={inputStyle} />
            </CampaignFormField>
            <CampaignFormField label="Ad image" helperText="Optional. JPG, PNG or WebP, up to 3 MB.">
              {draft.adImageUri ? <Image source={{ uri: draft.adImageUri }} className="h-36 w-full rounded-xl" resizeMode="cover" /> : null}
              <Button variant="outline" onPress={() => void pickImages(false, "ad")} disabled={isPicking}><Text>{draft.adImageUri ? "Replace ad image" : "Choose ad image"}</Text></Button>
              {draft.adImageUri ? <Button variant="ghost" onPress={() => onChange("adImageUri", "")}><Text>Remove ad image</Text></Button> : null}
            </CampaignFormField>
          </View>
        ) : null}
      </View>

      <View className="rounded-xl border p-3" style={{ borderColor: "#E2E8F0", backgroundColor: "#F8FAFC" }}>
        <Text className="text-xs leading-5" style={{ color: campaignPalette.muted }}>Your ad should link to your campaign page. Actual ad delivery and review require a connected advertising platform.</Text>
      </View>
    </View>
  );
}
