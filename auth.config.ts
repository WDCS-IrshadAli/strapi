// import type { NextAuthConfig } from 'next-auth';

// export const authConfig = {
//     // pages: {
//     //     signIn: "/authadmin/login",
//     // },
//     callbacks: {
//         authorized({ auth, request: { nextUrl } }) {
//             console.log(auth, "max");
            
//             const isLoggedIn = !!auth?.user;
//             const isOnDashboard = nextUrl.pathname.startsWith('/admin');
//             if (isOnDashboard) {
//                 if (isLoggedIn) return true;
//                 return false; // Redirect unauthenticated users to login page
//             } else if (isLoggedIn) {
//                 return Response.redirect(new URL('/admin/dashboard', nextUrl));
//             }
//             return true;
//         },
//     },
//     providers: [], // Add providers with an empty array for now
// } satisfies NextAuthConfig;