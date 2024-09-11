import * as Infrastructure from "cqrs-es-example-js-infrastructure";
import { AggregateId } from "event-store-adapter-js";
import * as E from "fp-ts/lib/Either";
import * as U from "ulidx";

const RegisteredMessage_PREFIX: string = "RegisteredMessage";
const RegisteredMessageIdTypeSymbol = Symbol("RegisteredMessageId");

class RegisteredMessageId implements AggregateId {
  readonly symbol: typeof RegisteredMessageIdTypeSymbol = RegisteredMessageIdTypeSymbol;
  readonly typeName = RegisteredMessage_PREFIX;

  private constructor(public readonly value: string) {}

  toJSON() {
    return {
      value: this.value,
    };
  }

  equals(anotherId: RegisteredMessageId): boolean {
    return this.value === anotherId.value;
  }
  asString() {
    return `${RegisteredMessage_PREFIX}-${this.value}`;
  }
  toString() {
    return `RegisteredMessageId(${this.value})`;
  }

  static validate(value: string): E.Either<string, RegisteredMessageId> {
    try {
      return E.right(RegisteredMessageId.of(value));
    } catch (error) {
      if (error instanceof Error) {
        return E.left(error.message);
      } else {
        throw error;
      }
    }
  }

  static of(value: string): RegisteredMessageId {
    const ulid = value.startsWith(RegisteredMessage_PREFIX + "-")
      ? value.substring(RegisteredMessage_PREFIX.length + 1)
      : value;
    if (U.isValid(ulid)) {
      return new RegisteredMessageId(ulid);
    } else {
      throw new Error("Invalid group chat id");
    }
  }

  static generate(): RegisteredMessageId {
    return new RegisteredMessageId(Infrastructure.generateULID());
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function convertJSONToRegisteredMessageId(json: any): RegisteredMessageId {
  return RegisteredMessageId.of(json.value);
}

export { convertJSONToRegisteredMessageId, RegisteredMessageId, RegisteredMessageIdTypeSymbol };

