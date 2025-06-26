import { ConnectDB } from "@/app/config/connectDB";
import UserModel from "@/models/User";
import bcrypt from "bcryptjs";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authoptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", value: "text" },
        password: { label: "Password", value: "text" },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email And Password Is Missing");
        }
        try {
          await ConnectDB();
          const user = UserModel.findOne({ email: credentials.email });

          if (!user) {
            throw new Error("User Not Found with This Email. ");
          }
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const isValidpassword = await bcrypt.compare(
            credentials.password,
            user.password
          );
          if (!isValidpassword) {
            throw new Error("Invalid password");
          }

          return {
            id: user._id.toString(),
            email: user.email,
            picture: user.picture,
          };
        } catch (error) {
          throw error;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  secret : process.env.NEXTAUTH_SECRET
};
