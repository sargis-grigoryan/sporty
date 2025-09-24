import { useState, useEffect, useMemo } from "react";
import type { League } from "../../api/types";
import type { LeagueFilter } from "../../components/FilterSection";
import { fetchAllLeagues } from "../../api/leagueApi";

export function useLeaguesData() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isFailed, setIsFailed] = useState<boolean>(false);
  const [allLeagues, setAllLeagues] = useState<League[]>([]);

  useEffect(() => {
    setIsLoading(true);
    setIsFailed(false);

    fetchAllLeagues()
      .then((data) => setAllLeagues(data.leagues))
      .catch(() => {
        setAllLeagues([]);
        setIsFailed(true);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return { isLoading, isFailed, allLeagues };
}

export function useAllSports(allLeagues: League[]) {
  return useMemo(() => {
    const sportsWithDuplications = allLeagues.map((league) => league.strSport);
    const sportsSet = new Set<string>(sportsWithDuplications);
    return Array.from(sportsSet).sort();
  }, [allLeagues]);
}

export function useFilteredLeagues(
  allLeagues: League[],
  filters: LeagueFilter
) {
  return useMemo(() => {
    const normalizedSearchText = filters.leagueSearchText
      .replace(/\s+/g, "")
      .toLowerCase();
    if (!filters.leagueSearchText && !filters.sportType) return allLeagues;

    return allLeagues.filter((league) => {
      const matchesSearchText = league.strLeague
        .replace(/\s+/g, "")
        .toLowerCase()
        .includes(normalizedSearchText);

      const matchesSportType =
        !filters.sportType || league.strSport === filters.sportType;

      return matchesSearchText && matchesSportType;
    });
  }, [allLeagues, filters]);
}
