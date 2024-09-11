import * as E from "fp-ts/lib/Either";
const RegisteredMessageBodyTypeSymbol = Symbol("RegisteredMessageBody");

class RegisteredMessageBody {
  readonly symbol: typeof RegisteredMessageBodyTypeSymbol = RegisteredMessageBodyTypeSymbol;

  private constructor(public readonly value: string) {
    if (this.value.length === 0) {
      throw new Error("RegisteredMessage title cannot be empty");
    }
    if (this.value.length > 100) {
      throw new Error("RegisteredMessage title cannot be longer than 100 characters");
    }
  }

  toJSON() {
    return {
      value: this.value,
    };
  }

  asString() {
    return this.value;
  }

  toString() {
    return `RegisteredMessageBody(${this.value})`;
  }

  equals(anotherName: RegisteredMessageBody): boolean {
    return this.value === anotherName.value;
  }

  static validate(value: string): E.Either<string, RegisteredMessageBody> {
    try {
      return E.right(RegisteredMessageBody.of(value));
    } catch (error) {
      if (error instanceof Error) {
        return E.left(error.message);
      } else {
        throw error;
      }
    }
  }

  static of(value: string): RegisteredMessageBody {
    return new RegisteredMessageBody(value);
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function convertJSONToRegisteredMessageBody(json: any): RegisteredMessageBody {
  return RegisteredMessageBody.of(json.value);
}

export {
  RegisteredMessageBody,
  RegisteredMessageBodyTypeSymbol,
  convertJSONToRegisteredMessageBody
};

