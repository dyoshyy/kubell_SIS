import { Aggregate } from "event-store-adapter-js";
import { RegisteredMessageBody } from "./registered-message-body";
import { RegisteredMessageCreated, RegisteredMessageEvent } from "./registered-message-events";
import { RegisteredMessageId } from "./registered-message-id";
import { RegisteredMessageTitle } from "./registered-message-title";

const RegisteredMessageTypeSymbol = Symbol('RegisteredMessage');


export interface RegisteredMessageParams {
  id: RegisteredMessageId;
  title: RegisteredMessageTitle;
  body: RegisteredMessageBody;
  sequenceNumber: number;
  version: number;
}

class RegisteredMessage implements Aggregate<RegisteredMessage, RegisteredMessageId> {
  readonly symbol: typeof RegisteredMessageTypeSymbol = RegisteredMessageTypeSymbol;
  readonly typeName = 'RegisteredMessage';

  public readonly id: RegisteredMessageId;
  public readonly title: RegisteredMessageTitle;
  public readonly body: RegisteredMessageBody;
  public readonly sequenceNumber: number;
  public readonly version: number;

  private constructor(params: RegisteredMessageParams) {
    this.id = params.id;
    this.title = params.title;
    this.body = params.body;
    this.sequenceNumber = params.sequenceNumber;
    this.version = params.version;
  }

  toJSON() {
    return {
      id: this.id.toJSON(),
      title: this.title,
      body: this.body,
    };
  }

  applyEvent(event: RegisteredMessageEvent): RegisteredMessage {
    switch (event.symbol) {
      // case RegisteredMessageCreatedTypeSymbol: {
      //   const typedEvent = event as RegisteredMessageCreated;
      //   const result = this.rename(typedEvent.name, event.executorId);
      //   if (E.isLeft(result)) {
      //     throw new Error(result.left.message);
      //   }
      //   return result.right[0];
      // }
      default: {
        throw new Error("Unknown event");
      }
    }
  }

  static create(
    id: RegisteredMessageId,
    title: RegisteredMessageTitle,
    body: RegisteredMessageBody,
  ): [RegisteredMessage, RegisteredMessageCreated] {
    const sequenceNumber = 1;
    const version = 1;
    return [
      new RegisteredMessage({
        id,
        title,
        body,
        sequenceNumber,
        version,
      }),
      RegisteredMessageCreated.of(
        id,
        title, 
        body,
        version
      ),
    ];
  }

  static replay(events: RegisteredMessageEvent[], snapshot: RegisteredMessage): RegisteredMessage {
    return events.reduce(
      (RegisteredMessage, event) => RegisteredMessage.applyEvent(event),
      snapshot,
    );
  }

  withVersion(version: number): RegisteredMessage {
    return new RegisteredMessage({ ...this, version });
  }

  updateVersion(versionF: (value: number) => number): RegisteredMessage {
    return new RegisteredMessage({ ...this, version: versionF(this.version) });
  }
}

export { RegisteredMessage, RegisteredMessageTypeSymbol };
