import * as E from "fp-ts/lib/Either";
const ProjectNameTypeSymbol = Symbol("ProjectName");

class ProjectName {
  readonly symbol: typeof ProjectNameTypeSymbol = ProjectNameTypeSymbol;

  private constructor(public readonly value: string) {
    if (this.value.length === 0) {
      throw new Error("Project name cannot be empty");
    }
    if (this.value.length > 100) {
      throw new Error("Project name cannot be longer than 100 characters");
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
    return `ProjectName(${this.value})`;
  }

  equals(anotherName: ProjectName): boolean {
    return this.value === anotherName.value;
  }

  static validate(value: string): E.Either<string, ProjectName> {
    try {
      return E.right(ProjectName.of(value));
    } catch (error) {
      if (error instanceof Error) {
        return E.left(error.message);
      } else {
        throw error;
      }
    }
  }

  static of(value: string): ProjectName {
    return new ProjectName(value);
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function convertJSONToProjectName(json: any): ProjectName {
  return ProjectName.of(json.value);
}

export {
  ProjectName,
  ProjectNameTypeSymbol,
  convertJSONToProjectName
};

