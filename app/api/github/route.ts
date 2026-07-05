import { NextResponse } from "next/server";
import { getGitHubUser, getGitHubRepos, selectFeaturedRepos } from "@/lib/github";

export const revalidate = 21600; // 6 hours ISR

export async function GET() {
  const [user, repos] = await Promise.all([getGitHubUser(), getGitHubRepos()]);

  const featured = selectFeaturedRepos(repos, 8);
  const recent = repos.slice(0, 12);

  return NextResponse.json({
    user,
    featured,
    recent,
    total: repos.length,
  });
}
