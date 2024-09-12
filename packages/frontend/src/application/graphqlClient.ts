import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";

const commandLink = new HttpLink({
  uri: "https://stunning-zebra-p4xjpr9r6wpc7xpj-38080.app.github.dev/query",
});
const queryLink = new HttpLink({
  uri: "https://stunning-zebra-p4xjpr9r6wpc7xpj-38082.app.github.dev/query",
});

export const graphqlClient = new ApolloClient({
  link: ApolloLink.split(
    (operation) => operation.getContext()["clientName"] === "command",
    commandLink,
    queryLink,
  ),
  cache: new InMemoryCache(),
});
