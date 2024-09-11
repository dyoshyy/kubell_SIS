import { GraphQLSchema } from "graphql/type";
import { buildSchema } from "type-graphql";
import { GroupChatCommandResolver, ProjectCommandResolver, RegisteredMessageCommandResolver } from "./resolvers";

async function createCommandSchema(): Promise<GraphQLSchema> {
  return await buildSchema({
    resolvers: [GroupChatCommandResolver, ProjectCommandResolver, RegisteredMessageCommandResolver],
    validate: false,
  });
}

export { createCommandSchema };
