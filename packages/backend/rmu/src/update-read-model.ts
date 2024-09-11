import { DynamoDBStreamEvent } from "aws-lambda";
import {
  convertJSONToGroupChatEvent,
  convertJSONToProjectEvent,
  GroupChatCreated,
  GroupChatCreatedTypeSymbol,
  GroupChatDeleted,
  GroupChatDeletedTypeSymbol,
  GroupChatMemberAdded,
  GroupChatMemberAddedTypeSymbol,
  GroupChatMemberRemoved,
  GroupChatMemberRemovedTypeSymbol,
  GroupChatMessageDeleted,
  GroupChatMessageDeletedTypeSymbol,
  GroupChatMessagePosted,
  GroupChatMessagePostedTypeSymbol,
  GroupChatRenamed,
  GroupChatRenamedTypeSymbol,
  ProjectCreated,
  ProjectCreatedTypeSymbol,
} from "cqrs-es-example-js-command-domain";
import { TextDecoder } from "node:util";
import { ILogObj, Logger } from "tslog";
import { GroupChatDao } from "./group-chat-dao";
import { ProjectDao } from "./project-dao";

// import {Callback} from "aws-lambda/handler";

// const lambdaHandler: Handler<DynamoDBStreamEvent, void> = async (event: DynamoDBStreamEvent, context: Context, callback: Callback<void>) => {
//
// }

class ReadModelUpdater {
  private logger: Logger<ILogObj> = new Logger();
  private decoder: TextDecoder = new TextDecoder("utf-8");

  private constructor(
    private readonly groupChatDao: GroupChatDao,
    private readonly projectDao: ProjectDao,
    private readonly registeredMessageDao: RegisteredMessageDao,
  ) {}

  async updateReadModel(event: DynamoDBStreamEvent): Promise<void> {
    this.logger.info("EVENT: \n" + JSON.stringify(event, null, 2));
    event.Records.forEach((record) => {
      if (!record.dynamodb) {
        this.logger.warn("No DynamoDB record");
        return;
      }
      const attributeValues = record.dynamodb.NewImage;
      if (!attributeValues) {
        this.logger.warn("No NewImage");
        return;
      }
      const base64EncodedPayload = attributeValues.payload.B;
      if (!base64EncodedPayload) {
        this.logger.warn("No payload");
        return;
      }
      const payload = this.decoder.decode(
        new Uint8Array(base64EncodedPayload.split(",").map(Number)),
      );
      const payloadJson = JSON.parse(payload);
      
      let convertedEvent;

      if (payloadJson.type.includes("GroupChat")) {
        convertedEvent = convertJSONToGroupChatEvent(payloadJson);
      }
      else {
        convertedEvent = convertJSONToProjectEvent(payloadJson);
      }

      switch (convertedEvent.symbol) {
        case GroupChatCreatedTypeSymbol: {
          const typedEvent = convertedEvent as GroupChatCreated;
          this.logger.debug(`event = ${typedEvent.toString()}`);
          this.groupChatDao.insertGroupChat(
            typedEvent.aggregateId,
            typedEvent.name,
            typedEvent.members.toArray()[0].userAccountId,
            new Date(),
          );
          this.logger.debug("inserted group chat");
          break;
        }
        case GroupChatDeletedTypeSymbol: {
          const typedEvent = convertedEvent as GroupChatDeleted;
          this.logger.debug(`event = ${typedEvent.toString()}`);
          this.groupChatDao.deleteGroupChat(typedEvent.aggregateId, new Date());
          this.logger.debug("deleted group chat");
          break;
        }
        case GroupChatRenamedTypeSymbol: {
          const typedEvent = convertedEvent as GroupChatRenamed;
          this.logger.debug(`event = ${typedEvent.toString()}`);
          this.groupChatDao.updateGroupChatName(
            typedEvent.aggregateId,
            typedEvent.name,
            new Date(),
          );
          this.logger.debug("updated group chat name");
          break;
        }
        case GroupChatMemberAddedTypeSymbol: {
          const typedEvent = convertedEvent as GroupChatMemberAdded;
          this.logger.debug(`event = ${typedEvent.toString()}`);
          this.groupChatDao.insertGroupChatMember(
            typedEvent.member.id,
            typedEvent.aggregateId,
            typedEvent.member.userAccountId,
            typedEvent.member.memberRole,
            new Date(),
          );
          this.logger.debug("inserted member");
          break;
        }
        case GroupChatMemberRemovedTypeSymbol: {
          const typedEvent = convertedEvent as GroupChatMemberRemoved;
          this.logger.debug(`event = ${typedEvent.toString()}`);
          this.groupChatDao.deleteMember(
            typedEvent.aggregateId,
            typedEvent.member.userAccountId,
          );
          this.logger.debug("deleted member");
          break;
        }
        case GroupChatMessagePostedTypeSymbol: {
          const typedEvent = convertedEvent as GroupChatMessagePosted;
          this.logger.debug(`event = ${typedEvent.toString()}`);
          this.groupChatDao.insertMessage(
            typedEvent.aggregateId,
            typedEvent.message,
            new Date(),
          );
          this.logger.debug("inserted message");
          break;
        }
        case GroupChatMessageDeletedTypeSymbol: {
          const typedEvent = convertedEvent as GroupChatMessageDeleted;
          this.logger.debug(`event = ${typedEvent.toString()}`);
          this.groupChatDao.deleteMessage(typedEvent.message.id, new Date());
          this.logger.debug("deleted message");
          break;
        }
        case ProjectCreatedTypeSymbol: {
          const typedEvent = convertedEvent as ProjectCreated;
          this.logger.debug(`event = ${typedEvent.toString()}`);
          this.projectDao.insertProject(
            typedEvent.aggregateId,
            typedEvent.name,
            typedEvent.leaderName,
            new Date(),
          )
          this.logger.debug("inserted project");
          break;
        }
      }
    });
  }

  static of(groupChatDao: GroupChatDao, projectDao: ProjectDao): ReadModelUpdater {
    return new ReadModelUpdater(groupChatDao, projectDao);
  }
}

export { ReadModelUpdater };
