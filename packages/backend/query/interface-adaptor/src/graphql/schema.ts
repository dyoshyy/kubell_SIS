import { buildSchema } from "type-graphql";
import { GraphQLSchema } from "graphql/type";
import { GroupChatQueryResolver } from "./resolvers";
import path from "path";

async function createQuerySchema(): Promise<GraphQLSchema> {
  return await buildSchema({
    resolvers: [GroupChatQueryResolver],
    emitSchemaFile: path.resolve(__dirname, '../../../../../frontend/graphql', "query.schema.graphql"),
    validate: false,
  });
}

export { createQuerySchema };
