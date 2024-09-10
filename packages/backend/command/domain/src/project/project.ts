import { Aggregate } from "event-store-adapter-js";
import { ProjectCreated } from "./project-event";
import { ProjectId } from "./project-id";
import { ProjectLeaderName } from "./project-leader-name";
import { ProjectName } from "./project-name";

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

  withVersion(version: number): Project {
    return new Project({ ...this, version });
  }

  updateVersion(versionF: (value: number) => number): Project {
    return new Project({ ...this, version: versionF(this.version) });
  }
}

export { Project, ProjectTypeSymbol };
