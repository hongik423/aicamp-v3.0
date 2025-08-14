import { GET as apiGET, OPTIONS as apiOPTIONS } from "../api/manifest/route";

// Re-export handlers so that `/manifest.webmanifest` responds with the same data as `/api/manifest`.
// This avoids duplication and ensures both routes stay in sync.
export const GET = apiGET;
export const OPTIONS = apiOPTIONS;
