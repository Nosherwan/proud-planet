import { fetchGraphQL } from "../utils/fetchGraphql";
const endpoint = import.meta.env.PUBLIC_API_URL;
import { users as getUsersRequest } from "../gqlr/users";

export const getUsers = async (): Promise<unknown> => {
  const response = await fetchGraphQL(endpoint, getUsersRequest, {
    variables: {
      pageSize: 10,
      after: 0,
      filter: "",
    },
  });

  console.log("🍦 Fetch Response data: ", response);
  return response || {};
};
