import db from "@repo/db/client";
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcrypt";

export const authOptions = {
    providers: [
      CredentialsProvider({
          name: 'Credentials',
          credentials: {
            phone: { label: "Phone number", type: "text", placeholder: "1231231231", required: true },
            password: { label: "Password", type: "password", required: true }
          },
          // TODO: User credentials type from next-aut
          async authorize(credentials: any) {
            // Do zod validation, OTP validation here
            const hashedPassword = await bcrypt.hash(credentials.password, 10);
            const existingUser = await db.user.findFirst({
                where: {
                    phone: credentials.phone
                }
            });

            if (existingUser) {
                const passwordValidation = existingUser.password && await bcrypt.compare(credentials.password, existingUser.password);
                if (passwordValidation) {
                    return {
                        id: existingUser.id,
                        name: existingUser.name,
                        phone: existingUser.phone
                    }
                }
                return null;
            }

            try {
                const user = await db.user.create({
                    data: {
                        phone: credentials.phone,
                        password: hashedPassword,
                        name: credentials.name || "Default Name"
                    }
                });
            
                return {
                    id: user.id,
                    name: user.name,
                    phone: user.phone
                }
            } catch(e) {
                console.error(e);
            }

            return null
          },
        })
    ],
    secret: process.env.JWT_SECRET || "secret",
    callbacks: {
        // TODO: can u fix the type here? Using any is bad
        async jwt({token, user}:any){
            if(user){
               token.sub = user.id;
               token.phone = user.phone;
               token.name = user.name;
            
            }
            return token;
        },
        async session({ token, session }: any) {
            session.user.id = token.sub;
            session.user.phone = token.phone;
            session.user.name = token.name;
            return session
        }
    },
    pages: {
        signIn: '/signin',
        
    },
  }
  