import path from "path";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { GroupChatCommandResolver } from "../src/graphql/resolvers";

void buildSchema({
  resolvers: [GroupChatCommandResolver],
  emitSchemaFile: path.resolve(
    __dirname,
    "../../../../../schema/command.graphql",
  ),
  validate: false,
});
