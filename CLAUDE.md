# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Rally Round is a Node.js application that processes virtual rally championship results from multiple sources (Dirt Rally 2.0, Richard Burns Rally, WRC games, manual entries) and generates HTML/CSV output with standings, team calculations, and statistics. Results are published to AWS S3 as static websites.

## Core Commands

### Development
```bash
# Run tests
npm test

# Run end-to-end tests
npm run test-e2e

# Update test snapshots
npm run test:update-snapshots

# Lint code
npm run lint

# Validate all club configurations
npm run validate-configs

# Run config editor (web UI for editing club configs)
npm run config-editor

# Preview homepage changes (fast development workflow)
npm run preview        # Generate test-e2e homepage and open in browser
npm run preview:watch  # Auto-regenerate on file changes
```

### Generating Results
```bash
# Generate results for a club
node runner.js <dirt_username> <dirt_password> <club_name>

# Or using environment variables (set in .env)
CLUB=<club_name> node runner.js

# Example clubs: jrc, oor, brl, test, jrc-themed, jrc-modern, jrc-historic
```

### Starting New Championships
```bash
# Archive current championship and prepare for new one
npm run prepare-championship <club_name>
```

## Architecture

### High-Level Flow
1. **State Management** (`src/state/`) - Each club has an `initialState.js` defining divisions, events, points systems
2. **Data Fetching** (`src/fetch/`) - Pulls results from Dirt Rally 2.0, RBR, WRC APIs, or manual sources
3. **Processing** (`src/index.js`) - Core championship calculations:
   - Filters/validates entries per division rules
   - Applies manual results, penalties, DNFs
   - Calculates points (overall, powerstage, stage, leg)
   - Calculates standings with drop rounds, DNS penalties, promotion/relegation
   - Handles team results with configurable scoring limits
4. **Output** (`src/output/`) - Generates HTML (via Handlebars templates) and CSV files
5. **Deployment** (`src/api/aws/s3.js`) - Uploads to S3 buckets

### Key Concepts

**Club Structure**: Each club/championship lives in `src/state/<club-name>/`:
- `initialState.js` - Championship configuration (divisions, events, points, rules)
- `driverConfig.js` - Driver data sources (CSV files, Google Sheets)
- Clubs are **automatically discovered** - `src/state/allLeagues.js` dynamically scans all folders for `initialState.js` files, no manual registration required

**Divisions**: Championships are organized into divisions (e.g., Pro, AM, Historic). Each division has:
- Events list (with IDs for fetching from APIs)
- Points systems (can vary per event)
- Car restrictions/filters
- Team configurations
- Promotion/relegation rules

**Event Processing**:
- Events are split into two arrays at fetch time:
  - `division.events` - Processed events only (active + finished) with results/standings
  - `division.upcomingEvents` - Future events (no results/standings, used for display only)
- Guards protect against empty arrays: standings/spreadsheet generation checks for empty `division.events` and skips/returns null to prevent crashes
- Events have `leaderboardStages[]` - raw stage times from API
- Last stage results determine final positions
- Manual results can override API data
- Incorrect car usage triggers penalties or DQs
- Results cascade: if driver DNFs mid-event, all subsequent stages marked DNF

**Points Systems**: Configurable per division, can include:
- `overall` - Final event placement points
- `powerStage` - Bonus points for last stage
- `stage` - Points per stage win
- `leg` - Points per leg (multi-day events)
- Multipliers for endurance events or no-superrally bonuses

**Teams**:
- Can be defined in driver CSV, derived from car/nationality, or overridden per event
- Team scoring uses top N drivers (configurable via `maxDriversScoringPointsForTeam`)
- Overall team standings can aggregate across all events with separate limit

**Drop Rounds**: Uses knapsack algorithm to optimize best N rounds (respects endurance multipliers)

**Standings Features**:
- Position changes tracked between events
- DNS penalty (50%+ DNS rate disqualifies driver)
- Promotion/relegation zones (configurable, can use percentages)
- "Overall" pseudo-division aggregates across all divisions

### Data Sources

