# Mondiali App - Research Notes

## Phase 2: Data Sources Research

### IPTV-Org Project
**Repository:** https://github.com/iptv-org/iptv
**Main Playlist:** https://iptv-org.github.io/iptv/index.m3u
**Sports Playlist:** https://iptv-org.github.io/iptv/categories/sports.m3u (373 channels)

#### Available Playlists by Category:
- **Sports:** 373 channels - https://iptv-org.github.io/iptv/categories/sports.m3u
- **General:** 2427 channels
- **Entertainment:** 634 channels
- **News:** 950 channels

#### Playlist Grouping Options:
1. **By Category:** https://iptv-org.github.io/iptv/index.category.m3u
2. **By Language:** https://iptv-org.github.io/iptv/index.language.m3u
3. **By Country:** https://iptv-org.github.io/iptv/index.country.m3u

#### M3U Format:
- Plain text format with stream URLs
- Each entry contains: `#EXTINF:-1,Channel Name` followed by stream URL
- Can include metadata like logo, group, etc.

#### EPG (Electronic Program Guide):
- Available via: https://github.com/iptv-org/epg
- Provides program schedule for channels

### World Cup 2026 Data Sources

#### Free APIs:
1. **FIFA World Cup API (BALLDONTLIE)**
   - URL: https://fifa.balldontlie.io/
   - Coverage: 2018, 2022, 2026 tournaments
   - Data: Teams, stadiums, players, rosters, matches, standings, lineups
   - No API key required

2. **Free World Cup 2026 API (GitHub)**
   - URL: https://github.com/rezarahiminia/worldcup2026
   - Features: Live scores, 104 matches, 16 stadiums, 12 groups
   - Real-time updates, no API key required

3. **football-data.org**
   - URL: https://www.football-data.org/
   - Data: Live scores, fixtures, tables, squads, lineups

#### Premium APIs (with free tier):
1. **API-Football (api-sports.io)**
   - Free plan: 100 requests/day
   - Coverage: +1200 competitions including World Cup 2026
   - Data: Fixtures, live scores, standings, teams, odds, lineups, statistics

2. **Sportmonks**
   - World Cup 2026 REST API
   - Data: Fixtures, live scores, in-game events, squads, statistics

### Tournament Schedule 2026:
- **Group Stage:** June 11-27 (72 matches)
- **Round of 32:** June 28-July 3
- **Round of 16:** July 4-7
- **Quarter-finals:** July 9-11
- **Semi-finals:** July 13-14
- **Final:** July 19

### Implementation Strategy:
1. Use **IPTV-Org sports playlist** for channel streaming
2. Use **free World Cup API** for match data and schedule
3. Parse M3U format to extract channels
4. Implement video player with HLS/RTMP support
5. Cache match data locally with AsyncStorage
6. Implement favorites/bookmarks for channels and matches
