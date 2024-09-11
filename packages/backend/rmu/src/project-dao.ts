import { PrismaClient } from "@prisma/client";
import { ProjectId, ProjectLeaderName, ProjectName } from "cqrs-es-example-js-command-domain";


class ProjectDao {
  private constructor(private readonly prismaClient: PrismaClient) {}

  async insertProject(
    aggregateId: ProjectId,
    name: ProjectName,
    leaderName: ProjectLeaderName,
    createdAt: Date,
  ) {
    return await this.prismaClient.$transaction(async (_prismaClient) => {
      await _prismaClient.projects.create({
        data: {
          id: aggregateId.asString(),
          name: name.asString(),
          leaderName: leaderName.asString(),
          createdAt: createdAt,
          updatedAt: createdAt,
        },
      });
    });
  }

  // async deleteProject(id: ProjectId, updatedAt: Date) {
  //   return await this.prismaClient.projects.update({
  //     where: { id: id.asString() },
  //     data: { disabled: true, updatedAt: updatedAt },
  //   });
  // }

  static of(prismaClient: PrismaClient) {
    return new ProjectDao(prismaClient);
  }
}

export { ProjectDao };
