import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  basicAuthPassword,
  basicAuthUser,
  isBasicAuthEnabled,
} from "./constants/basicAuth";

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

function isBasicAuthValid(request: NextRequest): boolean {
  const authHeader = request.headers.get("authorization");
  if (!authHeader?.startsWith("Basic ")) {
    return false;
  }

  let decoded: string;
  try {
    decoded = atob(authHeader.slice(6));
  } catch {
    return false;
  }

  const colonIndex = decoded.indexOf(":");
  if (colonIndex === -1) {
    return false;
  }

  const user = decoded.slice(0, colonIndex);
  const password = decoded.slice(colonIndex + 1);

  return user === basicAuthUser && password === basicAuthPassword;
}

function basicAuthUnauthorized(): NextResponse {
  return new NextResponse("Authentication required", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Secure Area"',
    },
  });
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (isBasicAuthEnabled && !isBasicAuthValid(request)) {
    return basicAuthUnauthorized();
  }

  let response = NextResponse.next();
  const supabase = createMiddlewareClient({ req: request, res: response });
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error) {
    response.headers.set("x-current-path", pathname);
    return response;
  }

  if (pathname.startsWith("/auth/signin") && session) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  response.headers.set("x-current-path", pathname);

  return response;
}
