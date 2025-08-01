import { fetchGraphQL } from "../utils/fetchGraphql";
const endpoint = import.meta.env.PUBLIC_API_URL;
import { tagsWithCategories as getTagsWithCategories } from "../gqlr/tag";
import type { Post } from "../types/post";
import type { TagCategory } from "../types/tag";

interface TagCategoriesRequestResponse {
  tags: TagCategory[];
}

function isTagCategoriesResponse(
  response: unknown,
): response is TagCategoriesRequestResponse {
  return (
    !!response &&
    typeof response === "object" &&
    "tags" in response &&
    !!response.tags &&
    typeof response.tags === "object"
  );
}

export const getTags = async (): Promise<TagCategoriesRequestResponse> => {
  const defaultResponse: TagCategoriesRequestResponse = {
    tags: [],
  };
  const response = await fetchGraphQL(endpoint, getTagsWithCategories, {});
  console.log("🏷️ Tags response data: ", response);
  if (isTagCategoriesResponse(response)) return response;
  console.log("🍦 Fetch Response data: ", response);
  return defaultResponse;
};
