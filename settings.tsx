import { ScrollView, Text, View, RefreshControl, FlatList } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";
import { useState, useEffect } from "react";
import { MatchCard } from "@/components/match-card";
import { ChannelCard } from "@/components/channel-card";
import { fetchLiveMatches, fetchUpcomingMatches } from "@/lib/services/worldcup-api";
import { fetchSportsChannels } from "@/lib/services/iptv-parser";
import { useFavorites } from "@/hooks/use-favorites";

export default function HomeScreen() {
  const colors = useColors();
  const [refreshing, setRefreshing] = useState(false);
  const [liveMatches, setLiveMatches] = useState<any[]>([]);
  const [upcomingMatches, setUpcomingMatches] = useState<any[]>([]);
  const [channels, setChannels] = useState<any[]>([]);
  const { isFavoriteMatch, addFavoriteMatch, removeFavoriteMatch } = useFavorites();

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      const [live, upcoming, sportChannels] = await Promise.all([
        fetchLiveMatches(),
        fetchUpcomingMatches(5),
        fetchSportsChannels(),
      ]);
      setLiveMatches(live);
      setUpcomingMatches(upcoming);
      setChannels(sportChannels.slice(0, 3));
    } catch (error) {
      console.error("Error refreshing data:", error);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    onRefresh();
  }, []);

  return (
    <ScreenContainer className="p-0">
      <ScrollView
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        {/* Header */}
        <View className="px-6 pt-6 pb-4">
          <Text className="text-4xl font-bold text-foreground">Mondiali</Text>
          <Text className="text-sm text-muted mt-1">Coupe du Monde 2026</Text>
        </View>

        {/* Live Matches Section */}
        <View className="px-6 py-4">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-xl font-semibold text-foreground">Matchs en Direct</Text>
            <View className="bg-primary px-3 py-1 rounded-full">
              <Text className="text-xs font-semibold text-white">LIVE</Text>
            </View>
          </View>

          {liveMatches.length > 0 ? (
            <View className="gap-3">
              {liveMatches.map((match) => (
                <MatchCard
                  key={match.id}
                  team1={match.team1}
                  team2={match.team2}
                  date={match.date}
                  time={match.time}
                  score={match.score}
                  status={match.status}
                  isFavorite={isFavoriteMatch(match.id)}
                  onFavoritePress={() =>
                    isFavoriteMatch(match.id)
                      ? removeFavoriteMatch(match.id)
                      : addFavoriteMatch({
                          id: match.id,
                          team1: match.team1,
                          team2: match.team2,
                          date: match.date,
                          time: match.time,
                        })
                  }
                />
              ))}
            </View>
          ) : (
            <View className="bg-surface rounded-xl p-6 items-center">
              <Text className="text-sm text-muted">Aucun match en direct pour le moment</Text>
            </View>
          )}
        </View>

        {/* Upcoming Matches Section */}
        <View className="px-6 py-4">
          <Text className="text-xl font-semibold text-foreground mb-4">Prochains Matchs</Text>

          {upcomingMatches.length > 0 ? (
            <View className="gap-3">
              {upcomingMatches.map((match) => (
                <MatchCard
                  key={match.id}
                  team1={match.team1}
                  team2={match.team2}
                  date={match.date}
                  time={match.time}
                  status={match.status}
                  isFavorite={isFavoriteMatch(match.id)}
                  onFavoritePress={() =>
                    isFavoriteMatch(match.id)
                      ? removeFavoriteMatch(match.id)
                      : addFavoriteMatch({
                          id: match.id,
                          team1: match.team1,
                          team2: match.team2,
                          date: match.date,
                          time: match.time,
                        })
                  }
                />
              ))}
            </View>
          ) : (
            <View className="bg-surface rounded-xl p-6 items-center">
              <Text className="text-sm text-muted">Chargement des matchs...</Text>
            </View>
          )}
        </View>

        {/* Featured Channels Section */}
        <View className="px-6 py-4 pb-8">
          <Text className="text-xl font-semibold text-foreground mb-4">Chaînes Populaires</Text>
          {channels.length > 0 ? (
            <FlatList
              data={channels}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              scrollEnabled={false}
              renderItem={({ item }) => (
                <View className="mr-3 w-40">
                  <ChannelCard
                    name={item.name}
                    logo={item.logo}
                    quality={item.quality}
                    onPress={() => console.log("Play channel:", item.name)}
                  />
                </View>
              )}
            />
          ) : (
            <View className="bg-surface rounded-xl p-6 items-center">
              <Text className="text-sm text-muted">Chargement des chaînes...</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
