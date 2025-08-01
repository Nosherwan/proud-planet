import { fetchGraphQL } from "../utils/fetchGraphql";
const endpoint = import.meta.env.PUBLIC_API_URL;
import { posts as getPostsRequest, post as getPostRequest } from "../gqlr/post";
import type { Post } from "../types/post";

interface PostRequestResponse {
  post: Post;
}

function isPostResponse(response: unknown): response is PostRequestResponse {
  return (
    typeof response === "object" &&
    response !== null &&
    "post" in response &&
    typeof response.post === "object" &&
    response.post !== null
  );
}

interface PostsRequestResponse {
  posts: {
    posts: Post[];
    hasMore: boolean;
    cursor: number;
  };
}

function isPostsResponse(response: unknown): response is PostsRequestResponse {
  return (
    typeof response === "object" &&
    response !== null &&
    "posts" in response &&
    typeof response.posts === "object" &&
    response.posts !== null &&
    "posts" in response.posts &&
    "hasMore" in response.posts &&
    "cursor" in response.posts
  );
}

export const getPosts = async (
  after: number,
): Promise<PostsRequestResponse> => {
  const defaultResponse: PostsRequestResponse = {
    posts: {
      posts: [],
      hasMore: false,
      cursor: 0,
    },
  };
  const response = await fetchGraphQL(endpoint, getPostsRequest, {
    pageSize: 10,
    after: +after,
    filter: [],
  });

  if (isPostsResponse(response)) return response;
  console.log("🍦 Fetch Response data: ", response);
  return defaultResponse;
};

export const getPost = async (slug: string): Promise<PostRequestResponse> => {
  const defaultResponse: PostRequestResponse = {
    post: {} as Post,
  };
  const response = await fetchGraphQL(endpoint, getPostRequest, {
    slug,
  });
  if (isPostResponse(response)) return response;
  console.log("🍦 Fetch Response data: ", response);
  return defaultResponse;
};
