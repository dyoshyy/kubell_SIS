import { GraphQLSchema } from "graphql/type";
import { buildSchema } from "type-graphql";
import { GroupChatQueryResolver, ProjectResolver } from "./resolvers";

async function createQuerySchema(): Promise<GraphQLSchema> {
  return await buildSchema({
    resolvers: [GroupChatQueryResolver, ProjectResolver],
    validate: false,
  });
}

export { createQuerySchema };
