import { ScrollView, Text, View, Pressable, Switch } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";
import { useState } from "react";
import { useColorScheme } from "@/hooks/use-color-scheme";

export default function SettingsScreen() {
  const colors = useColors();
  const colorScheme = useColorScheme();
  const [notifications, setNotifications] = useState(true);
  const [autoplay, setAutoplay] = useState(true);
  const [theme, setTheme] = useState<"light" | "dark" | "auto">(colorScheme ?? "auto");

  const qualityOptions = ["Auto", "HD", "FHD"];
  const [defaultQuality, setDefaultQuality] = useState("Auto");

  const SettingRow = ({
    label,
    value,
    onPress,
  }: {
    label: string;
    value?: string;
    onPress?: () => void;
  }) => (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        {
          backgroundColor: colors.surface,
          opacity: pressed ? 0.7 : 1,
        },
      ]}
      className="flex-row justify-between items-center px-4 py-4 border-b border-border"
    >
      <Text className="text-base font-medium text-foreground">{label}</Text>
      {value && <Text className="text-sm text-muted">{value}</Text>}
    </Pressable>
  );

  return (
    <ScreenContainer className="p-0">
      <View className="px-6 pt-6 pb-4">
        <Text className="text-3xl font-bold text-foreground">Paramètres</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Playback Settings */}
        <View className="mb-6">
          <Text className="px-6 text-lg font-semibold text-foreground mb-3">Lecture</Text>
          <View className="bg-surface rounded-lg overflow-hidden border border-border mx-6">
            <View className="px-4 py-4 border-b border-border flex-row justify-between items-center">
              <Text className="text-base font-medium text-foreground">Qualité par défaut</Text>
              <View className="flex-row gap-2">
                {qualityOptions.map((q) => (
                  <Pressable
                    key={q}
                    onPress={() => setDefaultQuality(q)}
                    style={({ pressed }) => [
                      {
                        backgroundColor: defaultQuality === q ? colors.primary : colors.border,
                        opacity: pressed ? 0.8 : 1,
                      },
                    ]}
                    className="px-3 py-1 rounded"
                  >
                    <Text
                      className={`text-xs font-semibold ${
                        defaultQuality === q ? "text-white" : "text-foreground"
                      }`}
                    >
                      {q}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>

            <View className="px-4 py-4 border-b border-border flex-row justify-between items-center">
              <Text className="text-base font-medium text-foreground">Lecture automatique</Text>
              <Switch
                value={autoplay}
                onValueChange={setAutoplay}
                trackColor={{ false: colors.border, true: colors.primary }}
              />
            </View>
          </View>
        </View>

        {/* Notifications */}
        <View className="mb-6">
          <Text className="px-6 text-lg font-semibold text-foreground mb-3">Notifications</Text>
          <View className="bg-surface rounded-lg overflow-hidden border border-border mx-6">
            <View className="px-4 py-4 flex-row justify-between items-center">
              <Text className="text-base font-medium text-foreground">Notifications push</Text>
              <Switch
                value={notifications}
                onValueChange={setNotifications}
                trackColor={{ false: colors.border, true: colors.primary }}
              />
            </View>
          </View>
        </View>

        {/* Display */}
        <View className="mb-6">
          <Text className="px-6 text-lg font-semibold text-foreground mb-3">Affichage</Text>
          <View className="bg-surface rounded-lg overflow-hidden border border-border mx-6">
            <View className="px-4 py-4 border-b border-border">
              <Text className="text-base font-medium text-foreground mb-3">Thème</Text>
              <View className="flex-row gap-2">
                {["light", "dark", "auto"].map((t) => (
                  <Pressable
                    key={t}
                    onPress={() => setTheme(t as any)}
                    style={({ pressed }) => [
                      {
                        backgroundColor: theme === t ? colors.primary : colors.border,
                        opacity: pressed ? 0.8 : 1,
                      },
                    ]}
                    className="flex-1 py-2 rounded items-center"
                  >
                    <Text
                      className={`text-xs font-semibold capitalize ${
                        theme === t ? "text-white" : "text-foreground"
                      }`}
                    >
                      {t === "auto" ? "Auto" : t === "dark" ? "Sombre" : "Clair"}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>

            <View className="px-4 py-4">
              <Text className="text-base font-medium text-foreground mb-2">Langue</Text>
              <View className="bg-background rounded px-3 py-2">
                <Text className="text-sm text-foreground">Français</Text>
              </View>
            </View>
          </View>
        </View>

        {/* About */}
        <View className="mb-6">
          <Text className="px-6 text-lg font-semibold text-foreground mb-3">À propos</Text>
          <View className="bg-surface rounded-lg overflow-hidden border border-border mx-6">
            <SettingRow label="Version" value="1.0.0" />
            <SettingRow label="Politique de confidentialité" />
            <SettingRow label="Conditions d'utilisation" />
            <SettingRow label="Signaler un problème" />
          </View>
        </View>

        <View className="h-8" />
      </ScrollView>
    </ScreenContainer>
  );
}
