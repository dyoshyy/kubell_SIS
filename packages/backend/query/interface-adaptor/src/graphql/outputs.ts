import { Field, ObjectType } from "type-graphql";

@ObjectType()
class RegisteredMessageOutput {
  @Field()
  id!: string;

  // @Field()
  // userAccountId!: string;
  @Field()
  groupChatId!: string;

  @Field()
  cronFormular!: string;

  @Field()
  title!: string;

  @Field()
  body!: string;

  @Field()
  createdAt!: Date;

  @Field()
  updatedAt!: Date;
}

@ObjectType()
class ProjectOutput {
  @Field()
  id!: string;

  @Field()
  name!: string;

  @Field()
  ownerName!: string;

  @Field()
  createdAt!: Date;

  @Field()
  updatedAt!: Date;
}

@ObjectType()
class GroupChatOutput {
  @Field()
  id!: string;

  @Field()
  name!: string;

  @Field()
  ownerId!: string;

  @Field()
  createdAt!: Date;

  @Field()
  updatedAt!: Date;
}

@ObjectType()
class MemberOutput {
  @Field()
  id!: string;

  @Field()
  groupChatId!: string;

  @Field()
  userAccountId!: string;

  @Field()
  role!: string;

  @Field()
  createdAt!: Date;

  @Field()
  updatedAt!: Date;
}

@ObjectType()
class MessageOutput {
  @Field()
  id!: string;

  @Field()
  groupChatId!: string;

  @Field()
  userAccountId!: string;

  @Field()
  text!: string;

  @Field()
  createdAt!: Date;

  @Field()
  updatedAt!: Date;
}

export { GroupChatOutput, MemberOutput, MessageOutput, ProjectOutput, RegisteredMessageOutput };