**Dirt Rally 2.0** (`src/api/dirt/`, `src/fetch/dirt/`):
- Requires racenet credentials
- Fetches championship/event data via unofficial API
- Cookie-based authentication

**Richard Burns Rally** (`src/api/rbr/`, `src/fetch/rbr/`):
- Scrapes hu plugin event pages
- Parses HTML for results

**WRC** (`src/api/wrc/`, `src/fetch/wrc/`):
- Uses official WRC game API
- Requires 2FA via Gmail integration

**Manual** (`src/fetch/manual/`):
- Reads from CSV files specified in config
- Used for offline events or custom imports

**Google Sheets** (`src/api/sheets/`):
- Pulls driver registry data
- Requires `GOOGLE_SHEETS_API_KEY` env var

### Caching

- Results cached in `./hidden/cache/` (local) and S3 (remote)
- **Active events**: ALWAYS fetch from API (never cached) - ensures live data
- **Finished events**: Cached after first fetch, reused on subsequent runs
- Cache cleared on startup by default (for CI/CD workflow)
- Set `KEEP_LOCAL_CACHE=true` to preserve cache between local runs
- Downloaded from S3 at start if AWS credentials present
- WRC nationality codes: `src/fetch/wrc/nationalities.csv` (173 entries)

### Output Structure

Generated in `./hidden/out/`:
- `website/` - HTML files + assets
- Individual pages per event per division (driver results, team results)
- Standings pages
- Home page (configurable: standings redirect or custom homepage). When using custom homepage: hero, Last Event Winners + Championship Battles cards (in `home-cards-grid`), Championship Rules, Top 3 by division. See `HOME.md` for the current homepage implementation notes.
- JSON dump (`leagueResults.json`)

### Templating

Uses Handlebars templates in `src/output/templates/`:
- `layout.hbs` - Shared layout (nav, footer, countdown timer)
- `standings.hbs`, `results.hbs`, `home.hbs` - Page-specific templates
- Helpers defined inline in `src/output/html.js`

**HTML Generation Pattern** (`src/output/html.js`):
- `write*HTML()` functions are thin wrappers (handle navigation, template rendering, file I/O)
- Data preparation delegated to `transform*HTML()` or helper functions
- Example: `writeHomeHTML()` → `transformForHomeHTML()` → 9 helper functions
- Example: `writeStandingsHTML()` → `transformForStandingsHTML()`
- Homepage filtering: `transformForHomeHTML()` uses `getHomeDivisions()` to filter divisions (excludes those with `hideDriverStandingsLink`), passes filtered divisions to all helpers
- Keep write functions small (~30-50 lines); extract complex logic to separate functions

**Event URL Format:**
- Driver results: `${divisionName}-${eventIndex}-driver-results.html`
- Team results: `${divisionName}-${eventIndex}-team-results.html`
- Uses `eventIndex` (position in events array), NOT `event.id`
- Example: `pro-2-driver-results.html` (Pro division, event index 2)

### S3 Deployment

- Uploads to bucket specified by `websiteName` in config
- Can use `subfolderName` for multi-club buckets
- Requires `DIRT_AWS_ACCESS_KEY` and `DIRT_AWS_SECRET_ACCESS_KEY` env vars
- Static website hosting (no server-side code)

## Important Files

- `src/index.js` - Core processing logic (1286 lines, main championship calculations)
- `src/state/league.js` - State management, driver lookups
- `src/fetch/fetch.js` - Dispatcher to specific fetch implementations
- `src/output/html.js` - HTML generation with Handlebars
- `src/output/output.js` - Output orchestration
- `src/shared.js` - Utility functions (time parsing, DNF creation, diff calculations)
- `runner.js` - CLI entry point

## Configuration Patterns

When editing club configs (`initialState.js`):

**Basic Division**:
```javascript
divisions: {
  pro: {
    divisionName: "pro",
    displayName: "Pro Division",
    events: [
      { eventId: "12345", challengeId: "67890", location: "Australia" }
    ],
    points: {
      overall: [25, 18, 15, 12, 10, 8, 6, 4, 2, 1],
      powerStage: [5, 4, 3, 2, 1]
    }
  }
}
```

