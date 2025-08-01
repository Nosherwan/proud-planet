import useDebounce from "../hooks/useDebounce";
import { useState, useEffect } from "react";
import type { InputHTMLAttributes, ChangeEvent } from "react";

const DebouncedInput = ({
  callback,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & {
  // callback should be a useCallback memoized version otherwise breaks functionality
  callback: (value: string) => void;
}) => {
  const [state, setState] = useState("");
  const debounceState = useDebounce(state, 300);

  useEffect(() => {
    callback(debounceState);
  }, [debounceState, callback]);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    event?.preventDefault();
    setState(event.target.value);
  };

  return <input value={state} onChange={onChange} {...props} />;
};

export default DebouncedInput;
