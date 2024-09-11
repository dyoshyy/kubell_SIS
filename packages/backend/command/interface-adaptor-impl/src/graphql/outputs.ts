import { Field, ObjectType } from "type-graphql";

@ObjectType()
class GroupChatOutput {
  @Field()
  groupChatId!: string;
}

@ObjectType()
class MessageOutput {
  @Field()
  groupChatId!: string;
  @Field()
  messageId!: string;
}

@ObjectType()
class ProjectOutput {
  @Field()
  projectId!: string;
}

@ObjectType()
class RegisteredMessageOutput {
  @Field()
  registeredMessageId!: string;
}

@ObjectType()
class HealthCheckOutput {
  @Field()
  value!: string;
}

export { GroupChatOutput, HealthCheckOutput, MessageOutput, ProjectOutput, RegisteredMessageOutput };

