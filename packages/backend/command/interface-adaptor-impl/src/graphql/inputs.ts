import { Field, InputType } from "type-graphql";

@InputType()
class CreateGroupChatInput {
  @Field()
  name!: string;

  @Field()
  executorId!: string;
}

@InputType()
class DeleteGroupChatInput {
  @Field()
  groupChatId!: string;

  @Field()
  executorId!: string;
}

@InputType()
class RenameGroupChatInput {
  @Field()
  groupChatId!: string;

  @Field()
  name!: string;

  @Field()
  executorId!: string;
}

@InputType()
class AddMemberInput {
  @Field()
  groupChatId!: string;

  @Field()
  userAccountId!: string;

  @Field()
  role!: string;

  @Field()
  executorId!: string;
}

@InputType()
class RemoveMemberInput {
  @Field()
  groupChatId!: string;

  @Field()
  userAccountId!: string;

  @Field()
  executorId!: string;
}

@InputType()
class PostMessageInput {
  @Field()
  groupChatId!: string;

  @Field()
  content!: string;

  @Field()
  executorId!: string;
}

@InputType()
class DeleteMessageInput {
  @Field()
  groupChatId!: string;

  @Field()
  messageId!: string;

  @Field()
  executorId!: string;
}

// Project

@InputType()
class CreateProjectInput {
  @Field()
  name!: string;

  @Field()
  leaderName!: string;
}

// RegisteredMessage

@InputType()
class CreateRegisteredMessageInput {
  @Field()
  title!: string;

  @Field()
  body!: string;

  @Field()
  ownerId!: string;
}

export { AddMemberInput, CreateGroupChatInput, CreateProjectInput, CreateRegisteredMessageInput, DeleteGroupChatInput, DeleteMessageInput, PostMessageInput, RemoveMemberInput, RenameGroupChatInput };

