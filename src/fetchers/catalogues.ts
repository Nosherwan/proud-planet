import { fetchGraphQL } from "../utils/fetchGraphql";
const endpoint = import.meta.env.PUBLIC_API_URL;
import {
  catalogues as getCataloguesRequest,
  randomCatalogue as getRandomCatalogueRequest,
} from "../gqlr/catalogue";
import type { Catalogue } from "../types/catalogue";

interface RandomCatalogueRequestResponse {
  randomCatalogue: Catalogue;
}

interface CatalogueRequestResponse {
  catalogues: {
    catalogues: Catalogue[];
    hasMore: boolean;
    cursor: number;
  };
}

function isRandomCatalogueResponse(
  response: unknown,
): response is RandomCatalogueRequestResponse {
  return (
    typeof response === "object" &&
    response !== null &&
    "randomCatalogue" in response &&
    typeof response.randomCatalogue === "object" &&
    response.randomCatalogue !== null
  );
}

function isCatalogueResponse(
  response: unknown,
): response is CatalogueRequestResponse {
  return (
    typeof response === "object" &&
    response !== null &&
    "catalogues" in response &&
    typeof response.catalogues === "object" &&
    response.catalogues !== null &&
    "catalogues" in response.catalogues &&
    "hasMore" in response.catalogues &&
    "cursor" in response.catalogues
  );
}

export const getCatalogues = async (
  filter: string[][],
  after: number,
): Promise<CatalogueRequestResponse> => {
  const defaultResponse: CatalogueRequestResponse = {
    catalogues: {
      catalogues: [],
      hasMore: false,
      cursor: 0,
    },
  };
  console.log("⛩️", endpoint);
  const response = await fetchGraphQL(endpoint, getCataloguesRequest, {
    pageSize: 10,
    after: +after,
    filter,
  });

  if (isCatalogueResponse(response)) return response;
  console.log("🍦 Fetch Response data: ", response);
  return defaultResponse;
};

export const getRandomCatalogue =
  async (): Promise<RandomCatalogueRequestResponse> => {
    const defaultResponse: RandomCatalogueRequestResponse = {
      randomCatalogue: {} as Catalogue,
    };
    const response = await fetchGraphQL(
      endpoint,
      getRandomCatalogueRequest,
      {},
    );

    if (isRandomCatalogueResponse(response)) return response;
    console.log("🍦 Fetch Response data: ", response);
    return defaultResponse;
  };
