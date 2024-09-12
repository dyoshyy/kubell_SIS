import { GraphQLSchema } from "graphql/type";
import { buildSchema } from "type-graphql";
import { GroupChatQueryResolver, ProjectQueryResolver } from "./resolvers";

async function createQuerySchema(): Promise<GraphQLSchema> {
  return await buildSchema({
    resolvers: [GroupChatQueryResolver, ProjectQueryResolver],
    validate: false,
  });
}

export { createQuerySchema };
