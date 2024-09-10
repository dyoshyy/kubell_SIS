import * as E from "fp-ts/lib/Either";
const ProjectLeaderNameTypeSymbol = Symbol("ProjectLeaderName");

class ProjectLeaderName {
  readonly symbol: typeof ProjectLeaderNameTypeSymbol = ProjectLeaderNameTypeSymbol;

  private constructor(public readonly value: string) {
    if (this.value.length === 0) {
      throw new Error("Project-leader name cannot be empty");
    }
    if (this.value.length > 100) {
      throw new Error("Project-leader name cannot be longer than 100 characters");
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
    return `ProjectLeaderName(${this.value})`;
  }

  equals(anotherName: ProjectLeaderName): boolean {
    return this.value === anotherName.value;
  }

  static validate(value: string): E.Either<string, ProjectLeaderName> {
    try {
      return E.right(ProjectLeaderName.of(value));
    } catch (error) {
      if (error instanceof Error) {
        return E.left(error.message);
      } else {
        throw error;
      }
    }
  }

  static of(value: string): ProjectLeaderName {
    return new ProjectLeaderName(value);
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function convertJSONToGroupChatName(json: any): ProjectLeaderName {
  return ProjectLeaderName.of(json.value);
}

export { ProjectLeaderName, ProjectLeaderNameTypeSymbol, convertJSONToGroupChatName };
