/**
 * IPTV M3U Playlist Parser
 * Parses M3U playlists from IPTV-Org
 */

export interface Channel {
  id: string;
  name: string;
  logo?: string;
  group?: string;
  url: string;
  quality?: "HD" | "FHD" | "4K" | "Unknown";
}

/**
 * Parse M3U playlist content
 * M3U format:
 * #EXTINF:-1 tvg-id="..." tvg-name="..." tvg-logo="..." group-title="...",Channel Name
 * http://stream-url.m3u8
 */
export function parseM3U(content: string): Channel[] {
  const channels: Channel[] = [];
  const lines = content.split("\n");

  let currentChannel: Partial<Channel> | null = null;

  for (const line of lines) {
    const trimmedLine = line.trim();

    if (trimmedLine.startsWith("#EXTINF")) {
      // Parse channel metadata
      currentChannel = {};

      // Extract channel name (after last comma)
      const nameMatch = trimmedLine.match(/,(.+)$/);
      if (nameMatch) {
        currentChannel.name = nameMatch[1].trim();
      }

      // Extract logo
      const logoMatch = trimmedLine.match(/tvg-logo="([^"]+)"/);
      if (logoMatch) {
        currentChannel.logo = logoMatch[1];
      }

      // Extract group
      const groupMatch = trimmedLine.match(/group-title="([^"]+)"/);
      if (groupMatch) {
        currentChannel.group = groupMatch[1];
      }

      // Extract ID
      const idMatch = trimmedLine.match(/tvg-id="([^"]+)"/);
      if (idMatch) {
        currentChannel.id = idMatch[1];
      } else {
        currentChannel.id = currentChannel.name?.toLowerCase().replace(/\s+/g, "-") || "";
      }
    } else if (trimmedLine && !trimmedLine.startsWith("#") && currentChannel) {
      // This is the stream URL
      currentChannel.url = trimmedLine;

      // Detect quality from URL
      if (trimmedLine.includes("1080") || trimmedLine.includes("fhd")) {
        currentChannel.quality = "FHD";
      } else if (trimmedLine.includes("720") || trimmedLine.includes("hd")) {
        currentChannel.quality = "HD";
      } else if (trimmedLine.includes("2160") || trimmedLine.includes("4k")) {
        currentChannel.quality = "4K";
      }

      // Add channel to list
      if (currentChannel.name && currentChannel.url) {
        channels.push(currentChannel as Channel);
      }

      currentChannel = null;
    }
  }

  return channels;
}

/**
 * Fetch and parse IPTV-Org sports playlist
 */
export async function fetchSportsChannels(): Promise<Channel[]> {
  try {
    const response = await fetch("https://iptv-org.github.io/iptv/categories/sports.m3u");
    if (!response.ok) throw new Error("Failed to fetch sports playlist");
    const content = await response.text();
    return parseM3U(content);
  } catch (error) {
    console.error("Error fetching sports channels:", error);
    return [];
  }
}

/**
 * Fetch and parse IPTV-Org general playlist
 */
export async function fetchGeneralChannels(): Promise<Channel[]> {
  try {
    const response = await fetch("https://iptv-org.github.io/iptv/index.category.m3u");
    if (!response.ok) throw new Error("Failed to fetch general playlist");
    const content = await response.text();
    return parseM3U(content);
  } catch (error) {
    console.error("Error fetching general channels:", error);
    return [];
  }
}

/**
 * Filter channels by group
 */
export function filterChannelsByGroup(channels: Channel[], group: string): Channel[] {
  return channels.filter((ch) => ch.group?.toLowerCase().includes(group.toLowerCase()));
}

/**
 * Search channels by name
 */
export function searchChannels(channels: Channel[], query: string): Channel[] {
  const lowerQuery = query.toLowerCase();
  return channels.filter((ch) => ch.name.toLowerCase().includes(lowerQuery));
}

/**
 * Get unique groups from channels
 */
export function getChannelGroups(channels: Channel[]): string[] {
  const groups = new Set<string>();
  channels.forEach((ch) => {
    if (ch.group) {
      groups.add(ch.group);
    }
  });
  return Array.from(groups).sort();
}
