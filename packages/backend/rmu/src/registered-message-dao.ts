import { PrismaClient } from "@prisma/client";
import { GroupChatId, RegisteredMessageBody, RegisteredMessageId, RegisteredMessageTitle, UserAccountId } from "cqrs-es-example-js-command-domain";


class RegisteredMessageDao {
  private constructor(private readonly prismaClient: PrismaClient) {}

  async insertRegisteredMessage(
    aggregateId: RegisteredMessageId,
    ownerId: UserAccountId,
    title: RegisteredMessageTitle,
    body: RegisteredMessageBody,
    groupChatId: GroupChatId,
    cronFormular: string,
    createdAt: Date,
  ) {
    return await this.prismaClient.$transaction(async (_prismaClient) => {
      await _prismaClient.registeredMessages.create({
        data: {
          id: aggregateId.asString(),
          ownerId: ownerId.asString(),
          title: title.asString(),
          body: body.asString(),
          groupChatId: groupChatId.asString(),
          cronFormular: cronFormular,
          createdAt: createdAt,
          updatedAt: createdAt,
        },
      });
    });
  }

  // async deleteRegisteredMessage(id: RegisteredMessageId, updatedAt: Date) {
  //   return await this.prismaClient.registeredMessages.update({
  //     where: { id: id.asString() },
  //     data: { disabled: true, updatedAt: updatedAt },
  //   });
  // }

  static of(prismaClient: PrismaClient) {
    return new RegisteredMessageDao(prismaClient);
  }
}

export { RegisteredMessageDao };
