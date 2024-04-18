import { auth } from "./auth";

export default auth ((req: any) => {
  const { nextUrl } = req;
  const role = req?.auth?.user?.role;
  const isLoggedIn = !!req.auth;

  console.log("Logged In user data = ", req.auth);
  // console.log("nnnnnnnnnnnnnnnnnnnnnnnnnn", nextUrl);

  const path = nextUrl.pathname;
  const accessAdminPages = path.startsWith("/admin");
  const accessAdminLoginPages = path.startsWith("/authadmin");
  const protectedPages = path.startsWith("/admin/categories");

  if (accessAdminPages==true && !isLoggedIn) {
    return Response.redirect(new URL("/authadmin/login", nextUrl)); 
  } else if (accessAdminLoginPages==true && isLoggedIn) {
      return Response.redirect(new URL("/admin/dashboard", nextUrl));
  } else if (role!="admin" && isLoggedIn && protectedPages==true) {
      return Response.redirect(new URL("/admin/dashboard", nextUrl));
  }
})

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};