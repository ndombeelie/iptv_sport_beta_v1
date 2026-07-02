# Mondiali App - Design System & Interface Planning

## Design Philosophy
Premium, modern mobile app inspired by **Sofascore**. The design emphasizes:
- **Clean hierarchy** with clear content prioritization
- **Smooth animations** and fluid transitions
- **Professional football aesthetic** with premium color scheme
- **One-handed navigation** optimized for portrait (9:16) orientation
- **Dark mode first** with light mode support

## Brand Colors

| Color | Hex | Usage |
|-------|-----|-------|
| **Bleu Nuit** | #0A1F44 | Primary background, premium feel |
| **Rouge FIFA** | #E63946 | Primary action, highlights, CTAs |
| **Blanc** | #FFFFFF | Text, surfaces in light mode |
| **Or FIFA** | #FFD700 | Accents, premium elements, warnings |

## Screen Architecture

### Tab Navigation (Bottom Tab Bar)
1. **Accueil (Home)** - Live matches & featured content
2. **Matchs (Matches)** - Full match schedule & standings
3. **Regarder (Watch)** - IPTV channels & streaming
4. **Favoris (Favorites)** - Bookmarked matches & channels
5. **Paramètres (Settings)** - App preferences

---

## Screen Specifications

### 1. **Accueil (Home Screen)**
**Purpose:** Dashboard showing live/upcoming matches and featured channels

**Content Layout:**
- **Header:** "Mondiali" branding + live indicator badge
- **Live Matches Section:** Horizontal scrollable cards showing:
  - Match status (Live, Upcoming, Finished)
  - Team flags/logos
  - Score (if live)
  - Time/countdown
  - Available streaming channels
- **Featured Channels:** Quick-access sports channels
- **Upcoming Matches:** Next 5 matches with dates/times
- **Recent Results:** Last 3 completed matches

**Key Interactions:**
- Tap match card → Match detail screen
- Tap channel → Video player
- Pull-to-refresh updates data

---

### 2. **Matchs (Matches Screen)**
**Purpose:** Complete tournament schedule, standings, and match details

**Content Layout:**
- **Tournament Tabs:** Group Stage | Round of 32 | Round of 16 | Quarters | Semis | Final
- **Group Standings:** (for Group Stage tab)
  - Table with team positions, points, goals
  - Sortable by group
- **Match List:** Grouped by date
  - Match cards with teams, score, time
  - Status indicator (Live, Scheduled, Finished)
  - Streaming availability badge
- **Match Detail Modal:**
  - Full match info (teams, lineups, stats)
  - Available streaming channels
  - Commentary/events timeline
  - Watch button

**Key Interactions:**
- Tap match → Expand details
- Tap "Watch" → Video player
- Filter by group/status
- Share match link

---

### 3. **Regarder (Watch/Streaming Screen)**
**Purpose:** IPTV channel browsing and streaming

**Content Layout:**
- **Search Bar:** Find channels by name
- **Category Filter:** Sports | All | Favorites
- **Channel Grid:** 2-column layout showing:
  - Channel logo/thumbnail
  - Channel name
  - Current program (if available)
  - Quality indicator (HD/FHD)
  - Favorite star (toggle)
- **Channel Detail Sheet:** (on tap)
  - Full channel info
  - EPG (program guide)
  - Play button
  - Add to favorites
  - Quality selection

**Key Interactions:**
- Tap channel → Video player
- Long-press → Add to favorites
- Search filters channels
- Quality selector before playback

---

### 4. **Favoris (Favorites Screen)**
**Purpose:** Quick access to bookmarked matches and channels

**Content Layout:**
- **Tabs:** Matches | Channels
- **Matches Tab:**
  - Upcoming favorite matches
  - Past favorite matches
  - Empty state: "No favorites yet"
- **Channels Tab:**
  - Favorite channels grid
  - Drag-to-reorder (optional)
  - Remove from favorites (swipe/long-press)

**Key Interactions:**
- Tap match → Match details
- Tap channel → Video player
- Swipe to remove from favorites
- Empty state prompts to add favorites

---

### 5. **Paramètres (Settings Screen)**
**Purpose:** App configuration and preferences

**Content Layout:**
- **Playback Settings:**
  - Default video quality (HD/FHD/Auto)
  - Autoplay next match
  - Subtitle language
- **Notifications:**
  - Match start reminders
  - Goal notifications
  - Push notification toggle
