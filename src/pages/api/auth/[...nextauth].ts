import { auth } from 'common/libs/firebase/admin';
import NextAuth, { type DefaultSession, type NextAuthOptions, type User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

// NextAuthのSession型を拡張
declare module 'next-auth' {
  interface Session {
    user: {
      // Firebaseの認証情報
      uid?: string;
      emailVerified?: boolean;
    } & DefaultSession['user'];
  }
}

// NextAuthのJWT型を拡張
declare module 'next-auth/jwt' {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  interface JWT {
    // Firebaseの認証情報
    uid: string;
    email_verified: boolean;
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      authorize: async ({ idToken }: any, _req) => {
        if (idToken) {
          try {
            const decoded = await auth.verifyIdToken(idToken); // クライアントから送られたidTokenの検証
            console.log('### decoded: ', decoded);
            const user: User = {
              ...decoded,
              id: decoded.uid,
            };
            console.log('### user: ', user);
            return user; // idTokenからユーザー情報取得し返却
          } catch (err) {
            console.error(err);
          }
        }
        return null;
      },
      credentials: {},
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      // console.log('### jwt token: ', token);
      // console.log('### jwt user: ', user); // userにはauthorize()で返却された値が入る。
      return { ...token, ...user };
    },
    // sessionにJWTトークンからのユーザ情報を格納
    async session({ session, token }) {
      console.log('### callbacks token: ', token); // tokenにはjwt()で返却された値が入る。
      session.user.emailVerified = token.email_verified;
      session.user.uid = token.sub;
      console.log('### callbacks session: ', session);
      return session;
    },
  },
};

export default NextAuth(authOptions);
