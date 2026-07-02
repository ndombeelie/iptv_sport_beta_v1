import { ScrollView, Text, View, Pressable, FlatList } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";
import { useState } from "react";

type TournamentStage = "group" | "r32" | "r16" | "quarters" | "semis" | "final";

export default function MatchesScreen() {
  const colors = useColors();
  const [activeStage, setActiveStage] = useState<TournamentStage>("group");

  const stages: { id: TournamentStage; label: string }[] = [
    { id: "group", label: "Groupes" },
    { id: "r32", label: "32e" },
    { id: "r16", label: "16e" },
    { id: "quarters", label: "QF" },
    { id: "semis", label: "SF" },
    { id: "final", label: "Final" },
  ];

  const mockMatches = [
    { id: 1, date: "12 Juin", team1: "Mexique", team2: "Afrique du Sud", time: "15:00", score: null },
    { id: 2, date: "12 Juin", team1: "Canada", team2: "Bosnie", time: "18:00", score: null },
    { id: 3, date: "13 Juin", team1: "France", team2: "Allemagne", time: "15:00", score: null },
  ];

  return (
    <ScreenContainer className="p-0">
      {/* Header */}
      <View className="px-6 pt-6 pb-4">
        <Text className="text-3xl font-bold text-foreground">Matchs</Text>
      </View>

      {/* Tournament Stage Tabs */}
      <View className="px-6 pb-4">
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={stages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => setActiveStage(item.id)}
              style={({ pressed }) => [
                {
                  backgroundColor: activeStage === item.id ? colors.primary : colors.surface,
                  opacity: pressed ? 0.8 : 1,
                },
              ]}
              className="px-4 py-2 rounded-full mr-2 border border-border"
            >
              <Text
                className={`text-sm font-semibold ${
                  activeStage === item.id ? "text-white" : "text-foreground"
                }`}
              >
                {item.label}
              </Text>
            </Pressable>
          )}
        />
      </View>

      {/* Standings (for Group Stage) */}
      {activeStage === "group" && (
        <View className="px-6 pb-4">
          <Text className="text-lg font-semibold text-foreground mb-3">Classement - Groupe A</Text>
          <View className="bg-surface rounded-lg overflow-hidden border border-border">
            {/* Header Row */}
            <View className="flex-row bg-primary px-4 py-3">
              <Text className="flex-1 text-xs font-bold text-white">Équipe</Text>
              <Text className="w-8 text-xs font-bold text-white text-center">J</Text>
              <Text className="w-8 text-xs font-bold text-white text-center">G</Text>
              <Text className="w-8 text-xs font-bold text-white text-center">N</Text>
              <Text className="w-8 text-xs font-bold text-white text-center">P</Text>
              <Text className="w-12 text-xs font-bold text-white text-right">Pts</Text>
            </View>

            {/* Data Rows */}
            {[
              { team: "France", j: 3, g: 3, n: 0, p: 0, pts: 9 },
              { team: "Allemagne", j: 3, g: 2, n: 1, p: 0, pts: 7 },
              { team: "Belgique", j: 3, g: 1, n: 0, p: 2, pts: 3 },
              { team: "Pays-Bas", j: 3, g: 0, n: 0, p: 3, pts: 0 },
            ].map((row, idx) => (
              <View key={idx} className="flex-row px-4 py-3 border-t border-border">
                <Text className="flex-1 text-sm font-medium text-foreground">{row.team}</Text>
                <Text className="w-8 text-sm text-muted text-center">{row.j}</Text>
                <Text className="w-8 text-sm text-muted text-center">{row.g}</Text>
                <Text className="w-8 text-sm text-muted text-center">{row.n}</Text>
                <Text className="w-8 text-sm text-muted text-center">{row.p}</Text>
                <Text className="w-12 text-sm font-semibold text-primary text-right">{row.pts}</Text>
              </View>
            ))}
          </View>
        </View>
      )}

      {/* Matches List */}
      <View className="flex-1 px-6">
        <Text className="text-lg font-semibold text-foreground mb-3">Matchs</Text>
        <ScrollView showsVerticalScrollIndicator={false}>
          {mockMatches.map((match) => (
            <Pressable
              key={match.id}
              style={({ pressed }) => [
                {
                  backgroundColor: colors.surface,
                  opacity: pressed ? 0.7 : 1,
                },
              ]}
              className="rounded-lg p-4 mb-3 border border-border"
            >
              <Text className="text-xs text-muted mb-2">{match.date}</Text>
              <View className="flex-row justify-between items-center">
                <View className="flex-1">
                  <Text className="text-sm font-semibold text-foreground mb-2">{match.team1}</Text>
                  <Text className="text-sm font-semibold text-foreground">{match.team2}</Text>
                </View>
                <View className="items-end">
                  <Text className="text-xs text-muted mb-2">{match.time}</Text>
                  <View className="bg-primary px-3 py-1 rounded">
                    <Text className="text-xs font-bold text-white">Regarder</Text>
                  </View>
                </View>
              </View>
            </Pressable>
          ))}
        </ScrollView>
      </View>
    </ScreenContainer>
  );
}
