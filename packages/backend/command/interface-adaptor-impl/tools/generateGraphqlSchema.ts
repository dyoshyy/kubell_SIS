import path from "path";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { GroupChatCommandResolver, ProjectCommandResolver } from "../src/graphql/resolvers";

void buildSchema({
  resolvers: [GroupChatCommandResolver, ProjectCommandResolver],
  emitSchemaFile: path.resolve(
    __dirname,
    "../../../../../schema/command.graphql",
  ),
  validate: false,
});
