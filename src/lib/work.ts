import { projects, type Project } from "./portfolio-data";

export type WorkProject = Project & {
  displayNumber: string;
};

export function getWorkProjects(): WorkProject[] {
  return projects
    .filter((project) => project.status === "published")
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map((project, index) => ({
      ...project,
      displayNumber: String(index + 1).padStart(2, "0"),
    }));
}
