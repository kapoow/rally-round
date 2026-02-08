# Home page (`home.hbs`)

Working document for the site home page template: what it does, what we want to add, and how it’s wired up.

---

## What it currently does

The home page is the landing view for a league when **useStandingsForHome** is `false` (and the league has no subfolder). It’s rendered by `writeHomeHTML()` in `src/output/html.js` and receives data built there.

### Sections (in order)

1. **Header**  
   Logo + site title (“{siteTitlePrefix} Home”).

2. **Hero card — current event or placeholder**
   - **If there are active events:**
     Current event name, division, location; when `endTime` is set: country flag + live countdown (same as nav); buttons: "View Results" (uses `eventIndex` in URL), "View Standings".
   - **If no active events:**
     "Championship in Progress" with "No events currently active" and a single "View Standings" button (to first division if available).

3. **Next Event Preview**
   When `nextEvent` is present: shows upcoming event name, division, location (with country flag), and formatted start date/time (e.g., "February 9, 2026 at 12:00 PM"). Uses `division.upcomingEvents` array (future events only).

4. **Home cards grid** (`home-cards-grid`)
   Two cards side by side on large screens (fluid widths), stacked on small:
   - **Last Event Winners** — When `lastCompletedEvents` has items: one block per division with most recent completed event (division + event name, location, winner + flag, margin, entries count, "View Results" link using `divisionId` + `eventIndex`). Card uses `card--full-bg`.
   - **Championship Battles** — When `championshipBattles` has items: per division, leader vs second (names, flags, points), gap, "Tight!" / "Still Open" / "Comfortable Lead", events remaining, "View Standings" link. Card uses `card--full-bg`. Header has ⚔️ emoji.

5. **Hot Streaks card**
   When `formGuide` has items: shows top 3 drivers on hot streaks (2+ wins OR 3 podiums in last 3 completed events). Per driver: flag, name, division badge, wins/podiums count, recent finish positions. Tracks form per-division then aggregates across all divisions.

6. **Car Performance card**
   When `carStats` is present: shows most successful car (wins, podiums, win rate) and best average performance (avg points, entries).

7. **Season Statistics card**
   When `seasonStats` has items: shows per-division statistics including events completed, average entries per event, DNF rate, and closest finish. Each division displayed separately with stats grid layout.

8. **Championship Rules card**
   When `rules` is present: drop rounds, points (top 5), power stage points. Per-division **Allowed Cars** and **Banned Cars** are rendered inside this card (each division in a `.home-rules__division` block).

9. **Top 3 drivers by division**
   Grid of cards, one per division, each showing top 3 drivers with position, position change, flag, name, points.

*(Previous seasons aside has been removed; `historicalSeasonLinks` is still passed but not rendered.)*

### Data it receives

| Data | Source / meaning |
|------|-------------------|
| `logo`, `siteTitlePrefix` | League config |
| `activeEvents` | Array of active events: `name`, `location`, `division`, `divisionId`, `eventIndex`, `showingLivePoints` (result links use `eventIndex`, not `event.id`) |
| `endTime`, `activeCountry` | From `leagueRef`; used for live countdown + flag |
| `divisionInfo` | Per-division `name`, `cars`, `excludedCars` (for rules card) |
| `rules` | `dropRounds`, `overallPointsTop5`, `powerStagePoints` |
| `nextEvent` | Upcoming event from `division.upcomingEvents[0]`: `name`, `location`, `locationCode`, `divisionName`, `divisionId`, `startDate` (formatted as "MMMM D, YYYY at h:mm A", null if no upcoming events) |
| `lastCompletedEvents` | One object per division: `divisionName`, `name`, `location`, `divisionId`, `eventIndex`, `winner`, `winnerCountry`, `margin`, `totalEntries` |
| `championshipBattles` | One object per division (≥2 drivers): `divisionName`, `divisionId`, `leader`, `leaderCountry`, `leaderPoints`, `secondPlace`, `secondPlaceCountry`, `secondPlacePoints`, `gap`, `eventsRemaining`, `mathematicallyOpen`, `tightBattle` |
| `formGuide` | Top 3 hot drivers across all divisions (2+ wins OR 3 podiums in last 3 events): `name`, `country`, `wins`, `podiums`, `recentFinishes` (array of finish positions), `divisionName` |
| `carStats` | Car performance aggregated across all events: `mostWins` (car with most wins: `name`, `wins`, `podiums`, `winRate`, `entries`), `bestAverage` (best avg points: `name`, `avgPoints`, `entries`) |
| `seasonStats` | Per-division statistics array: `divisionName`, `totalEvents`, `completedEvents`, `eventsRemaining`, `avgEntriesPerEvent`, `dnfRate`, `closestFinish` (object with `margin`, `event`, `location`, `winner`, `secondPlace` or null) |
| `top3ByDivision` | Per-division `divisionName`, `divisionId`, `top3` (driver rows with standing, country, etc.) |
| `historicalSeasonLinks` | `{ name, href }[]` (passed; not currently rendered) |
| `localization` | (available; used elsewhere) |
| `showTeamNameTextColumn`, `hideTeamLogoColumn` | (passed; not currently used in template) |

