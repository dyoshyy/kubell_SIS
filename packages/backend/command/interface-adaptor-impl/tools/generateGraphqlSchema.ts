import path from "path";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { GroupChatCommandResolver, ProjectCommandResolver, RegisteredMessageCommandResolver } from "../src/graphql/resolvers";

void buildSchema({
  resolvers: [GroupChatCommandResolver, ProjectCommandResolver, RegisteredMessageCommandResolver],
  emitSchemaFile: path.resolve(
    __dirname,
    "../../../../../schema/command.graphql",
  ),
  validate: false,
});
