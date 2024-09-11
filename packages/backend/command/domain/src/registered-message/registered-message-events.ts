import * as Infrastructure from "cqrs-es-example-js-infrastructure";
import { Event } from "event-store-adapter-js";
import { RegisteredMessageBody } from "./registered-message-body";
import { convertJSONToRegisteredMessageId, RegisteredMessageId } from "./registered-message-id";
import { RegisteredMessageTitle } from "./registered-message-title";

type RegisteredMessageEventTypeSymbol =
  | typeof RegisteredMessageCreatedTypeSymbol;

interface RegisteredMessageEvent extends Event<RegisteredMessageId> {
  symbol: RegisteredMessageEventTypeSymbol;
  toString: () => string;
}

const RegisteredMessageCreatedTypeSymbol = Symbol("RegisteredMessageCreated");

class RegisteredMessageCreated implements RegisteredMessageEvent {
  readonly symbol: typeof RegisteredMessageCreatedTypeSymbol =
    RegisteredMessageCreatedTypeSymbol;
  readonly typeName = "RegisteredMessageCreated";

  private constructor(
    public readonly id: string,
    public readonly aggregateId: RegisteredMessageId,
    public readonly title: RegisteredMessageTitle,
    public readonly body: RegisteredMessageBody,
    public readonly sequenceNumber: number,
    public readonly occurredAt: Date,
  ) {}

  isCreated: boolean = true;

  // toString() {
  //   return `GroupChatCreated(${this.id.toString()}, ${this.aggregateId.toString()}, ${this.title.toString()}, ${this.members.toString()}, ${this.executorId.toString()}, ${this.sequenceNumber}, ${this.occurredAt.toISOString()})`;
  // }

  static of(
    aggregateId: RegisteredMessageId,
    title: RegisteredMessageTitle,
    body: RegisteredMessageBody,
    sequenceNumber: number,
  ): RegisteredMessageCreated {
    return new RegisteredMessageCreated(
      Infrastructure.generateULID(),
      aggregateId,
      title,
      body,
      sequenceNumber,
      new Date(),
    );
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function convertJSONToRegisteredMessageEvent(json: any): RegisteredMessageEvent {
  const id = convertJSONToRegisteredMessageId(json.data.aggregateId);
  switch (json.type) {
    case "RegisteredMessageCreated": {
      return RegisteredMessageCreated.of(
        id,
        RegisteredMessageTitle.of(json.data.title),
        RegisteredMessageBody.of(json.data.body),
        json.data.sequenceNumber,
      );
    }
    default:
      throw new Error(`Unknown type: ${json.type}`);
  }
}

export {
  convertJSONToRegisteredMessageEvent,
  RegisteredMessageCreated,
  RegisteredMessageCreatedTypeSymbol,
  RegisteredMessageEvent
};



