import path from "path";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { GroupChatQueryResolver, ProjectQueryResolver, RegisteredMessageQueryResolver } from "../src/graphql/resolvers";

void buildSchema({
  resolvers: [GroupChatQueryResolver, ProjectQueryResolver, RegisteredMessageQueryResolver],
  emitSchemaFile: path.resolve(
    __dirname,
    "../../../../../schema/query.graphql",
  ),
  validate: false,
});
