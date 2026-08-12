import { projects, type Project, type ProjectStatus } from "./portfolio-data";

export type WorkProject = Project & {
  displayNumber: string;
};

const publishedProjects = (): Project[] =>
  projects
    .filter((project) => project.status === "published")
    .sort((a, b) => a.sortOrder - b.sortOrder);

const toWorkProject = (project: Project, index: number): WorkProject => ({
  ...project,
  displayNumber: String(index + 1).padStart(2, "0"),
});

export function getWorkProjects(): WorkProject[] {
  return publishedProjects().map(toWorkProject);
}

export function getProjectById(id: string): WorkProject | undefined {
  return getWorkProjects().find((project) => project.id === id);
}

export function getProjectBySlug(slug: string): WorkProject | undefined {
  return getWorkProjects().find((project) => project.id === slug);
}

export function getPreviousProject(slug: string): WorkProject | undefined {
  const workProjects = getWorkProjects();
  const index = workProjects.findIndex((project) => project.id === slug);
  return index > 0 ? workProjects[index - 1] : undefined;
}

export function getNextProject(slug: string): WorkProject | undefined {
  const workProjects = getWorkProjects();
  const index = workProjects.findIndex((project) => project.id === slug);
  return index >= 0 && index < workProjects.length - 1 ? workProjects[index + 1] : undefined;
}

export type { ProjectStatus };
