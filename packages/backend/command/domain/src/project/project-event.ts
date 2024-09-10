import * as Infrastructure from "cqrs-es-example-js-infrastructure";
import { Event } from "event-store-adapter-js";
import { ProjectId } from "./project-id";
import { ProjectLeaderName } from "./project-leader-name";
import { ProjectName } from "./project-name";

type ProjectEventTypeSymbol =
  | typeof ProjectCreatedTypeSymbol
//   | typeof ProjectRenamedTypeSymbol
//   | typeof GroupChatMemberAddedTypeSymbol
//   | typeof GroupChatMemberRemovedTypeSymbol
//   | typeof GroupChatMessagePostedTypeSymbol
//   | typeof GroupChatMessageDeletedTypeSymbol
  | typeof ProjectCreatedTypeSymbol;

interface ProjectEvent extends Event<ProjectId> {
  symbol: ProjectEventTypeSymbol;
  toString: () => string;
}

const ProjectCreatedTypeSymbol = Symbol("ProjectCreated");

class ProjectCreated implements ProjectEvent {
  readonly symbol: typeof ProjectCreatedTypeSymbol =
    ProjectCreatedTypeSymbol;
  readonly typeName = "GroupChatCreated";

  private constructor(
    public readonly id: string,
    public readonly aggregateId: ProjectId,
    public readonly name: ProjectName,
    public readonly leaderName: ProjectLeaderName,
    public readonly sequenceNumber: number,
    public readonly occurredAt: Date,
  ) {}

  isCreated: boolean = true;

  // toString() {
  //   return `GroupChatCreated(${this.id.toString()}, ${this.aggregateId.toString()}, ${this.name.toString()}, ${this.members.toString()}, ${this.executorId.toString()}, ${this.sequenceNumber}, ${this.occurredAt.toISOString()})`;
  // }

  static of(
    aggregateId: ProjectId,
    name: ProjectName,
    leaderName: ProjectLeaderName,
    sequenceNumber: number,
  ): ProjectCreated {
    return new ProjectCreated(
      Infrastructure.generateULID(),
      aggregateId,
      name,
      leaderName,
      sequenceNumber,
      new Date(),
    );
  }
}

export { ProjectCreated, ProjectCreatedTypeSymbol, ProjectEvent };



