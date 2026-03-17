# Home Page (`home.hbs`)

Compact reference for the custom homepage rendered from `src/output/templates/home.hbs`.

## Files

- Template: `src/output/templates/home.hbs`
- Data assembly: `transformForHomeHTML()` in `src/output/html.js`
- Render entry point: `writeHomeHTML()` in `src/output/html.js`
- Shared homepage helpers: `getHomeDivisions()`, `getActiveEvents()`, `getLastCompletedEvents()`, `getChampionshipBattles()`, `getNextEvent()`, `getCarStats()`, `getFormGuide()`, `getSeasonStats()`

## When It Is Used

The homepage is rendered when `useStandingsForHome` is `false`. Otherwise the league uses standings as the landing page.

## Rendered Sections

Current `home.hbs` renders these sections in order:

1. Header with logo and site title
2. Current events hero
3. Next event card
4. `home-cards-grid` with:
   - Last Event Winners
   - Championship Battles
5. Hot Streaks
6. Car Performance
7. Season Statistics
8. Championship Rules
9. Top 3 by division

`historicalSeasonLinks` is still passed through data but is not rendered by the template.

## Main Data Passed To `home.hbs`

- `activeEvents`: active events across visible divisions; result links use `eventIndex`
- `endTime`, `activeCountry`: live countdown state used by `#homeCountdown`
- `nextEvent`: first upcoming event from `division.upcomingEvents`
- `lastCompletedEvents`: latest finished event per division
- `championshipBattles`: top-two gap summary per division
- `formGuide`: top three hot drivers across divisions
- `carStats`: most wins and best average points, or `null`
- `seasonStats`: per-division season summary
- `rules`, `divisionInfo`: rules card content
- `top3ByDivision`: standings card content
- `localization`: all displayed labels

## Important Implementation Rules

- Always build homepage data from `getHomeDivisions()`. It filters out divisions with `hideDriverStandingsLink`, so hidden divisions do not leak into cards or stats.
- `division.events` only contains active/finished events. Future events live in `division.upcomingEvents`.
- Homepage result URLs use `eventIndex`, not `event.id`.
- `excludeFromCarPerformance` only affects car stats. It does not hide a division from the rest of the homepage.
- Standings-derived homepage sections must tolerate divisions with no processed events yet. Helpers should skip or return empty data instead of throwing.

## Editing Guidance

When changing the homepage:

1. Update data shaping in `src/output/html.js` if a section needs new fields.
2. Update `src/output/templates/home.hbs` for markup changes.
3. Update `assets/css/style.css` for presentation changes.
4. Update localization keys if text changes.

Keep this file brief. If the implementation changes, document the current behavior and rules here rather than keeping feature-planning history.
