import { GraphQLSchema } from "graphql/type";
import { buildSchema } from "type-graphql";
import { GroupChatCommandResolver, ProjectCommandResolver } from "./resolvers";

async function createCommandSchema(): Promise<GraphQLSchema> {
  return await buildSchema({
    resolvers: [GroupChatCommandResolver, ProjectCommandResolver],
    validate: false,
  });
}

export { createCommandSchema };
