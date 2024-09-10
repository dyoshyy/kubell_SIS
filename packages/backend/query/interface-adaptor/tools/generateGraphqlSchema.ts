import path from "path";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { GroupChatQueryResolver } from "../src/graphql/resolvers";

void buildSchema({
  resolvers: [GroupChatQueryResolver],
  emitSchemaFile: path.resolve(
    __dirname,
    "../../../../../schema/query.graphql",
  ),
  validate: false,
});
