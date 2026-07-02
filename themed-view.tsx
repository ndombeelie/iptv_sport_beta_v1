import React from "react";
import { View, Text, Pressable, Image } from "react-native";
import { useColors } from "@/hooks/use-colors";

interface ChannelCardProps {
  name: string;
  logo?: string;
  quality?: "HD" | "FHD" | "4K";
  currentProgram?: string;
  onPress?: () => void;
  onFavoritePress?: () => void;
  isFavorite?: boolean;
}

export function ChannelCard({
  name,
  logo,
  quality = "HD",
  currentProgram,
  onPress,
  onFavoritePress,
  isFavorite,
}: ChannelCardProps) {
  const colors = useColors();

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        {
          backgroundColor: colors.surface,
          opacity: pressed ? 0.7 : 1,
        },
      ]}
      className="rounded-lg p-4 border border-border"
    >
      {/* Logo or Placeholder */}
      <View className="w-full h-24 bg-primary rounded-lg mb-3 items-center justify-center overflow-hidden">
        {logo ? (
          <Image
            source={{ uri: logo }}
            style={{ width: "100%", height: "100%" }}
            resizeMode="contain"
          />
        ) : (
          <Text className="text-2xl font-bold text-white">{name.charAt(0)}</Text>
        )}
      </View>

      {/* Channel Name */}
      <Text className="text-sm font-semibold text-foreground mb-1 text-center">{name}</Text>

      {/* Current Program */}
      {currentProgram && (
        <Text className="text-xs text-muted text-center mb-2 line-clamp-2">
          {currentProgram}
        </Text>
      )}

      {/* Quality Badge */}
      <View className="flex-row justify-between items-center mb-3">
        <View className="bg-warning px-2 py-1 rounded">
          <Text className="text-xs font-semibold text-background">{quality}</Text>
        </View>
        <Pressable onPress={onFavoritePress}>
          <Text className="text-lg">{isFavorite ? "❤️" : "🤍"}</Text>
        </Pressable>
      </View>

      {/* Play Button */}
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          {
            backgroundColor: colors.primary,
            opacity: pressed ? 0.8 : 1,
          },
        ]}
        className="py-2 rounded items-center"
      >
        <Text className="text-xs font-bold text-white">Regarder</Text>
      </Pressable>
    </Pressable>
  );
}
