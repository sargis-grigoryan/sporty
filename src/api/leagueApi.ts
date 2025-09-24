import API_ROUTES from "../constants/apiRoutes";
import type {
  FetchAllLeaguesResponse,
  FetchLeagueAllSeasonsResponse,
} from "./types";

const fetchAllLeagues = async (): Promise<FetchAllLeaguesResponse> => {
  try {
    const response = await fetch(API_ROUTES.ALL_LEAGUES);
    if (!response.ok) {
      throw new Error(`Failed to fetch leagues: ${response.statusText}`);
    }
    const data: FetchAllLeaguesResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching leagues:", error);
    throw error;
  }
};

const fetchLeagueAllSeasons = (() => {
  const cache: Record<string, FetchLeagueAllSeasonsResponse> = {};

  return async (leagueId: string): Promise<FetchLeagueAllSeasonsResponse> => {
    if (cache[leagueId]) {
      return cache[leagueId];
    }

    try {
      const response = await fetch(
        `${API_ROUTES.LEAGUE_ALL_SEASONS}?badge=1&id=${leagueId}`
      );
      if (!response.ok) {
        throw new Error(
          `Failed to fetch league seasons: ${response.statusText}`
        );
      }
      const data: FetchLeagueAllSeasonsResponse = await response.json();

      cache[leagueId] = data;
      return data;
    } catch (error) {
      console.error(`Error fetching seasons for league ${leagueId}:`, error);
      throw error;
    }
  };
})();

export { fetchAllLeagues, fetchLeagueAllSeasons };
