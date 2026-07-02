# Mondiali App - Project TODO

## Architecture & Setup
- [x] Configure tab navigation (5 tabs: Home, Matches, Watch, Favorites, Settings)
- [x] Set up theme provider with Mondiali colors
- [x] Create reusable component library (MatchCard, ChannelCard, VideoPlayer, etc.)
- [x] Implement data fetching service for World Cup API
- [x] Set up M3U playlist parser for IPTV channels
- [x] Configure AsyncStorage for local caching

## Home Screen
- [x] Display live/upcoming matches with status badges
- [x] Show featured sports channels
- [x] Implement pull-to-refresh functionality
- [x] Create match cards with team info and streaming availability
- [x] Add quick-access channel carousel

## Matches Screen
- [ ] Create tournament tabs (Group Stage, Round of 32, etc.)
- [ ] Display group standings with team positions
- [ ] Show match list grouped by date
- [ ] Implement match detail modal with full information
- [ ] Add filter/sort functionality
- [ ] Display EPG (program guide) data

## Watch/Streaming Screen
- [x] Fetch and parse IPTV-Org sports playlist
- [x] Create channel grid with logos and metadata
- [x] Implement channel search functionality
- [x] Add category filter (Sports, All, Favorites)
- [ ] Create channel detail sheet with EPG
- [x] Implement quality selector (HD, FHD, Auto)

## Video Player Component
- [x] Integrate expo-video for HLS/RTMP streaming
- [x] Implement playback controls (play, pause, seek)
- [x] Add volume control and quality selector
- [ ] Implement fullscreen mode with landscape support
- [ ] Add Picture-in-Picture support (iOS 15+, Android 8+)
- [ ] Implement Chromecast support
- [ ] Add error handling and retry logic
- [x] Auto-hide controls with tap-to-show

## Favorites System
- [x] Implement favorites storage in AsyncStorage
- [x] Create favorites screen with match and channel tabs
- [x] Add favorite toggle to match cards and channel cards
- [ ] Implement swipe-to-remove from favorites
- [x] Add empty state messaging

## Settings Screen
- [ ] Create playback settings (default quality, autoplay)
- [ ] Add notification preferences
- [ ] Implement theme selector (dark/light/auto)
- [ ] Add language selection
- [ ] Create about section with links
- [ ] Add feedback/bug report functionality

## Styling & Polish
- [x] Apply Mondiali color scheme throughout app
- [ ] Implement smooth animations and transitions
- [ ] Add haptic feedback to interactive elements
- [x] Ensure dark mode looks premium
- [x] Optimize typography and spacing
- [ ] Test responsive layout on various screen sizes

## Performance & Optimization
- [ ] Implement lazy loading for match/channel data
- [ ] Add image caching for channel logos
- [ ] Optimize video streaming with adaptive bitrate
- [ ] Use FlatList for large lists (matches, channels)
- [ ] Implement data pagination where needed
- [ ] Profile and optimize render performance

## Testing & QA
- [ ] Test all tab navigation flows
- [ ] Verify video playback on various networks
- [ ] Test favorites add/remove functionality
- [ ] Validate data fetching and error handling
- [ ] Test dark mode on iOS and Android
- [ ] Verify accessibility (VoiceOver/TalkBack)
- [ ] Test on multiple device sizes
- [ ] Check for console errors and warnings

## Deployment Preparation
- [ ] Generate app icon and splash screen
- [ ] Configure app.config.ts with correct branding
- [ ] Test iOS build
- [ ] Test Android build
- [ ] Verify all links and external resources
- [ ] Create checkpoint before publishing
