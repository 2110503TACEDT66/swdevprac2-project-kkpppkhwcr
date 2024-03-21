import NextAuth, { AuthOptions, User } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
const authOptions: AuthOptions={
    providers:[
        CredentialsProvider({
            name: "Bing Resy Account",
            credentials:{
                username: {label:"username",type:"text",placeholder:"username"},
                password: {label:"password",type:"password",placeholder:"password"}
            },
            async authorize(credentials,req): Promise<any>{
                const user:User = {
                    username:"dummy",
                    email:"dummy@gmail.com",
                    role:"user",
                    joinedAt:'2020-05-11',
                    phone:["081000x000"],
                    id:'1'
                }

                return user as User;
            }
        })
    ],
    session:{
        strategy:"jwt"
    }
}
const handler = NextAuth(authOptions);
export {handler as GET, handler as POST}