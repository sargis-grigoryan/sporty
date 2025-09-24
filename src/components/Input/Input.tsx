import type { FC } from "react";
import classNames from "classnames";
import type { InputProps } from "./types";
import styles from "./Input.module.scss";

const Input: FC<InputProps> = ({
  value,
  onChange,
  placeholder,
  type = "text",
  name,
  className,
}) => {
  return (
    <input
      className={classNames(styles.input, className)}
      type={type}
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default Input;
