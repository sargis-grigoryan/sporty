import { useRef, useCallback, useState, useEffect } from "react";
import type { FC } from "react";
import type { InputProps } from "../Input/types";
import Input from "../Input";

const DebounceInput: FC<InputProps & { debounceTime?: number }> = ({
  debounceTime = 300,
  onChange,
  ...inputProps
}) => {
  const [inputValue, setInputValue] = useState(inputProps.value);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleChange = useCallback(
    (value: string) => {
      setInputValue(value);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => {
        onChange?.(value);
      }, debounceTime);
    },
    [onChange, debounceTime]
  );

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  return <Input {...inputProps} value={inputValue} onChange={handleChange} />;
};

export default DebounceInput;
