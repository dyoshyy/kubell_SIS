import { PrismaClient } from "@prisma/client";
import { RegisteredMessageBody, RegisteredMessageId, RegisteredMessageTitle } from "cqrs-es-example-js-command-domain";


class RegisteredMessageDao {
  private constructor(private readonly prismaClient: PrismaClient) {}

  async insertRegisteredMessage(
    aggregateId: RegisteredMessageId,
    title: RegisteredMessageTitle,
    body: RegisteredMessageBody,
    createdAt: Date,
  ) {
    return await this.prismaClient.$transaction(async (_prismaClient) => {
      await _prismaClient.registeredMessages.create({
        data: {
          id: aggregateId.asString(),
          title: title.asString(),
          body: body.asString(),
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
