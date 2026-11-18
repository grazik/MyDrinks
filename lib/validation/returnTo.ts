import { AUTH_ROUTES, RETURN_TO_PARAM } from "@/src/constants/auth";

const DEFAULT_RETURN_TO = "/";

const MAX_RETURN_TO_LENGTH = 2048;
// Relative paths only parse against a base. Any host smuggled into the input
// replaces this origin, which is how the origin check detects it.
const PLACEHOLDER_ORIGIN = "http://placeholder.invalid";
const AUTH_PATHS = Object.values(AUTH_ROUTES);
const NON_PAGE_PATHS = ["/api"] as const;

type AuthPath = (typeof AUTH_PATHS)[number];

const matchesPath = (pathname: string, base: string) =>
  pathname === base || pathname.startsWith(`${base}/`);

export const isAuthPath = (pathname: string) =>
  AUTH_PATHS.some((authPath) => matchesPath(pathname, authPath));

// Every return path that reaches redirect() MUST pass through here: it comes
// from the query string, so skipping this check is an open redirect.
export const getSafeReturnTo = (value: unknown): string => {
  if (
    typeof value !== "string" ||
    value.length > MAX_RETURN_TO_LENGTH ||
    !value.startsWith("/")
  ) {
    return DEFAULT_RETURN_TO;
  }

  let url: URL;
  try {
    url = new URL(value, PLACEHOLDER_ORIGIN);
  } catch {
    return DEFAULT_RETURN_TO;
  }

  if (url.origin !== PLACEHOLDER_ORIGIN) {
    return DEFAULT_RETURN_TO;
  }

  const path = `${url.pathname}${url.search}`;

  // Dot-segment normalization turns "/.//evil.com" into "//evil.com", which
  // passes the origin check above but is protocol-relative in a browser.
  if (path.startsWith("//")) {
    return DEFAULT_RETURN_TO;
  }

  if (
    isAuthPath(url.pathname) ||
    NON_PAGE_PATHS.some((base) => matchesPath(url.pathname, base))
  ) {
    return DEFAULT_RETURN_TO;
  }

  return path;
};

export const withReturnTo = (authPath: AuthPath, returnTo: unknown) => {
  const safeReturnTo = getSafeReturnTo(returnTo);

  if (safeReturnTo === DEFAULT_RETURN_TO) {
    return authPath;
  }

  const query = new URLSearchParams({ [RETURN_TO_PARAM]: safeReturnTo });
  return `${authPath}?${query}`;
};
