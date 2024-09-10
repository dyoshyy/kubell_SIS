import {
  GroupChatDeleteError,
  Project,
  ProjectEvent,
  ProjectId,
  ProjectLeaderName,
  ProjectName
} from "cqrs-es-example-js-command-domain";
import {
  ProjectRepository,
  RepositoryError,
} from "cqrs-es-example-js-command-interface-adaptor-if";
import * as TE from "fp-ts/TaskEither";
import { pipe } from "fp-ts/function";

class ProjectCommandProcessor {
private constructor(
  private readonly projectRepository: ProjectRepository,
) {}

createProject(
    name: ProjectName,
    leaderName: ProjectLeaderName,
): TE.TaskEither<ProcessError, ProjectEvent> {
  return pipe(
    TE.right(ProjectId.generate()),
    TE.chain((id) => TE.right(Project.create(id, name, leaderName))),
    TE.chain(([project, projectCreated]) =>
      pipe(
        this.projectRepository.store(projectCreated, project),
        TE.map(() => projectCreated),
      ),
    ),
    TE.mapLeft(this.convertToProcessError),
  );
}

static of(
  groupChatRepository: ProjectRepository,
): ProjectCommandProcessor {
  return new ProjectCommandProcessor(groupChatRepository);
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
//     groupChatOpt: Project | undefined,
//   ): TE.TaskEither<ProcessError, Project> {
//     return groupChatOpt === undefined
//       ? TE.left(new ProcessNotFoundError("Project not found"))
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

abstract class ProcessError extends Error {}

class ProcessInternalError extends ProcessError {
constructor(message: string, cause?: Error) {
  super(message);
  this.name = "ProcessError";
  this.cause = cause;
}
}

class ProcessNotFoundError extends ProcessError {
constructor(message: string, cause?: Error) {
  super(message);
  this.name = "ProcessError";
  this.cause = cause;
}
}

export {
  ProcessError,
  ProcessInternalError,
  ProcessNotFoundError, ProjectCommandProcessor
};
