import { ScrollView, Text, View, Pressable, FlatList, TextInput } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";
import { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import { ChannelCard } from "@/components/channel-card";
import { fetchSportsChannels, searchChannels, getChannelGroups } from "@/lib/services/iptv-parser";
import { useFavorites } from "@/hooks/use-favorites";

export default function WatchScreen() {
  const colors = useColors();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("sports");
  const [channels, setChannels] = useState<any[]>([]);
  const [filteredChannels, setFilteredChannels] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { favoriteChannels, isFavoriteChannel, addFavoriteChannel, removeFavoriteChannel } =
    useFavorites();

  const categories = ["Sports", "Tous", "Favoris"];

  // Load channels on mount
  useEffect(() => {
    loadChannels();
  }, []);

  // Filter channels when search or category changes
  useEffect(() => {
    filterChannels();
  }, [searchQuery, selectedCategory, channels, favoriteChannels]);

  const loadChannels = async () => {
    try {
      setIsLoading(true);
      const sportChannels = await fetchSportsChannels();
      setChannels(sportChannels);
    } catch (error) {
      console.error("Error loading channels:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterChannels = () => {
    let filtered = channels;

    // Apply search filter
    if (searchQuery) {
      filtered = searchChannels(filtered, searchQuery);
    }

    // Apply category filter
    if (selectedCategory === "favoris") {
      filtered = filtered.filter((ch) => isFavoriteChannel(ch.id));
    }

    setFilteredChannels(filtered);
  };

  const handlePlayChannel = (channel: any) => {
    router.push({
      pathname: "/player",
      params: {
        channelName: channel.name,
        channelUrl: channel.url,
        channelLogo: channel.logo,
      },
    });
  };

  const handleToggleFavorite = (channel: any) => {
    if (isFavoriteChannel(channel.id)) {
      removeFavoriteChannel(channel.id);
    } else {
      addFavoriteChannel({
        id: channel.id,
        name: channel.name,
        url: channel.url,
      });
    }
  };

  return (
    <ScreenContainer className="p-0">
      {/* Header */}
      <View className="px-6 pt-6 pb-4">
        <Text className="text-3xl font-bold text-foreground">Regarder</Text>
      </View>

      {/* Search Bar */}
      <View className="px-6 pb-4">
        <View className="flex-row items-center bg-surface border border-border rounded-lg px-4 py-3">
          <Text className="text-muted mr-2">🔍</Text>
          <TextInput
            placeholder="Chercher une chaîne..."
            placeholderTextColor={colors.muted}
            value={searchQuery}
            onChangeText={setSearchQuery}
            className="flex-1 text-foreground"
          />
        </View>
      </View>

      {/* Category Filter */}
      <View className="px-6 pb-4">
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={categories}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => setSelectedCategory(item.toLowerCase())}
              style={({ pressed }) => [
                {
                  backgroundColor:
                    selectedCategory === item.toLowerCase() ? colors.primary : colors.surface,
                  opacity: pressed ? 0.8 : 1,
                },
              ]}
              className="px-4 py-2 rounded-full mr-2 border border-border"
            >
              <Text
                className={`text-sm font-semibold ${
                  selectedCategory === item.toLowerCase() ? "text-white" : "text-foreground"
                }`}
              >
                {item}
              </Text>
            </Pressable>
          )}
        />
      </View>

      {/* Channels Grid */}
      <View className="flex-1 px-6">
        {isLoading ? (
          <View className="flex-1 items-center justify-center">
            <Text className="text-muted">Chargement des chaînes...</Text>
          </View>
        ) : filteredChannels.length > 0 ? (
          <FlatList
            data={filteredChannels}
            keyExtractor={(item) => item.id}
            numColumns={2}
            columnWrapperStyle={{ gap: 12 }}
            scrollEnabled={false}
            renderItem={({ item }) => (
              <View className="flex-1">
                <ChannelCard
                  name={item.name}
                  logo={item.logo}
                  quality={item.quality}
                  onPress={() => handlePlayChannel(item)}
                  onFavoritePress={() => handleToggleFavorite(item)}
                  isFavorite={isFavoriteChannel(item.id)}
                />
              </View>
            )}
          />
        ) : (
          <View className="flex-1 items-center justify-center">
            <Text className="text-muted mb-2">Aucune chaîne trouvée</Text>
            <Text className="text-xs text-muted">
              {searchQuery ? "Essayez une autre recherche" : "Aucune chaîne disponible"}
            </Text>
          </View>
        )}
      </View>
    </ScreenContainer>
  );
}
