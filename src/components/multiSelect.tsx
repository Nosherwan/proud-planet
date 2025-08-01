import chroma from "chroma-js";
import Select from "react-select";
import type { StylesConfig, MultiValue } from "react-select";
import type { ColourOption } from "../types/colourOption";
import { getQuestionText } from "../utils/generic";
import { useCallback, useState } from "react";

const colourStyles: StylesConfig<ColourOption, true> = {
  control: (styles) => ({
    ...styles,
    backgroundColor: "white",
    borderRadius: "6px",
    borderColor: " #99a1af",
  }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    const color = chroma(data.color);
    return {
      ...styles,
      backgroundColor: isDisabled
        ? undefined
        : isSelected
          ? data.color
          : isFocused
            ? color.alpha(0.1).css()
            : undefined,
      color: isDisabled
        ? "#ccc"
        : isSelected
          ? chroma.contrast(color, "white") > 2
            ? "white"
            : "black"
          : data.color,
      cursor: isDisabled ? "not-allowed" : "default",
      ":active": {
        ...styles[":active"],
        backgroundColor: !isDisabled
          ? isSelected
            ? data.color
            : color.alpha(0.3).css()
          : undefined,
      },
    };
  },
  multiValue: (styles, { data }) => {
    const color = chroma(data.color);
    return {
      ...styles,
      backgroundColor: color.alpha(0.1).css(),
      borderRadius: "calc(infinity * 1px)",
    };
  },
  multiValueLabel: (styles, { data }) => ({
    ...styles,
    color: data.color,
  }),
  multiValueRemove: (styles, { data }) => ({
    ...styles,
    color: data.color,
    ":hover": {
      backgroundColor: data.color,
      color: "white",
    },
    borderRadius: "calc(infinity * 1px)",
  }),
};

export default ({
  colourOptions,
  name,
  onSelectionChange,
}: {
  colourOptions: ColourOption[];
  name: string;
  onSelectionChange?: (selectedOptions: string[][]) => void;
}) => {
  const [state, setState] = useState<string[]>();
  const onChange = useCallback((options: MultiValue<ColourOption> | null) => {
    // NOTE: OnChange happens either on addition or removal, so one will happen not both
    const currentItems = options?.map((o) => o.value) ?? [];
    setState((prev: string[] | undefined) => {
      const existing =
        prev?.filter((item) => currentItems?.includes(item)) ?? [];
      const removed =
        prev?.filter((item) => !currentItems?.includes(item)) ?? [];
      const added =
        currentItems?.filter((item) => !existing?.includes(item)) ?? [];
      // console.log("PLUS:", added);
      // console.log("REMOVED:", removed);
      onSelectionChange?.([added, removed]);
      return currentItems;
    });
  }, []);
  //NOTE: Below code maybe required in future to render the component in client mode only
  // Track if we're in the client
  // const [isMounted, setIsMounted] = useState(false);

  // useEffect(() => {
  //   setIsMounted(true);
  // }, []);

  // if (!isMounted) {
  //   return (
  //     <div>
  //       <label className="block text-lg font-medium text-gray-700 m-3">
  //         {getQuestionText(name)}
  //       </label>
  //       <div className="h-[38px] bg-gray-100 rounded-md animate-pulse flex items-center justify-center">
  //         <div className="text-gray-400 text-sm">Loading options...</div>
  //       </div>
  //     </div>
  //   );
  // }
  return (
    <div>
      <label className="block text-lg font-medium text-gray-700 m-3">
        {getQuestionText(name)}
      </label>
      <Select
        closeMenuOnSelect={false}
        defaultValue={[]}
        isMulti
        options={colourOptions}
        styles={colourStyles}
        onChange={onChange}
        instanceId={`select-${name}`}
      />
    </div>
  );
};
