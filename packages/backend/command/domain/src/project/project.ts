import { Aggregate } from "event-store-adapter-js";
import { ProjectCreated, ProjectEvent } from "./project-events";
import { convertJSONToProjectId, ProjectId } from "./project-id";
import { ProjectLeaderName } from "./project-leader-name";
import { convertJSONToProjectName, ProjectName } from "./project-name";

const ProjectTypeSymbol = Symbol('Project');


export interface ProjectParams {
  id: ProjectId;
  name: ProjectName;
  leaderName: ProjectLeaderName;
  sequenceNumber: number;
  version: number;
}

class Project implements Aggregate<Project, ProjectId> {
  readonly symbol: typeof ProjectTypeSymbol = ProjectTypeSymbol;
  readonly typeName = 'Project';

  public readonly id: ProjectId;
  public readonly name: ProjectName;
  public readonly leaderName: ProjectLeaderName;
  public readonly sequenceNumber: number;
  public readonly version: number;

  private constructor(params: ProjectParams) {
    this.id = params.id;
    this.name = params.name;
    this.leaderName = params.leaderName;
    this.sequenceNumber = params.sequenceNumber;
    this.version = params.version;
  }

  toJSON() {
    return {
      id: this.id.toJSON(),
      name: this.name,
      leaderName: this.leaderName,
    };
  }

  applyEvent(event: ProjectEvent): Project {
    switch (event.symbol) {
      // case ProjectCreatedTypeSymbol: {
      //   const typedEvent = event as ProjectCreated;
      //   const result = this.rename(typedEvent.name, event.executorId);
      //   if (E.isLeft(result)) {
      //     throw new Error(result.left.message);
      //   }
      //   return result.right[0];
      // }
      default: {
        throw new Error("Unknown event");
      }
    }
  }

  static create(
    id: ProjectId,
    name: ProjectName,
    leaderName: ProjectLeaderName,
  ): [Project, ProjectCreated] {
    const sequenceNumber = 1;
    const version = 1;
    return [
      new Project({
        id,
        name,
        leaderName,
        sequenceNumber,
        version,
      }),
      ProjectCreated.of(id, name, leaderName, version),
    ];
  }

  static replay(events: ProjectEvent[], snapshot: Project): Project {
    return events.reduce(
      (Project, event) => Project.applyEvent(event),
      snapshot,
    );
  }

  withVersion(version: number): Project {
    return new Project({ ...this, version });
  }

  updateVersion(versionF: (value: number) => number): Project {
    return new Project({ ...this, version: versionF(this.version) });
  }

  static of(params: ProjectParams): Project{
    return new Project(params);
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function convertJSONToProject(json: any): Project {
  const id = convertJSONToProjectId(json.data.id);
  const name = convertJSONToProjectName(json.data.name);
  return Project.of({
    id,
    name,
    leaderName: json.data.leaderName,
    sequenceNumber: json.data.sequenceNumber,
    version: json.data.version,
  });
}

export { convertJSONToProject, Project, ProjectTypeSymbol };

