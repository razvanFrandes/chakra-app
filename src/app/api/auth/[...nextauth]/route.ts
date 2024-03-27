import NextAuth from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import PinteresetProvider from "next-auth/providers/pinterest";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import https from "https";

const isDevelopment = process.env.NODE_ENV === "development";

const httpsAgent = new https.Agent({
  rejectUnauthorized: !isDevelopment,
});

export const authOptions: any = {
  secret: process.env.NEXTAUTH_SECRET ?? "",
  pages: {
    signIn: "/login",
    signOut: "/auth/signout",
    error: false,
    verifyRequest: false,
    newUser: false,
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID ?? "",
      clientSecret: process.env.GOOGLE_SECRET ?? "",
    }),
    DiscordProvider({
      clientId: process.env.DISCORD_ID ?? "",
      clientSecret: process.env.DISCORD_SECRET ?? "",
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "",
          type: "",
          placeholder: "",
        },
        password: { label: "", type: "password" },
        twoFactorCode: { label: "", type: "input" }, // Optional field for 2FA code
      },
      authorize: async (credentials, req) => {
        let userInfo = {
          email: "",
          password: "",
        };

        let headerData: {
          "Content-Type": "application/json";
          X_AUTH_CODE?: string;
        } = {
          "Content-Type": "application/json",
        };

        if (credentials?.twoFactorCode?.length ?? 0 > 0) {
          headerData["X_AUTH_CODE"] = credentials?.twoFactorCode;
        }

        const response = await fetch(process.env.WP_API + "/jwt/v1/auth", {
          method: "POST",
          headers: headerData,
          body: JSON.stringify({
            email: userInfo.email ? userInfo.email : credentials?.email,
            password: userInfo.password
              ? userInfo.password
              : credentials?.password,
            AUTH_KEY: process.env.WP_AUTH_KEY ?? "",
          }),
        });

        const data = await response.json();

        console.log(data);

        if (data.data.errorCode === 48) {
          throw new Error("invalid_credentials");
        }

        if (data.success && data.data.jwt) {
          // User is authenticated, return user object
          const user = await fetch(process.env.WP_API + "/wp/v2/users/me", {
            headers: {
              Authorization: `Bearer ${data.data.jwt}`,
            },
          });
          const res = await user.json();
          const userData = {
            name: res.name,
            email: res.user_email,
            image: res.url,
            jwt: data.data.jwt,
          };
          return userData;
        }

        return null;
      },
    }),
  ],

  callbacks: {
    async signIn({ user, account }: { user: any; account: any }) {
      if (account.provider === "credentials") {
        user.accessToken = user.jwt;
        user.token = user.jwt;
        return true;
      }

      try {
        const res = await axios.post(
          process.env.WP_API + "/jwt/v1/auth/provider",
          {
            account: account,
            user: user,
            AUTH_KEY: process.env.WP_AUTH_KEY ?? "",
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
            httpsAgent: isDevelopment ? httpsAgent : undefined,
          }
        );

        if (res.status !== 200) {
          throw new Error(`Failed to sign in. Status code: ${res.status}`);
        }

        const wpResponse = res.data;

        if (wpResponse && wpResponse.response.code === 200) {
          const jsonData = JSON.parse(wpResponse.body);
          user.accessToken = jsonData.data.jwt;
          user.token = jsonData.data.jwt;
          return true;
        } else {
          // console.error("Sign in unsuccessful:", wpResponse);
          return false;
        }
      } catch (error) {
        console.error("Error in signIn callback:", error);
        return false;
      }
    },
    async jwt({ token, user }: { token: any; user: any }) {
      if (user) {
        token.accessToken = user.accessToken;
      }
      return token;
    },

    async session({ session, token }: { session: any; token: any }) {
      session.accessToken = token.accessToken;
      return session;
    },
  },
};

export const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
