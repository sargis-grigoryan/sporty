import React, { type FC } from "react";

interface DropdownProps {
  options: string[];
  defaultOption?: { label: string; value: string };
  value: string;
  onChange: (value: string) => void;
  className?: string;
  disabled?: boolean;
}

const Dropdown: FC<DropdownProps> = ({
  options,
  defaultOption,
  value,
  onChange,
  className,
  disabled,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  return (
    <select
      className={className}
      value={value}
      onChange={handleChange}
      disabled={disabled ?? options.length === 0}
    >
      {defaultOption && (
        <option value={defaultOption.value}>{defaultOption.label}</option>
      )}
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
