# Sports Leagues – Frontend Assignment

## Overview

This project is a **single-page application (SPA)** built with **Vite + React + TypeScript**.  
The goal was to consume the [TheSportsDB API](https://www.thesportsdb.com/free_sports_api) and display a list of sports leagues with filtering and interactive options.

## Features

- Fetches and displays leagues from:  
  `https://www.thesportsdb.com/api/v1/json/3/all_leagues.php`
- Shows league details:
  - `strLeague`
  - `strSport`
  - `strLeagueAlternate`
- Includes a **search bar** to filter by league name (with **debounce** feature).
- Includes a **dropdown filter** to filter by sport type (e.g., Soccer, Basketball, Motorsport).
- Clicking a league triggers a request to the Seasons API to display a **season badge**:  
  `https://www.thesportsdb.com/api/v1/json/3/search_all_seasons.php`
- **Responsive design**: works across desktop and mobile screens.

## Tech Stack & Architecture

- **Vite** (for fast development build)
- **React + TypeScript** (component-based project architecture)
- Fully **component-based design**:
  - `LeagueList` for displaying all leagues
  - `LeagueListItem` for individual league details
  - `SeasonBadge` for displaying fetched badge
  - `FilterSection` for filtering by league name and sport type
  - `DebounceInput` for applying delay on input change (common component)
  - `Input` for having customized input component (common component)
  - `Dropdown` for having customized select component (common component)

## Additional Packages

- **classnames** → simplifies conditional `className` handling.
- **sass-embedded** → enables the use of **Sass** stylesheets for better modular and maintainable styling.

## Request Caching

Implemented **request caching** for the Seasons API (`search_all_seasons.php`) using a **closure function**.  
This ensures that once data is fetched for a league, it is stored in memory and reused, avoiding unnecessary repeat network requests.

## AI Tools Usage

- **ChatGPT** and **GitHub Copilot** were used to accelerate component markup and CSS style creation.
- All design decisions, state management, caching logic, debounce implementation, and debugging were handled manually.

## How to Run

1. Clone the repository:
   ```bash
   git clone <repo-url>
   cd <repo-folder>
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open the app in your browser at http://localhost:5173/
