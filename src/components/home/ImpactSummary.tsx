import { Card, CardContent } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { COMMUNITY_IMPACT } from "@/constants/home";
import { View } from "react-native";

export function ImpactSummary() {
  return (
    <Card className="mb-8 gap-0 overflow-hidden rounded-[22px] border-0 bg-primary p-0 shadow-none">
      <CardContent className="p-5">
        <View className="mb-4 flex-row items-center gap-2">
          <View className="h-7 w-7 items-center justify-center rounded-full bg-white/15">
            <Text className="text-lg font-bold text-[#DCEB8B]">↗</Text>
          </View>
          <Text className="text-[10px] font-bold tracking-[1.4px] text-[#D3DFD4]">
            COMMUNITY IMPACT
          </Text>
        </View>
        <Text className="text-[38px] font-extrabold tracking-[-1px] text-white">
          {COMMUNITY_IMPACT.amount}
        </Text>
        <Text className="mt-0.5 text-xs text-[#D3DFD4]">
          raised by our community so far
        </Text>
        <View className="mt-5 flex-row gap-9 border-t border-white/20 pt-4">
          <View className="gap-1">
            <Text className="text-lg font-extrabold text-white">
              {COMMUNITY_IMPACT.campaigns}
            </Text>
            <Text className="text-[11px] text-[#D3DFD4]">Campaigns</Text>
          </View>
          <View className="gap-1">
            <Text className="text-lg font-extrabold text-white">
              {COMMUNITY_IMPACT.supporters}
            </Text>
            <Text className="text-[11px] text-[#D3DFD4]">Supporters</Text>
          </View>
        </View>
      </CardContent>
    </Card>
  );
}
