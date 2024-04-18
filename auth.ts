import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import type { NextAuthConfig } from 'next-auth';

export const { handlers, auth, signIn, signOut } = NextAuth({
    // pages: {
    //     signIn: "/authadmin/login",
    // },
    providers: [
        GithubProvider({
            profile(profile: any) {
                console.log("Profile Github : ", profile);

                let userRole = "Github User";
                if (profile?.email == "irshadali.kadiwala@codezeros.com") {
                    userRole = "admin"
                }
                return {
                    ...profile,
                    role: userRole
                }
            },
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET
        }),
        Credentials({
            async authorize(credentials: any) {

                if (credentials?.username && credentials?.password) {
                    console.log("hello");
                    const { username, password } = credentials;
                    let data: any = await fetch("https://fakestoreapi.com/auth/login", {
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            username, password
                        })
                    })
                    data = await data.json();
                    if (!data?.token) {
                        return null;
                    }
                    console.log("User login successfully = ", data?.token);
                    console.log("Data = ", {username, password});
                    const user = {
                        name: username,
                        role: "user"
                    };                    
                    return user;
                }
                return null
            }
        }),
    ],
    secret: process.env.AUTH_SECRET,
    callbacks: {
        jwt: async ({ token, user }: any) => {
            // token returns only (id, image, name, email) & user returns all things we pass in return object
            // console.log(user, token, "kkkkkkkkkkkkkkkkkkkkkkkk");
            
            if (user) token.role = user.role;
            return token;
        },
        session: async ({ session, token }: any) => {            
            // session returns only (name, email, image, expires) & token returns mostly same but format different
            if (session?.user) session.user.role = token.role;
            return session;
        }
    }
}satisfies NextAuthConfig);