import { useState, type FC } from "react";
import type { League } from "../../api/types";
import type { LeagueFilter } from "../../components/FilterSection";
import Filters from "../../components/FilterSection";
import LeagueList from "../../components/LeagueList";
import { useAllSports, useFilteredLeagues, useLeaguesData } from "./hooks";
import styles from "./LeaguesPage.module.scss";

export const LeaguesPage: FC = () => {
  const [selectedLeague, setSelectedLeague] = useState<League | null>(null);
  const [filters, setFilters] = useState<LeagueFilter>({
    leagueSearchText: "",
    sportType: "",
  });

  const { allLeagues, isLoading, isFailed } = useLeaguesData();

  const allSports = useAllSports(allLeagues);

  const filteredLeagues = useFilteredLeagues(allLeagues, filters);

  const handleLeagueClick = (league: League) => {
    if (league.idLeague === selectedLeague?.idLeague) {
      setSelectedLeague(null);
      return;
    }

    setSelectedLeague(league);
  };

  const handleFilterChange = (newFilters: LeagueFilter) => {
    setFilters(newFilters);
    setSelectedLeague(null);
  };

  return (
    <div className={styles.pageContainer}>
      <h2 className={styles.pageTitle}>Leagues</h2>
      <Filters onFilter={handleFilterChange} sports={allSports} />
      <LeagueList
        isLoading={isLoading}
        isFailed={isFailed}
        leagues={filteredLeagues}
        selectedLeague={selectedLeague}
        handleLeagueClick={handleLeagueClick}
      />
    </div>
  );
};