- **Display:**
  - Dark/Light/Auto theme
  - Language selection
- **About:**
  - App version
  - Privacy policy link
  - Terms of service link
  - Feedback/Report bug

**Key Interactions:**
- Toggle switches
- Dropdown selectors
- Link navigation to external pages

---

## Video Player Component

### Features
- **Playback Controls:**
  - Play/Pause
  - Seek bar with timeline
  - Volume control
  - Quality selector (HD/FHD)
  - Fullscreen toggle
  - Picture-in-Picture (iOS 15+, Android 8+)
  - Chromecast support
- **UI Behavior:**
  - Auto-hide controls after 3 seconds
  - Tap to show/hide
  - Landscape fullscreen support
  - Safe area handling for notch/home indicator
- **Error Handling:**
  - Retry button on stream failure
  - Fallback channel suggestions
  - Network error messaging

---

## Component Library

### Reusable Components

| Component | Purpose | Usage |
|-----------|---------|-------|
| **MatchCard** | Display match info | Home, Matches, Favorites |
| **ChannelCard** | Display channel info | Watch, Favorites |
| **VideoPlayer** | Stream playback | Watch, Match detail |
| **TabBar** | Bottom navigation | All screens |
| **Header** | Screen title + actions | All screens |
| **EmptyState** | No data messaging | Favorites, Search results |
| **LoadingSpinner** | Data loading | All screens |
| **ErrorBoundary** | Error handling | All screens |

---

## Typography

| Style | Font | Size | Weight | Usage |
|-------|------|------|--------|-------|
| **H1** | System | 32px | Bold | Screen titles |
| **H2** | System | 24px | Semibold | Section headers |
| **H3** | System | 18px | Semibold | Card titles |
| **Body** | System | 16px | Regular | Body text |
| **Caption** | System | 12px | Regular | Metadata, timestamps |
| **Badge** | System | 11px | Semibold | Status badges |

---

## Spacing & Layout

- **Padding:** 16px (standard), 12px (compact), 24px (generous)
- **Gap between elements:** 12px (tight), 16px (standard), 20px (loose)
- **Border radius:** 12px (standard), 8px (compact), 16px (generous)
- **Safe area:** Always respected via ScreenContainer

---

## Animation Guidelines

- **Transitions:** 200-300ms duration, easing: ease-out
- **Scale feedback:** 0.97 on press (subtle)
- **Opacity:** 0.7 on press (list items)
- **No bouncy springs:** Keep animations smooth and professional
- **Haptic feedback:** Light impact on primary actions

---

## Dark Mode Strategy

- **Background:** #0A1F44 (Bleu Nuit) for immersive feel
- **Surface:** #1A2F5A (lighter Bleu Nuit) for cards/elevated elements
- **Text:** #FFFFFF for primary text
- **Accents:** #E63946 (Rouge) and #FFD700 (Or) pop against dark background
- **Borders:** Subtle, low contrast (#334155)

---

## Accessibility

- **Color contrast:** All text meets WCAG AA standards
- **Touch targets:** Minimum 44x44pt for interactive elements
- **Font scaling:** Respects system font size preferences
- **VoiceOver/TalkBack:** Semantic structure for screen readers
- **Haptic feedback:** Provides tactile confirmation for actions

---

## Performance Considerations

- **Image optimization:** Use WebP with PNG fallbacks
- **Lazy loading:** Defer channel/match data until needed
- **Caching:** Cache match data locally with AsyncStorage
- **Video streaming:** Adaptive bitrate selection based on network
- **List virtualization:** Use FlatList for large match/channel lists

---

## Data Flow

```
┌─────────────────────────────────────────┐
│  World Cup API (Free API)               │
│  - Match schedule                       │
│  - Live scores                          │
│  - Team info & standings                │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│  Local Cache (AsyncStorage)             │
│  - Favorites (matches & channels)       │
│  - User preferences                     │
│  - Last viewed data                     │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│  IPTV-Org M3U Playlist                  │
│  - Sports channels                      │
│  - Stream URLs                          │
│  - Channel metadata                     │
└──────────────┬──────────────────────────┘
               │
               ▼
        ┌──────────────┐
        │  UI Screens  │
        └──────────────┘
```

---

## Next Steps

1. Implement tab navigation structure
2. Create reusable component library
3. Set up data fetching (World Cup API + M3U parsing)
4. Build video player component
5. Implement match/channel screens
6. Add favorites functionality
7. Polish animations and interactions
