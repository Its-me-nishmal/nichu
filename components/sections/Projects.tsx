import { getGitHubRepos, selectFeaturedRepos } from "@/lib/github";
import ProjectsClient from "@/components/sections/ProjectsClient";

// This is a Server Component — fetches directly on the server
export async function Projects() {
  const repos = await getGitHubRepos();
  const featured = selectFeaturedRepos(repos, 8);
  return <ProjectsClient repos={featured} />;
}
