import React from "react";
import { View, Text, Pressable } from "react-native";
import { useColors } from "@/hooks/use-colors";

interface MatchCardProps {
  team1: string;
  team2: string;
  date: string;
  time: string;
  score?: { team1: number; team2: number };
  status: "scheduled" | "live" | "finished";
  onPress?: () => void;
  onWatchPress?: () => void;
  isFavorite?: boolean;
  onFavoritePress?: () => void;
}

export function MatchCard({
  team1,
  team2,
  date,
  time,
  score,
  status,
  onPress,
  onWatchPress,
  isFavorite,
  onFavoritePress,
}: MatchCardProps) {
  const colors = useColors();

  const getStatusColor = () => {
    switch (status) {
      case "live":
        return colors.primary;
      case "finished":
        return colors.muted;
      default:
        return colors.border;
    }
  };

  const getStatusLabel = () => {
    switch (status) {
      case "live":
        return "EN DIRECT";
      case "finished":
        return "TERMINÉ";
      default:
        return "À VENIR";
    }
  };

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        {
          backgroundColor: colors.surface,
          opacity: pressed ? 0.7 : 1,
        },
      ]}
      className="rounded-lg p-4 border border-border mb-3"
    >
      {/* Header with Status */}
      <View className="flex-row justify-between items-center mb-3">
        <Text className="text-xs font-semibold text-muted">{date}</Text>
        <View
          style={{ backgroundColor: getStatusColor() }}
          className="px-2 py-1 rounded-full"
        >
          <Text className="text-xs font-bold text-white">{getStatusLabel()}</Text>
        </View>
      </View>

      {/* Teams and Score */}
      <View className="flex-row justify-between items-center mb-3">
        <View className="flex-1">
          <Text className="text-sm font-semibold text-foreground mb-2">{team1}</Text>
          <Text className="text-sm font-semibold text-foreground">{team2}</Text>
        </View>

        {/* Score or Time */}
        <View className="items-end">
          {score && status !== "scheduled" ? (
            <>
              <Text className="text-2xl font-bold text-primary mb-1">
                {score.team1}-{score.team2}
              </Text>
              {status === "live" && (
                <Text className="text-xs font-semibold text-primary">EN DIRECT</Text>
              )}
            </>
          ) : (
            <>
              <Text className="text-lg font-semibold text-foreground">{time}</Text>
              <Text className="text-xs text-muted mt-1">Heure locale</Text>
            </>
          )}
        </View>
      </View>

      {/* Action Buttons */}
      <View className="flex-row gap-2 pt-3 border-t border-border">
        <Pressable
          onPress={onWatchPress}
          style={({ pressed }) => [
            {
              backgroundColor: colors.primary,
              opacity: pressed ? 0.8 : 1,
              flex: 1,
            },
          ]}
          className="py-2 rounded items-center"
        >
          <Text className="text-xs font-bold text-white">Regarder</Text>
        </Pressable>

        <Pressable
          onPress={onFavoritePress}
          style={({ pressed }) => [
            {
              backgroundColor: isFavorite ? colors.warning : colors.border,
              opacity: pressed ? 0.8 : 1,
            },
          ]}
          className="px-3 py-2 rounded items-center"
        >
          <Text className="text-lg">{isFavorite ? "❤️" : "🤍"}</Text>
        </Pressable>
      </View>
    </Pressable>
  );
}
