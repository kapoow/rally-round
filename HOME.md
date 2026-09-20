# Home Page (`home.hbs`)

Compact reference for the custom homepage rendered from `src/output/templates/home.hbs`.

## Files

- Template: `src/output/templates/home.hbs`
- Data assembly: `transformForHomeHTML()` in `src/output/html.js`
- Render entry point: `writeHomeHTML()` in `src/output/html.js`
- Shared homepage helpers: `getHomeDivisions()`, `getHomeHero()`, `getRoundCards()`, `getActiveEvents()`, `getLastCompletedEvents()`, `getChampionshipBattles()`, `getNextEvent()`, `getCarStats()`, `getFormGuide()`, `getSeasonStats()`
- Countdown script: inline in `src/output/templates/navigation.hbs`

## When It Is Used

The homepage is rendered when `useStandingsForHome` is `false`. Otherwise the league uses standings as the landing page.

## Rendered Sections

Current `home.hbs` renders these sections in order:

1. Hero — status eyebrow, event title, division/location meta, result and standings buttons, split countdown, and any other divisions running at the same time
2. `home-duo` — Championship Battles (per division) beside the Season summary (per division)
3. Calendar — every round of the season as a card, per division
4. `home-grid-2` — Last Event Winners and Hot Streaks
5. `home-grid-2` — Top 3 by division, Car Performance, Championship Rules

`historicalSeasonLinks` is still passed through data but is not rendered by the template.

## Main Data Passed To `home.hbs`

- `hero`: the single event the page leads with. `state` is `live`, `next` or `complete`, picked in that order; carries `statusLabel`, `title`, `subtitle`, `locationCode`, `divisionName`, `divisionId`, `roundNumber`, `totalRounds`, `startDate` (upcoming only), `resultsHref`, `standingsHref`
- `endTime`: drives the hero's split countdown (`#homeClockDays` … `#homeClockSeconds`, label `#homeClockLabel`)
- `activeEvents` / `otherActiveEvents`: all active events, and the ones the hero did not take
- `multipleDivisions`: whether cards should name their division
- `roundGroups`: per division, every round as `{ round, name, state, statusLabel, winner, startDate, href }`; `state` is `done`, `live` or `upcoming`
- `championshipBattles`: top-two gap per division, plus `secondPlaceBarPercent`, `maxPointsPerEvent`, `maxPowerStagePoints` and `totalPointsRemaining` for the comparison bars and header
- `seasonStats`: per division — rounds run, `driverCount`, `uniqueWinners`, `totalDnfs`, `avgEntriesPerEvent`, `dnfRate`, `closestFinish`
- `lastCompletedEvents`, `formGuide`, `carStats`, `rules`, `divisionInfo`, `top3ByDivision`
- `nextEvent`: first upcoming event; the hero uses it when nothing is live, and the calendar shows its date
- `localization`: all displayed labels

## Important Implementation Rules

- Always build homepage data from `getHomeDivisions()`. It filters out divisions with `hideDriverStandingsLink`, so hidden divisions do not leak into cards or stats.
- `division.events` only contains active/finished events. Future events live in `division.upcomingEvents`.
- Homepage result URLs use `eventIndex`, not `event.id`. The hero stores the round number, so its results link is `roundNumber - 1`.
- A non-starter is flagged `isDnfEntry` as well as `isDnsEntry`, so DNF counts filter out `isDnsEntry` — otherwise a field that never drove reads as a field that retired.
- `excludeFromCarPerformance` only affects car stats. It does not hide a division from the rest of the homepage.
- Championship Battles and Top 3 show the points the standings are ordered by. With `sortByDropRoundPoints` they show ADR (with total points muted) once the displayed standings include more rounds than `dropLowestScoringRoundsNumber` (`useDropRoundPoints()`); before that ADR is 0 for everyone, so total points are shown.
- Standings-derived homepage sections must tolerate divisions with no processed events yet. Helpers should skip or return empty data instead of throwing.
- The countdown script runs in the document head, before the hero exists, so it re-runs on `DOMContentLoaded` to fill the clock without a placeholder flash.

## Editing Guidance

When changing the homepage:

1. Update data shaping in `src/output/html.js` if a section needs new fields.
2. Update `src/output/templates/home.hbs` for markup changes.
3. Update the `HOME PAGE` section of `assets/css/style.css` for presentation changes. The homepage owns `.home-card`, `.home-hero`, `.home-clock`, `.battle*`, `.stat*`, `.round-card`, `.recap*`, `.streak*`, `.car-stat*`, `.rule*` and `.top-drivers-table`; nothing else renders them.
4. Update localization keys if text changes.

Keep this file brief. If the implementation changes, document the current behavior and rules here rather than keeping feature-planning history.
