import { ScrollView, Text, View, Pressable, FlatList } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";
import { useState } from "react";

type TabType = "matches" | "channels";

export default function FavoritesScreen() {
  const colors = useColors();
  const [activeTab, setActiveTab] = useState<TabType>("matches");

  const favoriteMatches = [
    { id: 1, date: "14 Juin", team1: "France", team2: "Allemagne", time: "15:00" },
    { id: 2, date: "15 Juin", team1: "Brésil", team2: "Argentine", time: "18:00" },
  ];

  const favoriteChannels = [
    { id: 1, name: "ESPN", quality: "HD" },
    { id: 2, name: "beIN Sports", quality: "FHD" },
    { id: 3, name: "Sky Sports", quality: "HD" },
  ];

  return (
    <ScreenContainer className="p-0">
      <View className="px-6 pt-6 pb-4">
        <Text className="text-3xl font-bold text-foreground">Favoris</Text>
      </View>

      <View className="px-6 pb-4 flex-row gap-3">
        <Pressable
          onPress={() => setActiveTab("matches")}
          style={({ pressed }) => [
            {
              backgroundColor: activeTab === "matches" ? colors.primary : colors.surface,
              opacity: pressed ? 0.8 : 1,
              flex: 1,
            },
          ]}
          className="py-3 rounded-lg border border-border items-center"
        >
          <Text
            className={`text-sm font-semibold ${
              activeTab === "matches" ? "text-white" : "text-foreground"
            }`}
          >
            Matchs
          </Text>
        </Pressable>

        <Pressable
          onPress={() => setActiveTab("channels")}
          style={({ pressed }) => [
            {
              backgroundColor: activeTab === "channels" ? colors.primary : colors.surface,
              opacity: pressed ? 0.8 : 1,
              flex: 1,
            },
          ]}
          className="py-3 rounded-lg border border-border items-center"
        >
          <Text
            className={`text-sm font-semibold ${
              activeTab === "channels" ? "text-white" : "text-foreground"
            }`}
          >
            Chaînes
          </Text>
        </Pressable>
      </View>

      <View className="flex-1 px-6">
        {activeTab === "matches" ? (
          favoriteMatches.length > 0 ? (
            <FlatList
              data={favoriteMatches}
              keyExtractor={(item) => item.id.toString()}
              scrollEnabled={false}
              renderItem={({ item }) => (
                <Pressable
                  style={({ pressed }) => [
                    {
                      backgroundColor: colors.surface,
                      opacity: pressed ? 0.7 : 1,
                    },
                  ]}
                  className="rounded-lg p-4 mb-3 border border-border"
                >
                  <Text className="text-xs text-muted mb-2">{item.date}</Text>
                  <View className="flex-row justify-between items-center">
                    <View className="flex-1">
                      <Text className="text-sm font-semibold text-foreground mb-2">
                        {item.team1}
                      </Text>
                      <Text className="text-sm font-semibold text-foreground">{item.team2}</Text>
                    </View>
                    <View className="items-end">
                      <Text className="text-xs text-muted mb-2">{item.time}</Text>
                      <View className="bg-primary px-3 py-1 rounded">
                        <Text className="text-xs font-bold text-white">Regarder</Text>
                      </View>
                    </View>
                  </View>
                </Pressable>
              )}
            />
          ) : (
            <View className="flex-1 items-center justify-center">
              <Text className="text-muted mb-2">Aucun match favori</Text>
              <Text className="text-xs text-muted">Ajoutez des matchs à vos favoris</Text>
            </View>
          )
        ) : favoriteChannels.length > 0 ? (
          <FlatList
            data={favoriteChannels}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            columnWrapperStyle={{ gap: 12 }}
            scrollEnabled={false}
            renderItem={({ item }) => (
              <Pressable
                style={({ pressed }) => [
                  {
                    backgroundColor: colors.surface,
                    opacity: pressed ? 0.7 : 1,
                    flex: 1,
                  },
                ]}
                className="rounded-lg p-4 border border-border items-center justify-center aspect-square"
              >
                <View className="w-16 h-16 bg-primary rounded-lg mb-3" />
                <Text className="text-sm font-semibold text-foreground text-center mb-1">
                  {item.name}
                </Text>
                <View className="bg-warning px-2 py-1 rounded mt-2">
                  <Text className="text-xs font-semibold text-background">{item.quality}</Text>
                </View>
              </Pressable>
            )}
          />
        ) : (
          <View className="flex-1 items-center justify-center">
            <Text className="text-muted mb-2">Aucune chaîne favorite</Text>
            <Text className="text-xs text-muted">Ajoutez des chaînes à vos favoris</Text>
          </View>
        )}
      </View>
    </ScreenContainer>
  );
}
