import { RETURN_TO_PARAM } from "@/src/constants/auth";

const DEFAULT_RETURN_TO = "/";

const MAX_RETURN_TO_LENGTH = 2048;
const PARSE_BASE = "http://return-to.invalid";
const AUTH_PATHS = ["/sign-in", "/sign-up"] as const;
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
    url = new URL(value, PARSE_BASE);
  } catch {
    return DEFAULT_RETURN_TO;
  }

  if (url.origin !== PARSE_BASE) {
    return DEFAULT_RETURN_TO;
  }

  const path = `${url.pathname}${url.search}${url.hash}`;

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
