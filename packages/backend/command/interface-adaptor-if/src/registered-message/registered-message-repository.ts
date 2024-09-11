import {
  RegisteredMessage,
  RegisteredMessageEvent,
  RegisteredMessageId,
} from "cqrs-es-example-js-command-domain";
import * as TE from "fp-ts/TaskEither";
import { RepositoryError } from "../group-chat";
  
interface RegisteredMessageRepository {
  withRetention(numberOfEvents: number): RegisteredMessageRepository;

  storeEvent(
    event: RegisteredMessageEvent,
    version: number,
  ): TE.TaskEither<RepositoryError, void>;

  storeEventAndSnapshot(
    event: RegisteredMessageEvent,
    snapshot: RegisteredMessage,
  ): TE.TaskEither<RepositoryError, void>;

  store(
    event: RegisteredMessageEvent,
    snapshot: RegisteredMessage,
  ): TE.TaskEither<RepositoryError, void>;

  findById(
    id: RegisteredMessageId,
  ): TE.TaskEither<RepositoryError, RegisteredMessage | undefined>;
}
  
  export { RegisteredMessageRepository, RepositoryError };
