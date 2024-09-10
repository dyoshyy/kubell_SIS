import * as Infrastructure from "cqrs-es-example-js-infrastructure";
import { AggregateId } from "event-store-adapter-js";
import * as E from "fp-ts/lib/Either";
import * as U from "ulidx";

const Project_PREFIX: string = "Project";
const ProjectIdTypeSymbol = Symbol("ProjectId");

class ProjectId implements AggregateId {
  readonly symbol: typeof ProjectIdTypeSymbol = ProjectIdTypeSymbol;
  readonly typeName = Project_PREFIX;

  private constructor(public readonly value: string) {}

  toJSON() {
    return {
      value: this.value,
    };
  }

  equals(anotherId: ProjectId): boolean {
    return this.value === anotherId.value;
  }
  asString() {
    return `${Project_PREFIX}-${this.value}`;
  }
  toString() {
    return `ProjectId(${this.value})`;
  }

  static validate(value: string): E.Either<string, ProjectId> {
    try {
      return E.right(ProjectId.of(value));
    } catch (error) {
      if (error instanceof Error) {
        return E.left(error.message);
      } else {
        throw error;
      }
    }
  }

  static of(value: string): ProjectId {
    const ulid = value.startsWith(Project_PREFIX + "-")
      ? value.substring(Project_PREFIX.length + 1)
      : value;
    if (U.isValid(ulid)) {
      return new ProjectId(ulid);
    } else {
      throw new Error("Invalid group chat id");
    }
  }

  static generate(): ProjectId {
    return new ProjectId(Infrastructure.generateULID());
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function convertJSONToGroupChatId(json: any): ProjectId {
  return ProjectId.of(json.value);
}

export { convertJSONToGroupChatId, ProjectId, ProjectIdTypeSymbol };

