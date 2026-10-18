import { campaignPalette } from "@/components/campaign/campaign-config";
import { Text } from "@/components/ui/text";
import type { ReactNode } from "react";
import { View } from "react-native";

type CampaignFormFieldProps = {
  label: string;
  required?: boolean;
  error?: string;
  helperText?: string;
  children: ReactNode;
};

export function CampaignFormField({
  label,
  required = false,
  error,
  helperText,
  children,
}: CampaignFormFieldProps) {
  return (
    <View>
      <Text className="mb-2 text-sm font-semibold" style={{ color: "#334155" }}>
        {label}{required ? <Text style={{ color: campaignPalette.danger }}> *</Text> : null}
      </Text>
      {children}
      {error ? (
        <Text className="mt-1.5 text-xs" style={{ color: campaignPalette.danger }}>{error}</Text>
      ) : helperText ? (
        <Text className="mt-1.5 text-xs leading-4" style={{ color: campaignPalette.muted }}>{helperText}</Text>
      ) : null}
    </View>
  );
}
