import { useEffect, useState, useRef } from "react";

const useDebounce = (value: string, delay: number) => {
  const [state, setState] = useState(value);
  const timeOutID = useRef<number | undefined>();

  useEffect(() => {
    if (timeOutID.current !== undefined) {
      clearTimeout(timeOutID.current);
    }
    if (value) {
      timeOutID.current = window.setTimeout(() => setState(value), delay);
    }
    return () => {
      if (timeOutID.current) clearTimeout(timeOutID.current);
    };
  }, [value, delay]);

  return state;
};

export default useDebounce;
