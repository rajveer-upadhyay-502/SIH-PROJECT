import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "@/app/lib/db";
import { connectToDatabase } from "@/app/lib/db";
import User from "@/app/lib/models/User";
import bcrypt from "bcrypt";

type Credentials = {
  email?: string;
  password?: string;
};

interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "TEACHER" | "STUDENT";
  institutionId: string; // must always be string
}

export const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise),

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "your-email@example.com" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials: Credentials | undefined): Promise<AuthUser | null> {
        if (!credentials?.email || !credentials?.password) return null;

        await connectToDatabase();

        const user = await User.findOne({ email: credentials.email });
        if (!user) return null;

        const isValid = await bcrypt.compare(credentials.password, user.hashedPassword);
        if (!isValid) return null;

        // Cast user.toObject to expected shape
        const userObj = user.toObject() as {
          _id: { toString: () => string };
          name: string;
          email: string;
          role: "ADMIN" | "TEACHER" | "STUDENT";
          institutionId?: { toString: () => string } | null;
        };

        const cleanUser: AuthUser = {
          id: userObj._id.toString(),
          name: userObj.name,
          email: userObj.email,
          role: userObj.role,
          institutionId: userObj.institutionId ? userObj.institutionId.toString() : "",
        };

        return cleanUser;
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.institutionId = user.institutionId;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as "ADMIN" | "TEACHER" | "STUDENT";
        session.user.institutionId = token.institutionId as string;
      }
      return session;
    },
  },

  pages: {
    signIn: "/login",
    error: "/login",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
