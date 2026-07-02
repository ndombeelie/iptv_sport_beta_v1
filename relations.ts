import React, { useState, useRef, useEffect } from "react";
import { View, Pressable, Text, ActivityIndicator } from "react-native";
import { VideoView, useVideoPlayer } from "expo-video";
import { useColors } from "@/hooks/use-colors";

interface VideoPlayerProps {
  uri: string;
  title?: string;
  onError?: (error: Error) => void;
  autoPlay?: boolean;
}

export function VideoPlayer({ uri, title, onError, autoPlay = true }: VideoPlayerProps) {
  const colors = useColors();
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [showControls, setShowControls] = useState(true);
  const [selectedQuality, setSelectedQuality] = useState("auto");
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const player = useVideoPlayer(uri);

  useEffect(() => {
    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, []);

  const handlePlayPause = () => {
    if (isPlaying) {
      player.pause();
    } else {
      player.play();
    }
    setIsPlaying(!isPlaying);
    resetControlsTimeout();
  };

  const resetControlsTimeout = () => {
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current as NodeJS.Timeout);
    }
    setShowControls(true);
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false);
      }
    }, 3000) as unknown as NodeJS.Timeout;
  };

  const handleVideoTap = () => {
    setShowControls(!showControls);
    resetControlsTimeout();
  };

  return (
    <View className="bg-background rounded-lg overflow-hidden">
      {/* Video Container */}
      <Pressable onPress={handleVideoTap} className="bg-black aspect-video">
        <VideoView
          player={player}
          style={{ width: "100%", height: "100%" }}
          nativeControls={false}
        />

        {/* Loading Indicator */}
        {!isPlaying && (
          <View className="absolute inset-0 items-center justify-center bg-black/50">
            <Pressable
              onPress={handlePlayPause}
              className="w-16 h-16 rounded-full bg-primary items-center justify-center"
            >
              <Text className="text-2xl">▶</Text>
            </Pressable>
          </View>
        )}

        {/* Controls Overlay */}
        {showControls && (
          <View className="absolute inset-0 bg-black/30 flex-col justify-between p-4">
            {/* Top Bar */}
            <View className="flex-row justify-between items-center">
              <Text className="text-white font-semibold text-sm flex-1">{title || "Stream"}</Text>
              <View className="bg-primary px-2 py-1 rounded">
                <Text className="text-white text-xs font-bold">{selectedQuality}</Text>
              </View>
            </View>

            {/* Bottom Controls */}
            <View className="flex-row items-center gap-3">
              <Pressable
                onPress={handlePlayPause}
                className="bg-primary px-4 py-2 rounded-lg flex-row items-center gap-2"
              >
                <Text className="text-xl">{isPlaying ? "⏸" : "▶"}</Text>
                <Text className="text-white font-semibold">
                  {isPlaying ? "Pause" : "Lecture"}
                </Text>
              </Pressable>

              {/* Quality Selector */}
              <View className="flex-row gap-2 flex-1 justify-end">
                {["auto", "HD", "FHD"].map((q) => (
                  <Pressable
                    key={q}
                    onPress={() => setSelectedQuality(q)}
                    style={({ pressed }) => [
                      {
                        backgroundColor:
                          selectedQuality === q ? colors.primary : "rgba(255,255,255,0.2)",
                        opacity: pressed ? 0.8 : 1,
                      },
                    ]}
                    className="px-2 py-1 rounded"
                  >
                    <Text className="text-white text-xs font-semibold">{q}</Text>
                  </Pressable>
                ))}
              </View>
            </View>
          </View>
        )}
      </Pressable>

      {/* Info Bar */}
      <View className="bg-surface p-3 border-t border-border">
        <Text className="text-sm text-foreground font-medium">{title}</Text>
        <Text className="text-xs text-muted mt-1">Qualité: {selectedQuality}</Text>
      </View>
    </View>
  );
}
