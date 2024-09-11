import {
  RegisteredMessage,
  RegisteredMessageEvent,
  RegisteredMessageId,
} from "cqrs-es-example-js-command-domain";
import {
  RegisteredMessageRepository,
  RepositoryError
} from "cqrs-es-example-js-command-interface-adaptor-if";
import { EventStore, OptimisticLockError } from "event-store-adapter-js";
import * as TE from "fp-ts/TaskEither";

type SnapshotDecider = (event: RegisteredMessageEvent, snapshot: RegisteredMessage) => boolean;

class RegisteredMessageRepositoryImpl implements RegisteredMessageRepository {
  private constructor(
    public readonly eventStore: EventStore<
      RegisteredMessageId,
      RegisteredMessage,
      RegisteredMessageEvent
    >,
    private readonly snapshotDecider: SnapshotDecider | undefined,
  ) {}

  store(
    event: RegisteredMessageEvent,
    snapshot: RegisteredMessage,
  ): TE.TaskEither<RepositoryError, void> {
    if (
      event.isCreated ||
      (this.snapshotDecider !== undefined &&
        this.snapshotDecider(event, snapshot))
    ) {
      return this.storeEventAndSnapshot(event, snapshot);
    } else {
      return this.storeEvent(event, snapshot.version);
    }
  }

  storeEvent(
    event: RegisteredMessageEvent,
    version: number,
  ): TE.TaskEither<RepositoryError, void> {
    return TE.tryCatch(
      () => this.eventStore.persistEvent(event, version),
      (reason) => {
        if (reason instanceof OptimisticLockError) {
          return new RepositoryError(
            "Failed to store event and snapshot due to optimistic lock error",
            reason,
          );
        } else if (reason instanceof Error) {
          return new RepositoryError(
            "Failed to store event and snapshot due to error",
            reason,
          );
        }
        return new RepositoryError(String(reason));
      },
    );
  }

  storeEventAndSnapshot(
    event: RegisteredMessageEvent,
    snapshot: RegisteredMessage,
  ): TE.TaskEither<RepositoryError, void> {
    return TE.tryCatch(
      () => this.eventStore.persistEventAndSnapshot(event, snapshot),
      (reason) => {
        if (reason instanceof OptimisticLockError) {
          return new RepositoryError(
            "Failed to store event and snapshot due to optimistic lock error",
            reason,
          );
        } else if (reason instanceof Error) {
          return new RepositoryError(
            "Failed to store event and snapshot due to error",
            reason,
          );
        }
        return new RepositoryError(String(reason));
      },
    );
  }

  findById(
    id: RegisteredMessageId,
  ): TE.TaskEither<RepositoryError, RegisteredMessage | undefined> {
    return TE.tryCatch(
      async () => {
        const snapshot = await this.eventStore.getLatestSnapshotById(id);
        if (snapshot === undefined) {
          return undefined;
        } else {
          const events = await this.eventStore.getEventsByIdSinceSequenceNumber(
            id,
            snapshot.sequenceNumber + 1,
          );
          return RegisteredMessage.replay(events, snapshot);
        }
      },
      (reason) => {
        if (reason instanceof Error) {
          return new RepositoryError("Failed to find by id to error", reason);
        }
        return new RepositoryError(String(reason));
      },
    );
  }

  static of(
    eventStore: EventStore<RegisteredMessageId, RegisteredMessage, RegisteredMessageEvent>,
    snapshotDecider: SnapshotDecider | undefined = undefined,
  ): RegisteredMessageRepository {
    return new RegisteredMessageRepositoryImpl(eventStore, snapshotDecider);
  }

  withRetention(numberOfEvents: number): RegisteredMessageRepository {
    return new RegisteredMessageRepositoryImpl(
      this.eventStore,
      RegisteredMessageRepositoryImpl.retentionCriteriaOf(numberOfEvents),
    );
  }

  static retentionCriteriaOf(numberOfEvents: number): SnapshotDecider {
    return (event: RegisteredMessageEvent, _: RegisteredMessage) => {
      return event.sequenceNumber % numberOfEvents == 0;
    };
  }
}

export { RegisteredMessageRepositoryImpl, RepositoryError };
