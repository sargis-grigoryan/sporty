import { useState, useLayoutEffect } from "react";
import { fetchLeagueAllSeasons } from "../../api/leagueApi";

export function useSeasonImage(isSelected: boolean, leagueId: string) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFailed, setIsFailed] = useState<boolean>(false);
  const [seasonImage, setSeasonImage] = useState<string | null>(null);

  useLayoutEffect(() => {
    if (!isSelected) {
      setSeasonImage(null);
      return;
    }

    if (seasonImage) return;

    setIsLoading(true);
    setIsFailed(false);

    fetchLeagueAllSeasons(leagueId)
      .then((data) => {
        if (data?.seasons && data.seasons.length > 0) {
          setSeasonImage(data.seasons[0].strBadge);
        }
      })
      .catch(() => {
        setSeasonImage(null);
        setIsFailed(true);
      })
      .finally(() => setIsLoading(false));
  }, [isSelected, leagueId, seasonImage]);

  return { seasonImage, isLoading, isFailed };
}
