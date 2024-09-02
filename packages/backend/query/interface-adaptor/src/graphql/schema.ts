import { GraphQLSchema } from "graphql/type";
import path from "path";
import { buildSchema } from "type-graphql";
import { GroupChatQueryResolver } from "./resolvers";

async function createQuerySchema(): Promise<GraphQLSchema> {
  return await buildSchema({
    resolvers: [GroupChatQueryResolver],
    emitSchemaFile: path.resolve(
      __dirname,
      "../../../../../frontend/graphql",
      "query.schema.graphql",
    ),
    validate: false,
  });
}

export { createQuerySchema };
