import { PrismaClient } from "@prisma/client";
import { ILogObj, Logger } from "tslog";
import { Arg, Ctx, Query, Resolver } from "type-graphql";
import { GroupChatOutput, MemberOutput, MessageOutput, ProjectOutput, RegisteredMessageOutput } from "./outputs";

interface QueryContext {
  prisma: PrismaClient;
}

@Resolver()
class RegisteredMessageQueryResolver {
  private readonly logger: Logger<ILogObj> = new Logger();

  @Query(() => [RegisteredMessageOutput])
  async getRegisteredMessages(
    @Ctx() { prisma }: QueryContext,
    @Arg("ownerId") userAccountId: string,
  ): Promise<RegisteredMessageOutput[]> {
    const registeredMessages: RegisteredMessageOutput[] = await prisma.$queryRaw<RegisteredMessageOutput[]>`
        SELECT
            rm.id as id,
            rm.title as title,
            rm.body as body,
            rm.created_at as createdAt,
            rm.updated_at as updatedAt
        FROM
            registered_messages AS rm
        WHERE
            rm.owner_id = ${userAccountId}`;
    this.logger.debug("getRegisteredMessages:", registeredMessages);
    return registeredMessages;
  }
}

@Resolver()
class ProjectQueryResolver {
  private readonly logger: Logger<ILogObj> = new Logger();

  @Query(() => ProjectOutput)
  async getProject(
    @Ctx() { prisma }: QueryContext,
    @Arg("projectId") projectId: string,
  ): Promise<ProjectOutput> {
    const projects: ProjectOutput[] = await prisma.$queryRaw<
      ProjectOutput[]
    >`
      SELECT
        pj.id as id,
        pj.name as name,
        pj.leader_name as leaderName,
        pj.created_at as createdAt,
        pj.updated_at as updatedAt
      FROM
        projects AS pj
      WHERE
        pj.disabled = 'false' AND pj.id = ${projectId}`;

      this.logger.debug("getProjects:", projects);
      if(!projects.length) {
        throw new Error("not found");
      }
      this.logger.debug("getProject:", projects[0]);
      return projects[0];
  }

  @Query(() => [ProjectOutput])
  async getProjecs(
    @Ctx() { prisma }: QueryContext,
  ): Promise<ProjectOutput[]> {
    const projects: ProjectOutput[] = await prisma.$queryRaw<
      ProjectOutput[]
    >`
      SELECT
        pj.id as id,
        pj.name as name,
        pj.owner_name as ownerName,
        pj.created_at as createdAt,
        pj.updated_at as updatedAt
      FROM
        projects AS pj
      WHERE
        pj.disabled = 'false'`;

      this.logger.debug("getProjects:", projects);
      return projects;
  }
}

@Resolver()
class GroupChatQueryResolver {
  private readonly logger: Logger<ILogObj> = new Logger();

  @Query(() => GroupChatOutput)
  async getGroupChat(
    @Ctx() { prisma }: QueryContext,
    @Arg("groupChatId") groupChatId: string,
    @Arg("userAccountId") userAccountId: string,
  ): Promise<GroupChatOutput> {
    const groupChats: GroupChatOutput[] = await prisma.$queryRaw<
      GroupChatOutput[]
    >`
        SELECT
            gc.id as id,
            gc.name as name,
            gc.owner_id as ownerId,
            gc.created_at as createdAt,
            gc.updated_at as updatedAt
        FROM
            group_chats AS gc JOIN members AS m ON gc.id = m.group_chat_id 
        WHERE
            gc.disabled = 'false' AND m.group_chat_id = ${groupChatId} AND m.user_account_id = ${userAccountId}`;
    this.logger.debug("getGroupChats:", groupChats);
    if (!groupChats.length) {
      throw new Error("not found");
    }
    this.logger.debug("getGroupChat:", groupChats[0]);
    return groupChats[0];
  }

  @Query(() => [GroupChatOutput])
  async getGroupChats(
    @Ctx() { prisma }: QueryContext,
    @Arg("userAccountId") userAccountId: string,
  ): Promise<GroupChatOutput[]> {
    const groupChats: GroupChatOutput[] = await prisma.$queryRaw<
      GroupChatOutput[]
    >`
        SELECT
            gc.id as id,
            gc.name as name,
            gc.owner_id as ownerId,
            gc.created_at as createdAt,
            gc.updated_at as updatedAt
	FROM
	    group_chats AS gc JOIN members AS m ON gc.id = m.group_chat_id
        WHERE
            gc.disabled = 'false' AND m.user_account_id = ${userAccountId}`;
    this.logger.debug("getGroupChats:", groupChats);
    return groupChats;
  }

