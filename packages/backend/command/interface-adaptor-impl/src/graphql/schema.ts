import { GraphQLSchema } from "graphql/type";
import path from "path";
import { buildSchema } from "type-graphql";
import { GroupChatCommandResolver } from "./resolvers";

async function createCommandSchema(): Promise<GraphQLSchema> {
  return await buildSchema({
    resolvers: [GroupChatCommandResolver],
    emitSchemaFile: path.resolve(
      __dirname,
      "../../../../../frontend/graphql",
      "command.schema.graphql",
    ),
    validate: false,
  });
}

export { createCommandSchema };
