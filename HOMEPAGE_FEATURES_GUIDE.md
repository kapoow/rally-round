# Homepage Enhancement Guide

This document provides concrete, implementable features for the rally-round project homepage, with code snippets that fit the existing architecture.

**Companion to [HOME.md](HOME.md):** HOME.md describes what the home page currently does and what data it receives. This guide is where we plan *how* to build new features, validate data pipelines, and decide what can work with the current codebase.

**✅ Code Validated:** All code snippets in this guide have been verified against the actual codebase implementation (`src/output/html.js`, `src/shared.js`, `src/output/shared.js`) to ensure correct property names, helper function signatures, and data structures.

---

## Table of Contents

1. [High Impact, Low Effort Features](#high-impact-low-effort-features)
2. [Medium Effort, High Value Features](#medium-effort-high-value-features)
3. [Implementation Priority](#implementation-priority)
4. [CSS Requirements](#css-requirements)

---

## High Impact, Low Effort Features

### 1. Last Event Recap Card ✅ IMPLEMENTED

**What it shows:** Most recent completed event from each division with winners, winning margins, and notable stats

**Data needed:** Already available from `division.events` array

**Status:** Fully implemented. One card "Last Event Winners" lists the most recent completed event per division. Uses `eventIndex` (position in events array) for result links, not `event.id`. Card uses `card--full-bg` for full-card background; location is shown in a span (different from event name when it's the country).

#### Implementation

**Add to `writeHomeHTML()` in `src/output/html.js`** (after `top3ByDivision`, as `lastCompletedEvents` array):

```javascript
lastCompletedEvents: (() => {
  const lastEventsByDivision = [];

  Object.entries(league.divisions || {}).forEach(([divName, division]) => {
    let mostRecentInDivision = null;
    let mostRecentDate = null;
    let mostRecentEventIndex = null;

    (division.events || []).forEach((event, eventIndex) => {
      if (event.eventStatus === eventStatuses.finished) {
        const eventDate = event.startDate ? new Date(event.startDate) : null;
        if (!mostRecentDate || (eventDate && eventDate > mostRecentDate)) {
          mostRecentDate = eventDate;
          mostRecentEventIndex = eventIndex;
          const winner = event.results?.driverResults?.[0];
          if (winner) {
            const { driver, country } = getDriverData(winner.name, divName);
            const eventLocation = getLocation(event);
            mostRecentInDivision = {
              name: event.name || event.locationName || eventLocation.countryName,
              location: eventLocation.countryName,
              locationCode: eventLocation.countryCode,
              divisionName: division.displayName || divName,
              divisionId: division.divisionName || divName,
              eventIndex: mostRecentEventIndex,
              winner: driver.name,
              winnerCountry: country.code,
              margin: event.results.driverResults[1]?.entry?.totalDiff || "Dominant",
              totalEntries: event.results.driverResults.length
            };
          }
        }
      }
    });

    if (mostRecentInDivision) lastEventsByDivision.push(mostRecentInDivision);
  });

  return lastEventsByDivision;
})(),
```

**Add to `templates/home.hbs`** inside `<div class="home-cards-grid">` (so it can sit side-by-side with Championship Battles on large screens):

```handlebars
{{#if lastCompletedEvents.length}}
<div class="card card--full-bg mb-1">
  <div class="card-header">
    <h3>🏆 Last Event Winners</h3>
  </div>
  <div class="card-body">
    {{#each lastCompletedEvents}}
    <div class="last-event-division">
      <div class="last-event-header">
        <h4>{{this.divisionName}} - {{this.name}}</h4>
        <span class="text-muted">{{this.location}}</span>
      </div>
      <div class="winner-info">
        <img src="./assets/country-flags/{{this.winnerCountry}}.png" class="img-sm" alt="{{this.winnerCountry}}" />
        <strong>{{this.winner}}</strong>
        <span class="winner-margin">won by {{this.margin}}</span>
      </div>
      <div class="last-event-meta">
        <span class="text-muted">{{this.totalEntries}} entries</span>
        <a href="./{{this.divisionId}}-{{this.eventIndex}}-driver-results.html" class="home-btn-inline">View Results</a>
      </div>
    </div>
    {{#unless @last}}<hr class="last-event-separator">{{/unless}}
    {{/each}}
  </div>
</div>
{{/if}}
```

---

### 2. Championship Battle Tracker ✅ IMPLEMENTED

**What it shows:** Gap between top drivers, who's fighting, and whether championship is mathematically open

**Data needed:** Standings data (already calculated) + events remaining

**Status:** Implemented. Uses `(division.events || [])` for safety when a division has no events. Card uses `card--full-bg` and sits in `home-cards-grid` next to Last Event Winners on large screens. Includes "View Standings" link per division.

#### Implementation

**Add to `writeHomeHTML()` in `src/output/html.js`** (after `lastCompletedEvents`):

```javascript
championshipBattles: Object.keys(league.divisions || {}).map(divName => {
  const division = league.divisions[divName];
  try {
    const standingsData = transformForStandingsHTML(division, "driver");
    const rows = standingsData.rows || [];
    if (rows.length < 2) return null;

    const leader = rows[0];
    const secondPlace = rows[1];
    const gap = leader.standing.totalPoints - secondPlace.standing.totalPoints;

    const completedEvents = (division.events || []).filter(e =>
      e.eventStatus === eventStatuses.finished
    ).length;
    const totalEvents = (division.events || []).length;
    const eventsRemaining = totalEvents - completedEvents;

    const maxPointsPerEvent = division.points?.overall?.[0] || 25;
    const totalPointsRemaining = eventsRemaining * maxPointsPerEvent;

    return {
      divisionName: standingsData.title || divName,
      divisionId: division.divisionName || divName,
      leader: leader.driver.name,
      leaderCountry: leader.country.code,
      leaderPoints: leader.standing.totalPoints,
      secondPlace: secondPlace.driver.name,
      secondPlaceCountry: secondPlace.country.code,
      secondPlacePoints: secondPlace.standing.totalPoints,
      gap,
      eventsRemaining,
      mathematicallyOpen: gap < totalPointsRemaining,
      tightBattle: gap < maxPointsPerEvent * 2,
    };
  } catch (e) {
    debug(`championship battle for division ${divName}: ${e}`);
    return null;
  }
}).filter(Boolean),
```

**Add to `templates/home.hbs`** inside `<div class="home-cards-grid">` (after the Last Event Winners card):

```handlebars
{{#if championshipBattles.length}}
<div class="card card--full-bg mb-1">
  <div class="card-header">
    <h3>Championship Battles</h3>
  </div>
  <div class="card-body">
    {{#each championshipBattles}}
    <div class="battle-item {{#if this.tightBattle}}tight-battle{{/if}}">
      <h4>{{this.divisionName}}</h4>
      <div class="battle-leaders">
        <div class="battle-driver">
          <img src="./assets/country-flags/{{this.leaderCountry}}.png" class="img-sm" alt="{{this.leaderCountry}}" />
          <strong>{{this.leader}}</strong>
          <span class="points">{{this.leaderPoints}} pts</span>
        </div>
        <div class="battle-gap">
          <span class="gap-value">{{this.gap}} pt gap</span>
          {{#if this.tightBattle}}
          <span class="gap-status tight">Tight!</span>
          {{else if this.mathematicallyOpen}}
          <span class="gap-status">Still Open</span>
          {{else}}
          <span class="gap-status comfortable">Comfortable Lead</span>
          {{/if}}
        </div>
        <div class="battle-driver">
          <img src="./assets/country-flags/{{this.secondPlaceCountry}}.png" class="img-sm" alt="{{this.secondPlaceCountry}}" />
          {{this.secondPlace}}
          <span class="points">{{this.secondPlacePoints}} pts</span>
        </div>
      </div>
      <p class="battle-remaining">{{this.eventsRemaining}} events remaining</p>
      <a href="./{{this.divisionId}}-driver-standings.html" class="home-btn-inline">View Standings</a>
    </div>
    {{#unless @last}}<hr class="last-event-separator">{{/unless}}
    {{/each}}
  </div>
</div>
{{/if}}
```

---

### 3. Next Event Preview ✅ IMPLEMENTED

**What it shows:** Upcoming event (if scheduled)

**Data needed:** `division.upcomingEvents` array (future events only)

**Status:** Fully implemented. Shows upcoming event with division, location, country flag, and formatted start date/time. Card appears after the hero section and before the home-cards-grid.

**Architecture Note:** Future events are now stored separately in `division.upcomingEvents` array. The event pipeline splits fetched events into two arrays: `division.events` (active/finished) and `division.upcomingEvents` (future). This keeps future events out of the standings/results processing pipeline.

#### Implementation

**Add to `writeHomeHTML()` in `src/output/html.js`:**

```javascript
nextEvent: (() => {
  // Find next upcoming event from upcomingEvents arrays
  let nextEvent = null;

  Object.entries(league.divisions || {}).forEach(([divName, division]) => {
    const upcoming = division.upcomingEvents?.[0];

    if (upcoming && !nextEvent) {
      const upcomingLocation = getLocation(upcoming);

      nextEvent = {
        name:
          upcoming.name ||
          upcoming.locationName ||
          upcomingLocation.countryName,
        location: upcomingLocation.countryName || "",
        locationCode: upcomingLocation.countryCode,
        divisionName: division.displayName || divName,
        divisionId: division.divisionName || divName,
        startDate: upcoming.startDate
          ? moment(upcoming.startDate).format("MMMM D, YYYY [at] h:mm A")
          : null
      };
    }
  });

  return nextEvent;
})(),
```

**Add to `templates/home.hbs`** (after active events hero):

```handlebars
{{#if nextEvent}}
<div class="card mb-1 next-event-card">
  <div class="card-header">
    <h3>📅 Next Event: {{nextEvent.name}}</h3>
  </div>
  <div class="card-body">
    <p>
      <img src="./assets/country-flags/{{nextEvent.locationCode}}.png" class="img-sm" alt="{{nextEvent.locationCode}}" />
      <strong>{{nextEvent.divisionName}}</strong> - {{nextEvent.location}}
    </p>
    {{#if nextEvent.startDate}}
    <p>Starts: {{nextEvent.startDate}}</p>
    {{/if}}
  </div>
</div>
{{/if}}
```

---

## Medium Effort, High Value Features

### 4. Car Performance Stats ✅ IMPLEMENTED

**What it shows:** Most successful car overall, highest win rate, best average finish

**Requires:** Aggregating results across all events by car name

**Status:** Fully implemented. Shows most successful car by wins and best average performer by points. Card appears before Championship Rules.

#### Implementation

**Add to `writeHomeHTML()` in `src/output/html.js`:**

```javascript
carStats: (() => {
  const carPerformance = {};

  Object.entries(league.divisions || {}).forEach(([divName, division]) => {
    division.events.forEach(event => {
      if (event.eventStatus === eventStatuses.finished && event.results?.driverResults) {
        event.results.driverResults.forEach((result, index) => {
          const carName = result.entry?.vehicleName;
          if (!carName) return;

          if (!carPerformance[carName]) {
            carPerformance[carName] = { wins: 0, podiums: 0, entries: 0, totalPoints: 0 };
          }

          carPerformance[carName].entries++;
          if (index === 0) carPerformance[carName].wins++;
          if (index < 3) carPerformance[carName].podiums++;
          carPerformance[carName].totalPoints += result.totalPoints || 0;
        });
      }
    });
  });

  // Find most successful
  const sortedCars = Object.entries(carPerformance)
    .map(([name, stats]) => ({
      name,
      ...stats,
      avgPoints: (stats.totalPoints / stats.entries).toFixed(1),
      winRate: ((stats.wins / stats.entries) * 100).toFixed(1)
    }))
    .sort((a, b) => b.wins - a.wins || b.avgPoints - a.avgPoints);

  return {
    mostWins: sortedCars[0] || null,
    bestAverage: sortedCars.sort((a, b) => b.avgPoints - a.avgPoints)[0] || null
  };
})(),
```

**Add to `templates/home.hbs`:**

```handlebars
{{#if carStats}}
<div class="card mb-1">
  <div class="card-header">
    <h3>🏎️ Car Performance</h3>
  </div>
  <div class="card-body">
    {{#if carStats.mostWins}}
    <div class="car-stat-item">
      <h4>Most Wins</h4>
      <p><strong>{{carStats.mostWins.name}}</strong></p>
      <p>{{carStats.mostWins.wins}} wins • {{carStats.mostWins.podiums}} podiums • {{carStats.mostWins.winRate}}% win rate</p>
    </div>
    {{/if}}
    {{#if carStats.bestAverage}}
    <div class="car-stat-item">
      <h4>Best Average Performance</h4>
      <p><strong>{{carStats.bestAverage.name}}</strong></p>
      <p>{{carStats.bestAverage.avgPoints}} avg points • {{carStats.bestAverage.entries}} entries</p>
    </div>
    {{/if}}
  </div>
</div>
{{/if}}
```

---

### 5. Form Guide / Hot Streak Tracker ✅

**What it shows:** Drivers on winning streaks, recent form over last 3 events

**Requires:** Analyzing recent event results

**Status:** ✅ IMPLEMENTED (commit bc9b9b3)

#### Implementation

**Added to `writeHomeHTML()` in `src/output/html.js` (after `carStats`):**

```javascript
// Form Guide: drivers on hot streaks (last 3 events)
formGuide: (() => {
  const hotDrivers = [];

  Object.entries(league.divisions || {}).forEach(([divName, division]) => {
    const driverForm = {};

    // Get last 3 completed events in this division
    const recentEvents = division.events
      .filter(e => e.eventStatus === eventStatuses.finished)
      .slice(-3);

    recentEvents.forEach(event => {
      event.results?.driverResults?.forEach((result, index) => {
        const driverName = result.name;
        if (!driverForm[driverName]) {
          driverForm[driverName] = {
            recentFinishes: [],
            wins: 0,
            podiums: 0
          };
        }

        driverForm[driverName].recentFinishes.push(index + 1);
        if (index === 0) driverForm[driverName].wins++;
        if (index < 3) driverForm[driverName].podiums++;
      });
    });

    // Find hot drivers in this division (2+ wins or 3 podiums)
    Object.entries(driverForm)
      .filter(([_, form]) => form.wins >= 2 || form.podiums >= 3)
      .forEach(([name, form]) => {
        const { driver, country } = getDriverData(name, divName);
        hotDrivers.push({
          name: driver.name,
          country: country.code,
          wins: form.wins,
          podiums: form.podiums,
          recentFinishes: form.recentFinishes,
          divisionName: division.displayName || divName
        });
      });
  });

  // Sort all hot drivers and return top 3
  return hotDrivers
    .sort((a, b) => b.wins - a.wins || b.podiums - a.podiums)
    .slice(0, 3);
})(),
```

**Added to `templates/home.hbs` (before Car Performance card):**

```handlebars
{{#if formGuide.length}}
<div class="card mb-1">
  <div class="card-header">
    <h3>🔥 Hot Streaks</h3>
  </div>
  <div class="card-body">
    {{#each formGuide}}
    <div class="form-guide-item">
      <div class="form-guide-driver">
        <img src="./assets/country-flags/{{this.country}}.png" class="img-sm" alt="{{this.country}}" />
        <strong>{{this.name}}</strong>
        <span class="division-badge">{{this.divisionName}}</span>
      </div>
      <div class="form-guide-stats">
        <span>{{this.wins}} wins • {{this.podiums}} podiums in last 3 events</span>
      </div>
      <div class="form-guide-recent">
        Recent finishes: {{#each this.recentFinishes}}{{this}}{{#unless @last}}, {{/unless}}{{/each}}
      </div>
    </div>
    {{#unless @last}}<hr class="last-event-separator">{{/unless}}
    {{/each}}
  </div>
</div>
{{/if}}
```

**CSS added to `assets/css/style.css` (after Car Performance Stats):**

```css
/* Form Guide */
.form-guide-item {
  padding: 1rem 0;
  border-bottom: 1px solid #dee2e6;
}

.form-guide-item:last-child {
  border-bottom: none;
}

.form-guide-driver {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.division-badge {
  background-color: #e9ecef;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.8rem;
  color: #495057;
}

.form-guide-stats {
  color: #6c757d;
  font-size: 0.9rem;
  margin-bottom: 0.25rem;
}

.form-guide-recent {
  color: #868e96;
  font-size: 0.85rem;
}
```

**Notes:**
- Tracks form per-division (ensures drivers in multiple divisions are tracked separately)
- Aggregates hot drivers from all divisions, then sorts by wins/podiums
- Shows top 3 overall across all divisions
- Requires at least 2+ wins OR 3 podiums in last 3 completed events
- Positioned before Car Performance card on homepage

---

### 6. Season Statistics Summary ✅ IMPLEMENTED

**What it shows:** Per-division season stats (events completed, avg entries, DNF rate, closest finish)

**Requires:** Aggregating across completed events per division

**Status:** Fully implemented. Shows statistics per division with events completed, average entries per event, DNF rate, and closest finish. Card appears after Hot Streaks.

#### Implementation

**Add to `writeHomeHTML()` in `src/output/html.js`:**

```javascript
seasonStats: (() => {
  const divisionStats = [];

  Object.entries(league.divisions || {}).forEach(([divName, division]) => {
    let completedEvents = 0;
    let totalEntries = 0;
    let totalDNFs = 0;
    let closestFinish = { margin: Infinity, event: null };

    division.events.forEach(event => {
      if (event.eventStatus === eventStatuses.finished) {
        completedEvents++;
        const results = event.results?.driverResults || [];
        totalEntries += results.length;

        // Count DNFs (not DNS)
        const dnfs = results.filter(r => r.entry?.isDnfEntry).length;
        totalDNFs += dnfs;

        // Check for closest finish
        if (results.length >= 2 && results[1].entry?.totalDiff) {
          const margin = timeToSeconds(results[1].entry.totalDiff);
          if (margin < closestFinish.margin) {
            const { driver: winner } = getDriverData(results[0].name, divName);
            const { driver: secondPlace } = getDriverData(
              results[1].name,
              divName
            );
            const eventLocation = getLocation(event);
            closestFinish = {
              margin: results[1].entry.totalDiff,
              event: event.name || event.locationName,
              location: eventLocation.countryName,
              winner: winner.name,
              secondPlace: secondPlace.name
            };
          }
        }
      }
    });

    const avgEntriesPerEvent =
      completedEvents > 0 ? Math.round(totalEntries / completedEvents) : 0;
    const dnfRate =
      totalEntries > 0 ? ((totalDNFs / totalEntries) * 100).toFixed(1) : 0;

    divisionStats.push({
      divisionName: division.displayName || divName,
      totalEvents: division.events.length,
      completedEvents,
      eventsRemaining: division.events.length - completedEvents,
      avgEntriesPerEvent,
      dnfRate,
      closestFinish: closestFinish.event ? closestFinish : null
    });
  });

  return divisionStats;
})(),
```

**Add to `templates/home.hbs`:**

```handlebars
{{#if seasonStats.length}}
<div class="card mb-1">
  <div class="card-header">
    <h3>📊 Season Statistics</h3>
  </div>
  <div class="card-body">
    {{#each seasonStats}}
    <div class="season-stats-division">
      <h4>{{this.divisionName}}</h4>
      <div class="season-stats-grid">
        <div class="stat-item">
          <span class="stat-label">Events Completed</span>
          <span class="stat-value">{{this.completedEvents}} / {{this.totalEvents}}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">Avg. Entries per Event</span>
          <span class="stat-value">{{this.avgEntriesPerEvent}}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">DNF Rate</span>
          <span class="stat-value">{{this.dnfRate}}%</span>
        </div>
        {{#if this.closestFinish}}
        <div class="stat-item stat-highlight">
          <span class="stat-label">Closest Finish</span>
          <span class="stat-value">{{this.closestFinish.margin}}</span>
          <span class="stat-detail">{{this.closestFinish.winner}} vs {{this.closestFinish.secondPlace}} • {{this.closestFinish.event}}</span>
        </div>
        {{/if}}
      </div>
    </div>
    {{#unless @last}}<hr class="last-event-separator">{{/unless}}
    {{/each}}
  </div>
</div>
{{/if}}
```

---

## Implementation Priority

### Phase 1 (This Weekend - 1-2 hours)
1. **Last Event Recap** - Shows what just happened
2. **Championship Battle Tracker** - Drama and tension

### Phase 2 (Next Week - 2-3 hours)
3. **Next Event Preview** - What's coming up
4. **Form Guide** - Who's hot right now

### Phase 3 (When You Have Time - 3-4 hours)
5. **Car Performance Stats** - For the gearheads
6. **Season Statistics Summary** - Overall context

---

## CSS Requirements

**Current layout (implemented):** The hero is full width; then a wrapper `home-cards-grid` contains Last Event Winners and Championship Battles side by side on large screens (min-width: 900px), with fluid column widths (`grid-template-columns: auto auto`). Both cards use `card--full-bg` so the background fills the whole card. The Previous Seasons aside has been removed. Styles below match `assets/css/style.css` for the implemented features.

Add or extend styles in your main CSS file:

```css
/* Wrapper for Last Event Winners + Championship Battles (side-by-side on large screens) */
.home-cards-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  margin-bottom: 0.25rem;
}

@media (min-width: 900px) {
  .home-cards-grid {
    grid-template-columns: auto auto; /* fluid: each card sizes to content */
  }
}

/* Full-card background (card + body) so header and body look unified */
.card--full-bg {
  background-color: var(--white);
}

.card--full-bg .card-body {
  background: none;
}

/* Last Event Winners (per-division entries) */
.last-event-division {
  padding: 0.75rem 0;
}

.last-event-header {
  margin-bottom: 0.5rem;
}

.last-event-header h4 {
  margin: 0 0 0.25rem 0;
  font-size: 1rem;
  color: var(--text);
}

.last-event-separator {
  margin: 0.75rem 0;
  border: none;
  border-top: 1px solid var(--border);
}

.winner-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
}

.winner-margin {
  color: #6c757d;
  font-size: 0.95rem;
  font-weight: normal;
}

.last-event-meta {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
}

.home-btn-inline {
  display: inline-block;
  padding: 0.4rem 0.8rem;
  background: var(--white);
  color: var(--primary);
  text-decoration: none;
  border-radius: 4px;
  font-size: 0.85rem;
  border: 1px solid var(--primary);
}

.home-btn-inline:hover {
  background: var(--primary);
  color: var(--white);
}

/* Championship Battles */
.battle-item {
  padding: 0.75rem 0;
}

.battle-item h4 {
  margin: 0 0 0.5rem 0;
  font-size: 1rem;
  color: var(--text);
}

.battle-leaders {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  flex-wrap: wrap;
  margin-bottom: 0.5rem;
}

.battle-driver {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
}

.battle-driver .points {
  color: var(--text-muted, #6c757d);
  font-size: 0.9rem;
}

.battle-gap {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
}

.gap-value {
  font-weight: 600;
  font-size: 0.95rem;
}

.gap-status {
  font-size: 0.8rem;
  color: var(--text-muted, #6c757d);
}

.gap-status.tight {
  color: var(--primary);
  font-weight: 600;
}

.gap-status.comfortable {
  color: var(--text-muted, #6c757d);
}

.battle-remaining {
  margin: 0 0 0.5rem 0;
  font-size: 0.9rem;
  color: var(--text-muted, #6c757d);
}

.battle-item.tight-battle .battle-gap .gap-value {
  color: var(--primary);
}

/* Next Event Preview */
.next-event-card .card-body p {
  margin: 0.5rem 0;
}

/* Car Performance Stats */
.car-stat-item {
  padding: 1rem 0;
  border-bottom: 1px solid #dee2e6;
}

.car-stat-item:last-child {
  border-bottom: none;
}

.car-stat-item h4 {
  margin-bottom: 0.5rem;
  color: #495057;
  font-size: 0.9rem;
  text-transform: uppercase;
}

.car-stat-item p {
  margin: 0.25rem 0;
}

/* Form Guide */
.form-guide-item {
  padding: 1rem 0;
  border-bottom: 1px solid #dee2e6;
}

.form-guide-item:last-child {
  border-bottom: none;
}

.form-guide-driver {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.division-badge {
  background-color: #e9ecef;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.8rem;
  color: #495057;
}

.form-guide-stats {
  color: #6c757d;
  font-size: 0.9rem;
  margin-bottom: 0.25rem;
}

.form-guide-recent {
  color: #868e96;
  font-size: 0.85rem;
}

/* Season Stats */
.season-stats-division {
  padding: 0.75rem 0;
}

.season-stats-division h4 {
  margin: 0 0 1rem 0;
  font-size: 1rem;
  color: var(--text);
}

.season-stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.stat-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.stat-label {
  font-size: 0.85rem;
  color: #6c757d;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: bold;
  color: #212529;
}

.stat-detail {
  font-size: 0.8rem;
  color: #6c757d;
  margin-top: 0.25rem;
}

.stat-highlight {
  grid-column: 1 / -1;
  padding: 1rem;
  background-color: #fff3cd;
  border-radius: 0.25rem;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .battle-leaders {
    flex-direction: column;
  }
  
  .battle-driver {
    width: 100%;
  }
  
  .battle-gap {
    width: 100%;
    margin: 0.5rem 0;
  }
  
  .season-stats-grid {
    grid-template-columns: 1fr;
  }
}
```

---

## Testing Checklist

After implementing each feature, test:

- [ ] Feature appears when data is available
- [ ] Feature is hidden when no data exists
- [ ] Links work correctly
- [ ] Country flags display properly
- [ ] Responsive layout works on mobile
- [ ] No JavaScript errors in console
- [ ] Data calculations are accurate

---

## Event Pipeline Architecture

**IMPORTANT:** The project uses a split event pipeline (as of the future events refactor):

- **`division.events`** - Array of **processed events only** (active + finished)
  - These events flow through the full processing pipeline (standings calculation, results, etc.)
  - Safe to access `event.results`, `event.standings`, etc.

- **`division.upcomingEvents`** - Array of **future events only**
  - These events are separated before processing and do NOT have results/standings
  - Used only for display purposes (Next Event card)
  - Determined by: `event.eventStatus === eventStatuses.future` OR (for RBR) `!event.eventStatus && event.startDate && moment(event.startDate).isAfter(moment())`

**When iterating events:**
- Use `division.events` for any feature that needs results/standings data
- Use `division.upcomingEvents` for upcoming event previews
- Do NOT filter `division.events` for future events - they won't be there!

**Caching behavior:**
- **Active events**: ALWAYS fetch from API (never cached) - `cacheLeaderboard` is `false`
- **Finished events**: Cached after first fetch, reused on subsequent runs - `cacheLeaderboard` is `true`
- Cache location: `./hidden/cache/{club-name}/` locally, can be downloaded from S3
- Use `KEEP_LOCAL_CACHE=true` to preserve cache between runs (otherwise cleared on startup)

**RBR vs WRC event handling:**
- **WRC events**: Have explicit `eventStatus` (future/active/finished)
- **RBR events**: May have `undefined` status, determined by:
  - Has results → `finished`
  - Has `endTime` after current time (first found) → `active`
  - Otherwise → `undefined` (treated as future)
- Both systems work with the event pipeline split

## Key Implementation Learnings

**From implementing features:**

1. **writeHomeHTML refactor (Feb 2026):**
   - Originally: 412-line monolithic function with all data prep inline
   - Problem: Violated codebase pattern used by `writeStandingsHTML()` and `writeDriverResultsHTML()`
   - Solution: Extracted to helper functions + `transformForHomeHTML()` (matches existing pattern)
   - New pattern: `writeHomeHTML()` → `transformForHomeHTML()` → 9 helper functions
   - Benefits: Testable sections, easier to add/remove features, consistent architecture
   - Note: Historical code snippets in this guide show old inline pattern but concepts remain valid

2. **Season Statistics aggregation:**
   - Initially implemented as global stats across all divisions
   - User feedback: Should be per-division to avoid confusing totals
   - Solution: Return array of division stats, iterate in template

2. **Optional chaining still needed in `shared.js`:**
   - `getAllResults()` uses `.find()` which returns `undefined` if driver didn't participate
   - This is normal (not related to future events) - drivers can miss events
   - Keep: `result?.totalPoints || 0`

3. **Event pipeline split reasoning:**
   - Original approach: Future events in main array, guards everywhere (5+ files)
   - Problem: Fragile, easy to miss guards, optional chaining needed in many places
   - Solution: Separate arrays at source, future events never enter processing
   - Result: Cleaner code, fewer guards, more maintainable

4. **WRC nationality codes:**
   - Added 89 new codes from official WRC racenet site (total: 173 entries)
   - Missing codes: 90 (Barbados), 105 (Madagascar), 112 (Moldovan), 114 (Filipino)
   - Source: `/temp-nationalities.js` extracted from WRC web app

5. **Next Event date formatting:**
   - Use `moment().format("MMMM D, YYYY [at] h:mm A")` for user-friendly display
   - Don't show raw ISO strings to users

6. **Country flags in Next Event:**
   - Always include country flag for visual consistency
   - Use `locationCode` from `getLocation(event)`

## Notes for AI Assistants

When implementing these features:

1. **New data preparation should follow the refactored pattern:**
   - Create a new helper function (e.g., `getMyFeature()`) in `src/output/html.js` before `transformForHomeHTML()`
   - Call it from `transformForHomeHTML()` to include in the data object
   - See existing helpers: `getActiveEvents()`, `getLastCompletedEvents()`, etc. for examples
   - Do NOT add inline logic to `writeHomeHTML()` - it's now a thin wrapper
2. Template code goes in `src/output/templates/home.hbs`
3. CSS styles go in `assets/css/style.css`
4. **Helper functions already available:**
   - `getDriverData(driverName, divisionName)` - Returns `{ driver, country, car, carBrand }`
   - `getLocation(event)` - Returns `{ countryName, countryCode }` (use this instead of accessing `event.location` directly)
   - `timeToSeconds(timeString)` - Converts "MM:SS.mmm" to seconds (line 111)
   - `transformForStandingsHTML(division, type)` - Returns standings data with `.rows` array (line 382)
5. **Event status constants** (from `src/shared.js`):
   - `eventStatuses.active` - "Active"
   - `eventStatuses.finished` - "Finished" (NOT "completed")
   - `eventStatuses.future` - "Future" (NOT "notStarted")
6. **Important data structures:**
   - `event.location` is a STRING (e.g., "MONARO"), not an object - use `getLocation(event)` to get location info
   - `event.name` may be undefined for RBR events - use fallback: `event.name || event.locationName || eventLocation.countryName`
   - `result.entry.vehicleName` contains the car name
   - `result.entry.isDnfEntry` / `result.entry.isDnsEntry` for DNF/DNS status
   - `result.totalPoints` for points (NOT `result.points`)
   - `result.entry.totalDiff` for time differences (NOT `result.totalDiff`)
7. **Event URLs:**
   - Format: `${divisionName}-${eventIndex}-driver-results.html`
   - Use `eventIndex` (position in events array), NOT `event.id`
   - When iterating events, track the index: `division.events.forEach((event, eventIndex) => ...)`
8. The project uses Handlebars templating
9. Country flags are stored in `./assets/country-flags/{code}.png`
10. **Testing workflow:**
    - Use `npm run preview` to quickly generate and view test-e2e homepage
    - Use `npm run preview:watch` for auto-regeneration during development
    - When adding test events: create fixture CSV files in `src/__fixtures__/e2e/` with format `{eventId}.csv` and `{eventId}_standings.csv`
    - Empty CSV files (header only) will make events appear as "future" status for testing Next Event Preview
11. **Event Status Logic:**
    - Events are split at fetch time into `division.events` and `division.upcomingEvents`
    - Split logic (in `src/index.js`):
      - WRC: `event.eventStatus === eventStatuses.future` → upcomingEvents
      - RBR: `!event.eventStatus && event.startDate && moment(event.startDate).isAfter(moment())` → upcomingEvents
      - All others → events (processed through standings/results pipeline)
    - After split, `division.events` only contains active/finished events
    - No need to filter for future events - they're in separate array

---

## Future Ideas (Not Implemented Yet)

These are ideas for future enhancements:

- **Team Battle Visualization** - Side-by-side constructor standings with charts
- **Stage Statistics** - Most stages won, fastest stage times
- **Driver Rivalries** - Head-to-head comparisons between specific drivers
- **Location Statistics** - Performance by surface type or country
- **Historical Comparisons** - "On this day" or season-over-season comparisons
- **Live Event Ticker** - Real-time updates during active events (would require WebSocket or polling)

---

## Questions or Issues?

If you encounter issues:

1. Check that `eventStatuses` constants match your usage
2. Verify `getDriverData()` function signature
3. Ensure `transformForStandingsHTML()` is accessible in scope
4. Check that event objects have expected properties (eventStatus, results, etc.)
5. Test with different league configurations (some leagues may not have all data types)
6. **Next Event Preview not showing?** Check if:
   - `division.upcomingEvents` array exists and has items
   - Event fixture CSV files exist in `src/__fixtures__/e2e/` for test data (empty CSV = future event)
   - Events are being split correctly in `src/index.js` (WRC: by status, RBR: by date check)
7. **Event status confusion?** Remember:
   - `division.events` = active + finished only (processed events)
   - `division.upcomingEvents` = future events only (no results/standings)
   - RBR events without `endTime` and without results have `undefined` status but still get categorized correctly by date check
8. **Missing nationality warnings?** Check `src/fetch/wrc/nationalities.csv` has all required codes (173 entries currently)
9. **Cache not working?** Remember:
   - Active events are NEVER cached (always fetch fresh)
   - Set `KEEP_LOCAL_CACHE=true` to preserve cache between runs
   - Cache is cleared on startup by default (for GitHub Actions workflow)
10. **Stats showing wrong totals?** Ensure you're aggregating per-division, not globally (see Season Statistics implementation)
