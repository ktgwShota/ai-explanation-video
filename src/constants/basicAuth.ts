export const basicAuthUser = process.env.BASIC_AUTH_USER ?? "";
export const basicAuthPassword = process.env.BASIC_AUTH_PASSWORD ?? "";

export const isBasicAuthEnabled =
  process.env.BASIC_AUTH_ENABLED === "true" ||
  (basicAuthUser !== "" && basicAuthPassword !== "");
