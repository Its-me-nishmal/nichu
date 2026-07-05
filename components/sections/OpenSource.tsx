import { getGitHubUser, getGitHubRepos } from "@/lib/github";
import OpenSourceClient from "@/components/sections/OpenSourceClient";

export async function OpenSource() {
  const [user, repos] = await Promise.all([getGitHubUser(), getGitHubRepos()]);
  return <OpenSourceClient user={user} repos={repos.slice(0, 12)} />;
}