**Car Restrictions**:
```javascript
cars: ["Alpine Renault A110 1600 S"], // Whitelist
excludedCars: ["Subaru WRX STI"], // Blacklist
```

**Manual Results**:
```javascript
manualResults: [{
  eventIndex: 0,
  results: [
    { name: "DriverName", stageTime: "05:33.000", totalTime: "45:22.100" }
  ]
}]
```

**Team Overrides**:
```javascript
teamOverride: {
  "DriverName": ["TeamA", "TeamB", "TeamA"] // Per event index
}
```

**Color Theme**:
```javascript
theme: "dark"  // Options: "dark", "red", "green", "orange" (default: blue/purple if not set)
// Themes are WCAG AA compliant for accessibility
```

## Testing

- Tests use Jest
- Snapshot testing for HTML output
- E2E test uses `test-e2e` club config
- Pre-push hook runs lint + tests + config validation

## Common Development Tasks

**Add new club**:
1. Create `src/state/<club-name>/` folder
2. Add `initialState.js` and `driverConfig.js`
3. Club is automatically discovered (no manual registration needed - `allLeagues.js` scans for folders with `initialState.js`)
4. Create GitHub workflow if automated

**Modify points system**: Edit `points` object in division config

**Add new division**: Add to `divisions` object in `initialState.js`

**Fix missing driver**: Check driver name matches between API and CSV/Sheets

**Debug event fetch**: Set `DEBUG=tkidman:*` env var for detailed logging

**Update templates**: Edit `.hbs` files in `src/output/templates/`, data comes from `writeHTML` functions. Use `npm run preview` for fast feedback during homepage development.

**Change deployment target**: Update `websiteName` and optionally `subfolderName` in config

## Notable Implementation Details

- **Event Status**: Uses `eventStatuses` constants from `src/shared.js`:
  - `eventStatuses.active` - "Active"
  - `eventStatuses.finished` - "Finished" (NOT "completed")
  - `eventStatuses.future` - "Future" (NOT "notStarted")
- **Event Names**: Dirt Rally events have `event.name`, but RBR events only have `event.locationName`. Always use fallback: `event.name || event.locationName`
- **Event Location**: `event.location` is a STRING key (e.g., "MONARO"), not an object. Use `getLocation(event)` helper from `src/output/shared.js` to get `{ countryName, countryCode }`
- **Time Format**: "MM:SS.mmm" string format throughout, converted via `getDuration()` when needed
- **DNF Handling**: `isDnfEntry`, `isDnsEntry` flags + `disqualificationReason` text
- **Diffs**: Time differences are nested in `result.entry.totalDiff` and `result.entry.stageDiff`, NOT at top level
- **Driver Lookup**: Multiple lookup mechanisms (by name, racenet, 3-letter code)
- **Mutations**: Event leaderboard entries are mutated during processing (filters, DNF cascade, manual results)
- **Knapsack**: Drop rounds use dynamic programming knapsack for optimal selection
- **Rally Sprint**: Special mode where fastest single stage = total time

## Environment Variables

```bash
# Required for generating results
DIRT_USERNAME=<racenet_username>
DIRT_PASSWORD=<racenet_password>
CLUB=<club_name>

# Optional
DIRT_AWS_ACCESS_KEY=<aws_access_key>
DIRT_AWS_SECRET_ACCESS_KEY=<aws_secret>
GOOGLE_SHEETS_API_KEY=<api_key>
KEEP_LOCAL_CACHE=true  # Don't delete cache on each run
DEBUG=tkidman:*  # Enable debug logging
```

## Additional Documentation

- `readme.md` - Setup and basic usage
- `STARTING_NEW_CHAMPIONSHIP.md` - Guide for starting new seasons
- `HOME.md` - Home page: current `home.hbs` implementation, data flow, and homepage-specific rules
- `GMAIL_2FA_INTEGRATION.md` - WRC Gmail 2FA setup
