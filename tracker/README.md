# Habit Tracker

A minimalist PWA habit tracker that lives on your phone's home screen. No account, no server, no app store — just add it to your home screen and go.

**Live:** https://lilnoobie.github.io/tracker/

---

## What it is

A small daily tracker built for people who want to build 1–5 physical habits without the overhead of a full app. It's designed around three tracking styles that cover most fitness and mobility habits:

- **Counter** — tap +/− to count passes or reps. Built for grease-the-groove style training where you do submaximal sets throughout the day. Working reps are auto-calculated at 50% of your current max.
- **Checklist** — a set of labeled sessions to check off (e.g. morning / midday / night). You name the sets yourself.
- **Checkbox** — a single done / not-done for the day. Good for stretching, mobility work, or anything you just want to confirm happened.

---

## Features

- **Onboarding** — set your name and configure up to 5 habits on first launch
- **Custom habits** — name each habit and pick its tracking type; checklist labels are fully customizable
- **Streak tracking** — consecutive days with all habits complete, with milestone celebrations at 3, 7, 14, and 30 days
- **Confetti** — fires when you complete all habits for the day
- **PR tracking** — log your max periodically and see your progress on a sparkline chart (counter habits only)
- **History** — 28-day calendar, personal bests, and a recent days log
- **Export** — download all your data as a JSON file
- **Offline** — works without a connection after first load (service worker)
- **Installable** — add to home screen on iOS and Android for a full-screen native feel

---

## How to use

### On iPhone (recommended)
1. Open https://lilnoobie.github.io/tracker/ in Safari
2. Tap the share icon → **Add to Home Screen**
3. Open the app from your home screen

### On Android
1. Open the link in Chrome
2. Tap the three-dot menu → **Add to Home Screen**

### First launch
The app walks you through setup:
1. Enter your name
2. Add at least one habit — give it a name and pick a type (counter, checklist, or checkbox)
3. Configure the details (max, goal, set labels, etc.)
4. Tap **Let's go**

You can add, edit, or remove habits anytime from the **Settings** tab.

---

## Habit types in detail

### Counter
Best for: pull-ups, dips, ring rows, or any grease-the-groove movement.

Set your current max (supports half-reps, e.g. 3.5) and a goal. The app calculates a working rep count at 50% of your max — a safe, submaximal load you can repeat many times a day without burning out. Tap + for each pass you complete.

Test your max every ~2 weeks and log it as a PR check-in in the **My Maxes** tab.

### Checklist
Best for: push-ups, rows, or any habit you do in multiple named sessions.

You define the labels (e.g. morning, midday, night — or whatever fits your schedule). Set reps per set and a goal max. Each session gets its own check row.

### Checkbox
Best for: stretching, splits, foam rolling, walks — anything that's just "did I do it today."

Optional description shows up as a prompt under the habit name (e.g. "after a workout or shower").

---

## Settings

- **Your name** — changes the greeting
- **Habits** — edit or delete any habit, add new ones (up to 5 total)
- **Export my data** — downloads a JSON file with everything stored in localStorage
- **Start over** — wipes all data and returns to onboarding

---

## Self-hosting / forking

No build step. The entire app is:

```
tracker/
  index.html      ← the whole app (HTML + CSS + JS, ~1400 lines)
  manifest.json   ← PWA manifest
  sw.js           ← service worker for offline caching
  icons/
    icon-192.png
    icon-512.png
```

To use this as your own:
1. Fork or copy the files to any static host (GitHub Pages, Netlify, etc.)
2. Update `manifest.json` if you want a different app name
3. That's it — no dependencies, no build tools, no Node

All data is stored in `localStorage` under the prefix `jae_tracker_`. Nothing leaves the device.

---

## Tech

- Vanilla JS, HTML, CSS — no frameworks, no dependencies
- localStorage for persistence (keyed by date)
- Service worker for offline support
- Canvas-based confetti
- SVG sparklines for PR progress charts
- PWA: manifest + iOS meta tags + standalone display mode
