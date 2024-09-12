import {
  GroupChatDeleteError,
  RegisteredMessage,
  RegisteredMessageBody,
  RegisteredMessageEvent,
  RegisteredMessageId,
  RegisteredMessageTitle,
} from "cqrs-es-example-js-command-domain";
import {
  RegisteredMessageRepository,
  RepositoryError,
} from "cqrs-es-example-js-command-interface-adaptor-if";
import * as TE from "fp-ts/TaskEither";
import { pipe } from "fp-ts/function";
import { ProcessError, ProcessInternalError } from "../group-chat";

class RegisteredMessageCommandProcessor {
private constructor(
  private readonly registeredMessageRepository: RegisteredMessageRepository,
) {}

createRegisteredMessage(
  title: RegisteredMessageTitle,
  body: RegisteredMessageBody,
): TE.TaskEither<ProcessError, RegisteredMessageEvent> {
  return pipe(
    TE.right(RegisteredMessageId.generate()),
    TE.chain((id) => TE.right(RegisteredMessage.create(id, title, body))),
    TE.chain(([registeredMessage, registeredMessageCreated]) =>
      pipe(
        this.registeredMessageRepository.store(registeredMessageCreated, registeredMessage),
        TE.map(() => registeredMessageCreated),
      ),
    ),
    TE.mapLeft(this.convertToProcessError),
  );
}

static of(
  groupChatRepository: RegisteredMessageRepository,
): RegisteredMessageCommandProcessor {
  return new RegisteredMessageCommandProcessor(groupChatRepository);
}

private convertToProcessError(e: unknown): ProcessError {
  if (e instanceof ProcessError) {
    return e;
  } else if (e instanceof RepositoryError) {
    return new ProcessInternalError("Failed to repository operation", e);
  } else if (e instanceof GroupChatDeleteError) {
    return new ProcessInternalError("Failed to delete group chat", e);
  }
  throw e;
}

//   private getOrError(
//     groupChatOpt: RegisteredMessage | undefined,
//   ): TE.TaskEither<ProcessError, RegisteredMessage> {
//     return groupChatOpt === undefined
//       ? TE.left(new ProcessNotFoundError("RegisteredMessage not found"))
//       : TE.right(groupChatOpt);
//   }



private retry<T>(
  fn: () => TE.TaskEither<ProcessError, T>,
  retries: number,
  delay: number,
): TE.TaskEither<ProcessError, T> {
  return pipe(
    fn(),
    TE.orElse((error) =>
      error instanceof RepositoryError && retries > 0
        ? pipe(
            TE.fromTask(
              () => new Promise((resolve) => setTimeout(resolve, delay)),
            ),
            TE.chain(() => this.retry(fn, retries - 1, delay)),
          )
        : TE.left(error),
    ),
  );
}
}

export { RegisteredMessageCommandProcessor };

// abstract class ProcessError extends Error {}

// class ProcessInternalError extends ProcessError {
// constructor(message: string, cause?: Error) {
//   super(message);
//   this.name = "ProcessError";
//   this.cause = cause;
// }
// }

// class ProcessNotFoundError extends ProcessError {
// constructor(message: string, cause?: Error) {
//   super(message);
//   this.name = "ProcessError";
//   this.cause = cause;
// }
// }

// export {
//   ProcessError,
//   ProcessInternalError,
//   ProcessNotFoundError, RegisteredMessageCommandProcessor
// };