  @Query(() => MemberOutput)
  async getMember(
    @Ctx() { prisma }: QueryContext,
    @Arg("groupChatId") groupChatId: string,
    @Arg("userAccountId") userAccountId: string,
  ): Promise<MemberOutput> {
    const members: MemberOutput[] = await prisma.$queryRaw<MemberOutput[]>`
        SELECT
            m.id as id,
            m.group_chat_id as groupChatId,
            m.user_account_id as userAccountId,
            m.role as role,
            m.created_at as createdAt,
            m.updated_at as updatedAt
	FROM
	    group_chats AS gc JOIN members AS m ON gc.id = m.group_chat_id
	WHERE
	    gc.disabled = 'false' AND m.group_chat_id = ${groupChatId} AND m.user_account_id = ${userAccountId}`;
    if (!members.length) {
      throw new Error("not found");
    }
    this.logger.debug("member:", members[0]);
    return members[0];
  }

  @Query(() => [MemberOutput])
  async getMembers(
    @Ctx() { prisma }: QueryContext,
    @Arg("groupChatId") groupChatId: string,
    @Arg("userAccountId") userAccountId: string,
  ): Promise<MemberOutput[]> {
    const members: MemberOutput[] = await prisma.$queryRaw<MemberOutput[]>`
        SELECT
            m.id as id,
            m.group_chat_id as groupChatId,
            m.user_account_id as userAccountId,
            m.role as role,
            m.created_at as createdAt,
            m.updated_at as updatedAt
        FROM
            group_chats AS gc JOIN members AS m ON gc.id = m.group_chat_id
        WHERE
            gc.disabled = 'false' AND m.group_chat_id = ${groupChatId}
		    AND EXISTS (
		        SELECT 1 
		        FROM
		            members AS m2
		        WHERE
		            m2.group_chat_id = m.group_chat_id AND m2.user_account_id = ${userAccountId})`;
    this.logger.debug("members:", members);
    return members;
  }

  @Query(() => MessageOutput)
  async getMessage(
    @Ctx() { prisma }: QueryContext,
    @Arg("messageId") messageId: string,
    @Arg("userAccountId") userAccountId: string,
  ): Promise<MessageOutput> {
    const messages: MessageOutput[] = await prisma.$queryRaw<MessageOutput[]>`
        SELECT
	    m.id as id,
            m.group_chat_id as groupChatId,
            m.user_account_id as userAccountId,
            m.text as text,
            m.created_at as createdAt,
            m.updated_at as updatedAt
	FROM
	    group_chats AS gc JOIN messages AS m ON gc.id = m.group_chat_id
        WHERE
            gc.disabled = 'false' AND m.disabled = 'false' AND m.id = ${messageId}
            AND EXISTS (
                SELECT 1
                FROM
                    members AS mem
                WHERE
                    mem.group_chat_id = m.group_chat_id AND mem.user_account_id = ${userAccountId})`;
    if (!messages.length) {
      throw new Error("not found");
    }
    this.logger.debug("message:", messages[0]);
    return messages[0];
  }

  @Query(() => [MessageOutput])
  async getMessages(
    @Ctx() { prisma }: QueryContext,
    @Arg("groupChatId") groupChatId: string,
    @Arg("userAccountId") userAccountId: string,
  ): Promise<MessageOutput[]> {
    const messages: MessageOutput[] = await prisma.$queryRaw<MessageOutput[]>`
        SELECT
            m.id as id,
            m.group_chat_id as groupChatId,
            m.user_account_id as userAccountId,
            m.text as text,
            m.created_at as createdAt,
            m.updated_at as updatedAt
	FROM
	    group_chats AS gc JOIN messages AS m ON gc.id = m.group_chat_id
        WHERE
            gc.disabled = 'false' AND m.disabled = 'false' AND m.group_chat_id = ${groupChatId}
            AND EXISTS (
                SELECT 1
                FROM
                    members AS mem
                WHERE
                    mem.group_chat_id = m.group_chat_id AND mem.user_account_id = ${userAccountId})`;
    this.logger.debug("messages:", messages);
    return messages;
  }
}

export { GroupChatQueryResolver, ProjectQueryResolver, QueryContext, RegisteredMessageQueryResolver };

