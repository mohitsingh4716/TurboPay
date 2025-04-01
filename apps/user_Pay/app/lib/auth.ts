import db from "@repo/db/client";
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcrypt";
import { signinInput } from "../../../../packages/validation/src/inputValidation"

export const authOptions = {
    providers: [
      CredentialsProvider({
          name: 'Credentials',
          credentials: {
            phone: { label: "Phone", type: "text", required: true },
            password: { label: "Password", type: "password", required: true }
          },
          // TODO: User credentials type from next-aut
          async authorize(credentials: any) {
            // Do zod validation, OTP validation here
            if(!credentials.phone || !credentials.password){
                throw new Error("Please fill all fields");
            }

            const { phone, password } = credentials;

            const { success } = signinInput.safeParse({ phone, password });
            if(!success){
                throw new Error("Invalid input");
            }

         

            const existingUser = await db.user.findFirst({
                where: {
                    phone:phone
                }
            });

            if(!existingUser){
                throw new Error("User not found");
            }
            if(!existingUser.password){
                throw new Error("password invalid");
            }

            const passwordValidation =  await bcrypt.compare(password, existingUser.password);

            if(!passwordValidation){
                throw new Error("Invalid password");
            }

            return {
                id: existingUser.id,
                name: existingUser.name,
                phone: existingUser.phone
            }
            
            
            // try {
            //     const user = await db.user.create({
            //         data: {
            //             phone: credentials.phone,
            //             password: hashedPassword,
            //             name: credentials.name || "Default Name"
            //         }
            //     });
            
            // } catch(e) {
            //     console.error(e);
            // }

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
  