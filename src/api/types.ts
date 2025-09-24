export interface League {
  idLeague: string;
  strLeague: string;
  strSport: string;
  strLeagueAlternate: string;
}

export interface FetchAllLeaguesResponse {
  leagues: League[];
}

interface Season {
  strSeason: string;
  strBadge: string;
}

export type FetchLeagueAllSeasonsResponse = null | {
  seasons: Season[];
};
