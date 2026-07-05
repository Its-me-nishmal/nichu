// GitHub API types
export interface GitHubUser {
  login: string;
  name: string;
  bio: string;
  location: string;
  avatar_url: string;
  html_url: string;
  public_repos: number;
  followers: number;
  following: number;
  hireable: boolean;
  company: string | null;
  created_at: string;
}

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  watchers_count: number;
  open_issues_count: number;
  topics: string[];
  pushed_at: string;
  created_at: string;
  fork: boolean;
  archived: boolean;
  size: number;
}

const GITHUB_USERNAME = "Its-me-nishmal";
const BASE_URL = "https://api.github.com";

const GITHUB_HEADERS: HeadersInit = {
  Accept: "application/vnd.github.v3+json",
  "User-Agent": "nishmal-portfolio",
};

async function ghFetch(url: string): Promise<Response> {
  const isDev = process.env.NODE_ENV === "development";
  return fetch(url, {
    headers: GITHUB_HEADERS,
    cache: isDev ? "no-store" : "force-cache",
    ...(isDev ? {} : { next: { revalidate: 21600 } }),
  });
}

export async function getGitHubUser(): Promise<GitHubUser | null> {
  try {
    const res = await ghFetch(`${BASE_URL}/users/${GITHUB_USERNAME}`);
    if (!res.ok) {
      console.error(`[GitHub] user fetch failed: ${res.status} ${res.statusText}`);
      return null;
    }
    return res.json() as Promise<GitHubUser>;
  } catch (err) {
    console.error("[GitHub] user fetch error:", err);
    return null;
  }
}

export async function getGitHubRepos(): Promise<GitHubRepo[]> {
  try {
    const fetchPage = async (page: number): Promise<GitHubRepo[]> => {
      const url = `${BASE_URL}/users/${GITHUB_USERNAME}/repos?sort=pushed&per_page=100&page=${page}&type=public`;
      const res = await ghFetch(url);
      if (!res.ok) {
        console.error(`[GitHub] repos page ${page} failed: ${res.status} ${res.statusText}`);
        return [];
      }
      const data = await res.json();
      return Array.isArray(data) ? (data as GitHubRepo[]) : [];
    };

    // Sequential to avoid simultaneous rate limit hits in dev
    const page1 = await fetchPage(1);
    const page2 = page1.length === 100 ? await fetchPage(2) : [];

    const all = [...page1, ...page2];
    console.log(`[GitHub] fetched ${all.length} total repos`);

    const filtered = all.filter((r) => !r.fork && !r.archived);
    console.log(`[GitHub] ${filtered.length} repos after filtering`);

    return filtered.sort(
      (a, b) => new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime()
    );
  } catch (err) {
    console.error("[GitHub] repos fetch error:", err);
    return [];
  }
}

// Score repos to pick the most interesting ones
export function selectFeaturedRepos(repos: GitHubRepo[], count = 8): GitHubRepo[] {
  const scored = repos.map((r) => ({
    repo: r,
    score:
      (r.description && r.description !== "❤️" ? 10 : 0) +
      (r.homepage ? 8 : 0) +
      (r.language ? 5 : 0) +
      r.stargazers_count * 3 +
      r.forks_count * 2 +
      r.topics.length * 2 +
      (r.size > 100 ? 3 : 0),
  }));
  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, count)
    .map((s) => s.repo);
}

// Language colors
export const LANG_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f7df1e",
  Python: "#3572A5",
  Dart: "#00B4AB",
  CSS: "#563d7c",
  HTML: "#e34c26",
  Shell: "#89e051",
  Go: "#00ADD8",
  Rust: "#dea584",
  Java: "#b07219",
};

// Relative time helper
export function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const days = Math.floor(diff / 86400000);
  if (days === 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days}d ago`;
  if (days < 30) return `${Math.floor(days / 7)}w ago`;
  if (days < 365) return `${Math.floor(days / 30)}mo ago`;
  return `${Math.floor(days / 365)}y ago`;
}
