import { useState, type FC } from "react";
import DebounceInput from "../DebounceInput";
import type { LeagueFilter } from "./types";
import Dropdown from "../Dropdown";
import styles from "./FilterSection.module.scss";

interface FilterSectionProps {
  onFilter: (filters: LeagueFilter) => void;
  sports: string[];
}

const FilterSection: FC<FilterSectionProps> = ({ onFilter, sports }) => {
  const [leagueSearchText, setLeagueSearchText] = useState<string>("");
  const [sportType, setSportType] = useState<string>("");

  const handleSearchChange = (value: string) => {
    const trimmedValue = value.trim();

    if (trimmedValue === leagueSearchText) return;

    setLeagueSearchText(trimmedValue);
    onFilter({ leagueSearchText: trimmedValue, sportType });
  };

  const handleSportChange = (sportType: string) => {
    const selectedSport = sportType;
    setSportType(selectedSport);
    onFilter({ leagueSearchText, sportType: selectedSport });
  };

  return (
    <div className={styles.filterContainer}>
      <div className={styles.inputHolder}>
        <DebounceInput
          placeholder="Search leagues..."
          className={styles.searchInput}
          value=""
          onChange={handleSearchChange}
        />
      </div>

      <div className={styles.inputHolder}>
        <Dropdown
          options={sports}
          defaultOption={{ label: "All Sports", value: "" }}
          value={sportType}
          onChange={handleSportChange}
          className={styles.sportSelect}
          disabled={sports.length === 0}
        />
      </div>
    </div>
  );
};

export default FilterSection;
