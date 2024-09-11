import {
  Project,
  ProjectEvent,
  ProjectId,
} from "cqrs-es-example-js-command-domain";
import {
  ProjectRepository,
  RepositoryError
} from "cqrs-es-example-js-command-interface-adaptor-if";
import { EventStore, OptimisticLockError } from "event-store-adapter-js";
import * as TE from "fp-ts/TaskEither";

type SnapshotDecider = (event: ProjectEvent, snapshot: Project) => boolean;

class ProjectRepositoryImpl implements ProjectRepository {
  private constructor(
    public readonly eventStore: EventStore<
      ProjectId,
      Project,
      ProjectEvent
    >,
    private readonly snapshotDecider: SnapshotDecider | undefined,
  ) {}

  store(
    event: ProjectEvent,
    snapshot: Project,
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
    event: ProjectEvent,
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
    event: ProjectEvent,
    snapshot: Project,
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
    id: ProjectId,
  ): TE.TaskEither<RepositoryError, Project | undefined> {
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
          return Project.replay(events, snapshot);
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
    eventStore: EventStore<ProjectId, Project, ProjectEvent>,
    snapshotDecider: SnapshotDecider | undefined = undefined,
  ): ProjectRepository {
    return new ProjectRepositoryImpl(eventStore, snapshotDecider);
  }

  withRetention(numberOfEvents: number): ProjectRepository {
    return new ProjectRepositoryImpl(
      this.eventStore,
      ProjectRepositoryImpl.retentionCriteriaOf(numberOfEvents),
    );
  }

  static retentionCriteriaOf(numberOfEvents: number): SnapshotDecider {
    return (event: ProjectEvent, _: Project) => {
      return event.sequenceNumber % numberOfEvents == 0;
    };
  }
}

export { ProjectRepositoryImpl, RepositoryError };
