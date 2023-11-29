import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export default withAuth(
  async function middleware(req) {
    const token = await getToken({ req });
    const isAuth = !!token;
    const isApiEndpoint = req.nextUrl.pathname.startsWith("/api");
    const onProtectedPage = ["/create-okr", "/objective-okr"].includes(
      req.nextUrl.pathname
    );

    if (!isAuth && onProtectedPage) {
      console.log("Redireccionando a /sign-in");

      return NextResponse.redirect(new URL("/sign-in", req.url));
    }

    if (isAuth && !onProtectedPage) {
      console.log("Redireccionando a /create-okr");
      return NextResponse.redirect(new URL("/create-okr", req.url));
    }

    if (isApiEndpoint) {
      console.log("pasa por isApiEndPoint");
    }
    return NextResponse.next();

    return NextResponse.next();
  },
  {
    callbacks: {
      async authorized() {
        return true;
      },
    },
  }
);

export const config = {
  matcher: ["/create-okr", "/objective-okr", "/sign-up", "/sign-in"],
};
