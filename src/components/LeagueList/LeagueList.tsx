import type { FC } from "react";
import type { League } from "../../api/types";
import LeagueListItem from "../LeagueListItem";
import styles from "./LeagueList.module.scss";

interface LeagueListProps {
  isLoading: boolean;
  isFailed: boolean;
  leagues: League[];
  selectedLeague: League | null;
  handleLeagueClick: (league: League) => void;
}

const LeagueList: FC<LeagueListProps> = ({
  isLoading,
  isFailed,
  leagues,
  selectedLeague,
  handleLeagueClick,
}) => {
  return (
    <>
      {isLoading && <div>Loading...</div>}
      {!isLoading && (
        <>
          {isFailed && (
            <div>Failed to load leagues. Please try again later.</div>
          )}
          {!isFailed && leagues.length === 0 && <div>No leagues found</div>}
          {!isFailed && leagues.length > 0 && (
            <div className={styles.listContainer}>
              <div className={styles.header}>
                <div className={styles.headerItem}>League</div>
                <div className={styles.headerItem}>Sport</div>
                <div className={styles.headerItem}>Alternate</div>
              </div>
              {leagues.map((league) => (
                <LeagueListItem
                  key={league.idLeague}
                  league={league}
                  isSelected={selectedLeague?.idLeague === league.idLeague}
                  onClick={handleLeagueClick}
                />
              ))}
            </div>
          )}
        </>
      )}
    </>
  );
};

export default LeagueList;
