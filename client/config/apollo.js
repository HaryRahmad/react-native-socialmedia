import { ApolloClient, createHttpLink, from, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import * as SecureStore from "expo-secure-store";

const httpLink = createHttpLink({
  uri: "https://4f47-104-28-245-130.ngrok-free.app",
  // uri: "http://localhost:3000"
});
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.error(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  if (networkError)
    console.error(`[Network error]: ${JSON.stringify(networkError, null, 2)})`);
});

const authLink = setContext(async (_, { headers }) => {
  // console.log(headers, `-------aaaaaaaaaa`);
  const token = await SecureStore.getItemAsync("accessToken");
  // console.log(token,`aaaaaaaaaaaaa`);
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});
// console.log(authLink);
const client = new ApolloClient({
    // link: authLink.concat(httpLink),
  link: from([errorLink, authLink.concat(httpLink)]),
  cache: new InMemoryCache(),
});

export default client;
