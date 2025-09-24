import classNames from "classnames";
import type { FC } from "react";
import type { League } from "../../api/types";
import { useSeasonImage } from "./hooks";
import styles from "./LeagueListItem.module.scss";

interface LeagueListItemProps {
  league: League;
  isSelected: boolean;
  onClick: (league: League) => void;
}

const LeagueListItem: FC<LeagueListItemProps> = ({
  league,
  isSelected,
  onClick,
}) => {
  const { seasonImage, isLoading, isFailed } = useSeasonImage(
    isSelected,
    league.idLeague
  );

  return (
    <>
      <div
        className={classNames(styles.leagueItem, {
          [styles.selected]: isSelected,
        })}
      >
        <div
          className={styles.itemDetailsContainer}
          onClick={() => onClick(league)}
        >
          <div className={styles.itemDetail}>
            <div className={styles.detailTitle}>League</div>
            <div className={styles.detailValue}>{league.strLeague}</div>
          </div>
          <div className={styles.itemDetail}>
            <div className={styles.detailTitle}>Sport</div>
            <div className={styles.detailValue}>{league.strSport}</div>
          </div>
          <div className={styles.itemDetail}>
            <div className={styles.detailTitle}>Alternate</div>
            <div className={styles.detailValue}>
              {league.strLeagueAlternate}
            </div>
          </div>
        </div>
        {isSelected && (
          <div className={styles.imageContainer}>
            {isLoading && <div className={styles.loading}>Loading...</div>}
            {!isLoading && (
              <>
                {isFailed && (
                  <div className={styles.error}>
                    Failed to load image. Please try again later.
                  </div>
                )}
                {!isFailed && !seasonImage && (
                  <div className={styles.noImage}>No Image Available</div>
                )}
                {!isFailed && seasonImage && (
                  <img
                    src={seasonImage}
                    alt="Season Badge"
                    className={styles.image}
                  />
                )}
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default LeagueListItem;
