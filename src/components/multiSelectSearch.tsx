import { useState, useEffect, useCallback, useMemo } from "react";
import type { TagCategory } from "../types/tag";
import { toColourOptions } from "../utils/generic";
import MultiSelect from "./multiSelect";

function MultiSelectSearch({
  tagsWithCategories,
  callback,
}: {
  tagsWithCategories: TagCategory[];
  callback: (searchValues: string) => void;
}) {
  const [state, setState] = useState<string[]>();

  const onSearch = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e?.preventDefault?.();
      callback(state?.join(" ") ?? "");
    },
    [callback, state],
  );

  useEffect(() => {
    console.log("📦", state);
  }, [state]);

  const onSelectChange = useCallback((options: string[][]) => {
    console.log("🎭 ", options);
    const [added, removed] = options;
    setState((prev: string[] | undefined) => {
      const current = prev ?? [];
      if (added.length > 0) {
        return current.concat(added);
      }
      if (removed.length > 0) {
        return current.filter((item) => !removed.includes(item));
      }
    });
  }, []);

  const multiSelectComponents = useMemo(
    () =>
      tagsWithCategories.map((item) => (
        <MultiSelect
          key={item.category}
          colourOptions={toColourOptions(item)}
          name={item.category ?? ""}
          onSelectionChange={onSelectChange}
        />
      )),
    [tagsWithCategories, onSelectChange],
  );

  return (
    <div className="w-auto mb-4">
      <div className="mt-4 text-sm text-gray-600 italic bg-blue-50 p-2 rounded-md shadow-sm">
        <span className="font-medium">Search Tip: </span>
        Less is more. One tag is better than two; One Answer is better than
        three.
      </div>
      <form onSubmit={onSearch}>
        {multiSelectComponents}
        <div className="flex justify-center w-full mt-4">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-900 text-white font-medium rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150 ease-in-out border border-blue-900"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
}

export default MultiSelectSearch;
