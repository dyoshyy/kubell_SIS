import { GraphQLSchema } from "graphql/type";
import { buildSchema } from "type-graphql";
import { GroupChatQueryResolver, ProjectQueryResolver, RegisteredMessageQueryResolver } from "./resolvers";

async function createQuerySchema(): Promise<GraphQLSchema> {
  return await buildSchema({
    resolvers: [GroupChatQueryResolver, ProjectQueryResolver, RegisteredMessageQueryResolver],
    validate: false,
  });
}

export { createQuerySchema };
