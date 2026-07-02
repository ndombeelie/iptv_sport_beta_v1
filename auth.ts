import { useState, useEffect, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface FavoriteMatch {
  id: string;
  team1: string;
  team2: string;
  date: string;
  time: string;
}

interface FavoriteChannel {
  id: string;
  name: string;
  url: string;
}

const FAVORITES_MATCHES_KEY = "@mondiali/favorites_matches";
const FAVORITES_CHANNELS_KEY = "@mondiali/favorites_channels";

export function useFavorites() {
  const [favoriteMatches, setFavoriteMatches] = useState<FavoriteMatch[]>([]);
  const [favoriteChannels, setFavoriteChannels] = useState<FavoriteChannel[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load favorites from storage on mount
  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      setIsLoading(true);
      const [matchesData, channelsData] = await Promise.all([
        AsyncStorage.getItem(FAVORITES_MATCHES_KEY),
        AsyncStorage.getItem(FAVORITES_CHANNELS_KEY),
      ]);

      if (matchesData) {
        setFavoriteMatches(JSON.parse(matchesData));
      }
      if (channelsData) {
        setFavoriteChannels(JSON.parse(channelsData));
      }
    } catch (error) {
      console.error("Error loading favorites:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const addFavoriteMatch = useCallback(async (match: FavoriteMatch) => {
    try {
      const updated = [...favoriteMatches, match];
      setFavoriteMatches(updated);
      await AsyncStorage.setItem(FAVORITES_MATCHES_KEY, JSON.stringify(updated));
    } catch (error) {
      console.error("Error adding favorite match:", error);
    }
  }, [favoriteMatches]);

  const removeFavoriteMatch = useCallback(async (matchId: string) => {
    try {
      const updated = favoriteMatches.filter((m) => m.id !== matchId);
      setFavoriteMatches(updated);
      await AsyncStorage.setItem(FAVORITES_MATCHES_KEY, JSON.stringify(updated));
    } catch (error) {
      console.error("Error removing favorite match:", error);
    }
  }, [favoriteMatches]);

  const isFavoriteMatch = useCallback(
    (matchId: string) => {
      return favoriteMatches.some((m) => m.id === matchId);
    },
    [favoriteMatches]
  );

  const addFavoriteChannel = useCallback(async (channel: FavoriteChannel) => {
    try {
      const updated = [...favoriteChannels, channel];
      setFavoriteChannels(updated);
      await AsyncStorage.setItem(FAVORITES_CHANNELS_KEY, JSON.stringify(updated));
    } catch (error) {
      console.error("Error adding favorite channel:", error);
    }
  }, [favoriteChannels]);

  const removeFavoriteChannel = useCallback(async (channelId: string) => {
    try {
      const updated = favoriteChannels.filter((c) => c.id !== channelId);
      setFavoriteChannels(updated);
      await AsyncStorage.setItem(FAVORITES_CHANNELS_KEY, JSON.stringify(updated));
    } catch (error) {
      console.error("Error removing favorite channel:", error);
    }
  }, [favoriteChannels]);

  const isFavoriteChannel = useCallback(
    (channelId: string) => {
      return favoriteChannels.some((c) => c.id === channelId);
    },
    [favoriteChannels]
  );

  return {
    favoriteMatches,
    favoriteChannels,
    isLoading,
    addFavoriteMatch,
    removeFavoriteMatch,
    isFavoriteMatch,
    addFavoriteChannel,
    removeFavoriteChannel,
    isFavoriteChannel,
  };
}
