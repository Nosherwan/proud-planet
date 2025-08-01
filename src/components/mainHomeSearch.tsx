import React, { useEffect, useState, useCallback, useRef } from "react";
import { getCatalogues, getRandomCatalogue } from "../fetchers/catalogues";
import AppCard from "./appCard";
import type { Catalogue } from "../types/catalogue";
import type { TagCategory } from "../types/tag";
import MultiSelectSearch from "./multiSelectSearch";

const createFilters = (searchValue: string) => {
  const cleanValues = searchValue.split(" ").filter(Boolean);
  const filters: string[][] = [];
  for (const val of cleanValues) {
    filters.push(["title", "ilike", val]);
    filters.push(["tags", "@>", `{${val.toLowerCase()}}`]);
  }
  return filters;
};

interface MainHomeSearchProps {
  initialCatalogues: {
    catalogues: Catalogue[];
    cursor: number;
    hasMore: boolean;
  };
  initialRandomApp: Catalogue | null;
  tags: TagCategory[];
}

const MainHomeSearch = ({
  initialCatalogues,
  initialRandomApp,
  tags,
}: MainHomeSearchProps) => {
  const [randomApp, setRandomApp] = useState<Catalogue | null>(
    initialRandomApp,
  );
  const [catalogues, setCatalogues] = useState(initialCatalogues.catalogues);
  const [cursor, setCursor] = useState(initialCatalogues.cursor);
  const [hasMore, setHasMore] = useState(initialCatalogues.hasMore);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchValue, setSearchValue] = useState<string>("");
  const loaderRef = useRef<HTMLDivElement>(null);

  const fetchCatalogues = useCallback(
    async (filters: string[][], reset: boolean) => {
      if ((loading || !hasMore) && !reset) return;

      setLoading(true);
      try {
        const {
          catalogues: {
            catalogues: newCatalogues,
            cursor: newCursor,
            hasMore: newHasMore,
          },
        } = await getCatalogues(filters, reset ? 0 : cursor);

        if (reset) {
          setCatalogues(newCatalogues);
        } else {
          setCatalogues((prev) => [...prev, ...newCatalogues]);
        }

        setCursor(newCursor);
        setHasMore(newHasMore);
      } catch (err) {
        console.error("Failed to fetch catalogue:", err);
        setError("Unable to load data. Please try again later.");
      } finally {
        setLoading(false);
      }
    },
    [loading, cursor, hasMore],
  );

  const searchFromChild = useCallback(
    (searchValues: string) => {
      setRandomApp(null);
      setSearchValue(searchValues);
      const filters = createFilters(searchValues);
      fetchCatalogues(filters, true);
    },
    [setSearchValue, fetchCatalogues],
  );
  // Set up intersection observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          const filters = createFilters(searchValue);
          fetchCatalogues(filters, false);
        }
      },
      { threshold: 0.1 },
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [fetchCatalogues, hasMore, searchValue]);

  const fetchRandomCatalogue = async () => {
    const { randomCatalogue } = await getRandomCatalogue();
    setRandomApp(randomCatalogue);
  };

  const handleSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setSearchValue(e.target.value),
    [],
  );

  const handleClear = useCallback(() => {
    setSearchValue("");
    fetchCatalogues([], true);
    fetchRandomCatalogue();
  }, []);

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      try {
        const filters = createFilters(searchValue);
        fetchCatalogues(filters, true);
        if (!searchValue) {
          fetchRandomCatalogue();
        } else {
          setRandomApp(null);
        }
      } catch (error) {
        console.log("❗️: ", error);
      }
    },
    [fetchCatalogues, searchValue],
  );

  return (
    <>
      {error && (
        <div className="mt-6 p-4 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}
      <MultiSelectSearch tagsWithCategories={tags} callback={searchFromChild} />
      <div className="font-bold">OR</div>
      <div className="mt-4 mb-4">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center justify-center"
        >
          <div className="text-[#4b5563] relative flex items-center">
            <label htmlFor="search-apps" className="sr-only">
              Search mindfulness and wellness apps
            </label>
            <input
              id="search-apps"
              type="search"
              className="pr-6 px-4 py-2 border border-gray-400 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchValue}
              onChange={handleSearch}
              aria-label="Search for mindfulness apps"
              placeholder="Search apps..."
            />
            {searchValue && (
              <button
                type="button"
                onClick={handleClear}
                className="absolute right-[90px] text-gray-500 hover:text-gray-700"
                aria-label="Clear search"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            )}
            <button
              type="submit"
              className="px-4 py-2 bg-blue-900 text-white font-medium rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150 ease-in-out border border-blue-900"
            >
              Search
            </button>
          </div>
          <div className="mt-2 text-sm text-gray-600 italic bg-blue-50 p-2 rounded-md shadow-sm">
            <span className="font-medium">Search Tip:</span> Just press empty
            search OR Search for words (e.g music sleep) OR Search for app name
            or names with spaces (e.g headspace calm)
          </div>
        </form>
      </div>

      <div className="flex flex-row flex-wrap justify-center">
        {randomApp !== null && <AppCard item={randomApp} special={true} />}
        {catalogues?.map((item) => (
          <AppCard key={item.id} item={item} special={false} />
        ))}
      </div>

      {/* Loader element that triggers more items when visible */}
      <div
        ref={loaderRef}
        className="h-10 w-full flex items-center justify-center my-4"
      >
        {loading && (
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-700"></div>
        )}
      </div>

      {!hasMore && catalogues?.length > 0 && (
        <div className="text-gray-500 my-8">No more results</div>
      )}
    </>
  );
};

export default MainHomeSearch;