---

## Changelog

- **Event Pipeline Architecture:** Split events into two arrays: `division.events` (processed: active/finished) and `division.upcomingEvents` (future). This prevents future events from entering the standings/results processing pipeline. Next Event now uses `division.upcomingEvents?.[0]`.
- **Last Event Winners card:** Most recent completed event per division (winner, margin, entries, "View Results" via `eventIndex`). Uses `card--full-bg`; lives in `home-cards-grid`. See HOMEPAGE_FEATURES_GUIDE.md §1.
- **Championship Battles card:** Leader vs second per division, gap, "Tight!" / "Still Open" / "Comfortable Lead", events remaining, "View Standings". Uses `card--full-bg`; lives in `home-cards-grid`. See HOMEPAGE_FEATURES_GUIDE.md §2.
- **Next Event Preview card:** Shows upcoming event from `division.upcomingEvents`, displays division, location (with country flag), and formatted start date/time. See HOMEPAGE_FEATURES_GUIDE.md §3.
- **Car Performance Stats card:** Aggregates car statistics across all completed events. Shows most successful car (wins, podiums, win rate) and best average performer (avg points, entries). Appears after Hot Streaks. See HOMEPAGE_FEATURES_GUIDE.md §4.
- **Hot Streaks card:** Shows top 3 drivers on hot streaks (2+ wins OR 3 podiums in last 3 events). Tracks form per-division, aggregates across all divisions. Displays wins, podiums, recent finishes, and division badge. Positioned before Car Performance card. Added ⚔️ emoji to Championship Battles header. See HOMEPAGE_FEATURES_GUIDE.md §5.
- **Season Statistics card:** Per-division statistics showing events completed, average entries per event, DNF rate, and closest finish. Each division displayed separately with stats grid layout. See HOMEPAGE_FEATURES_GUIDE.md §6.
- **Layout:** Last Event Winners and Championship Battles sit in `home-cards-grid` (side-by-side on large screens, fluid column widths). Previous seasons aside removed from template (data still passed).
- **Moved allowed/banned car lists** into the Championship Rules card (no longer separate cards).
- **Replaced “Live points active”** in the hero with the same flag + countdown as the nav (`endTime` + `activeCountry` + `#homeCountdown`).
- **Fixed active events on home:** home now uses `event.eventStatus === eventStatuses.active` (was `event.status`) so the hero and “no events active” state are correct.

---

## Planned features

Detailed specs, code snippets, data pipelines, and feasibility notes live in **[HOMEPAGE_FEATURES_GUIDE.md](HOMEPAGE_FEATURES_GUIDE.md)**. Use that doc when:

- Checking whether a feature can work with current data
- Validating or fixing data pipelines
- Implementing a feature (it has implementation notes and CSS requirements)

**Summary of feature ideas** (see guide for full detail and priority). ✅ = implemented.

| Feature | Brief |
|--------|--------|
| Last Event Recap ✅ | Winner, margin, notable stats from most recent completed event (per division) |
| Championship Battle Tracker ✅ | Leader vs second, gap, events remaining, "still open?" / "Tight!" (Championship Countdown) |
| Next Event Preview ✅ | Upcoming event with location, division, country flag, and formatted start date |
| Car Performance Insights ✅ | Most successful car, underdog, meta shifts |
| Driver Hot Streak / Spotlight ✅ | Winning streaks, consecutive podiums, "rising star" form |
| Season Statistics ✅ | Per-division events completed, avg entries, DNF rate, closest finish |
| Championship Momentum / Season Story | Tight battle, comeback king, domination tracker |
| Team Battle Visualization | Head-to-head constructors comparison |
| Stage Statistics | Stages won, super rally usage, completion rate (if data exists) |
| Interactive Division Switcher | Expand to top 10, division-specific stats |
| Hall of Fame Rotator | "On this day", legendary stats (for historical leagues) |

When a feature is implemented, note it in the [Changelog](#changelog) above and optionally mark it in the guide.
