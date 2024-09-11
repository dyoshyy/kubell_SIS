import {
  Project,
  ProjectEvent,
  ProjectId,
} from "cqrs-es-example-js-command-domain";
import * as TE from "fp-ts/TaskEither";
import { RepositoryError } from "../group-chat";
  
interface ProjectRepository {
  withRetention(numberOfEvents: number): ProjectRepository;

  storeEvent(
    event: ProjectEvent,
    version: number,
  ): TE.TaskEither<RepositoryError, void>;

  storeEventAndSnapshot(
    event: ProjectEvent,
    snapshot: Project,
  ): TE.TaskEither<RepositoryError, void>;

  store(
    event: ProjectEvent,
    snapshot: Project,
  ): TE.TaskEither<RepositoryError, void>;

  findById(
    id: ProjectId,
  ): TE.TaskEither<RepositoryError, Project | undefined>;
}
  
  export { ProjectRepository, RepositoryError };
