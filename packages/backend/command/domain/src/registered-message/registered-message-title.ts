import * as E from "fp-ts/lib/Either";
const RegisteredMessageTitleTypeSymbol = Symbol("RegisteredMessageTitle");

class RegisteredMessageTitle {
  readonly symbol: typeof RegisteredMessageTitleTypeSymbol = RegisteredMessageTitleTypeSymbol;

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
    return `RegisteredMessageTitle(${this.value})`;
  }

  equals(anotherTitle: RegisteredMessageTitle): boolean {
    return this.value === anotherTitle.value;
  }

  static validate(value: string): E.Either<string, RegisteredMessageTitle> {
    try {
      return E.right(RegisteredMessageTitle.of(value));
    } catch (error) {
      if (error instanceof Error) {
        return E.left(error.message);
      } else {
        throw error;
      }
    }
  }

  static of(value: string): RegisteredMessageTitle {
    return new RegisteredMessageTitle(value);
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function convertJSONToRegisteredMessageTitle(json: any): RegisteredMessageTitle {
  return RegisteredMessageTitle.of(json.value);
}

export {
  RegisteredMessageTitle,
  RegisteredMessageTitleTypeSymbol,
  convertJSONToRegisteredMessageTitle
};

