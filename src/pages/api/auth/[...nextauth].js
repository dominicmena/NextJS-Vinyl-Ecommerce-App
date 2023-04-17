import NextAuth from "next-auth/next";
import User from "../../../../models/User";
import CredentialsProvider from 'next-auth/providers/credentials';
import db from "../../../../utils/db";
import bcryptjs from 'bcryptjs'

export default NextAuth({
    session: {
        strategy: 'jwt',
    },
    callbacks:{
        async jwt({token, user}) {
            if (user?._id) token._id = user._id;
            if (user?.isAdmin) token.isAdmin = user.isAdmin
            return token
        },
        async session({session, token}){
            if (token?._id) session.user._id = token._id;
            if (token?.isAdmin) session.user.isAdmin = token.isAdmin
            return session;
        },
    },
    providers: [
        CredentialsProvider({
            async authorize(credentials) {
                await db.connect()
                const user = await User.findOne({
                    email: credentials.email,
                })
                await db.disconnect();
                if (user && bcryptjs.compareSync(credentials.password, user.password)) {
                    return {
                        _id: user._id,
                        name: user.name,
                        email: user.email,
                        image: 'f',
                        isAdmin: user.isAdmin
                    };
                }
                throw new Error('Invalid email or password')
            },
        }),
    ],
})

//This is a code that sets up user authentication CredentialsProvider, which allows users to authenticate using email and password.

//The jwt and session callbacks are used to set and retrieve data from the user's JSON Web Token (JWT) and session, respectively. The jwt callback is called when the user logs in, and it adds the user's ID and admin status to the token. The session callback is called when the user navigates through the app, and it adds the user's ID and admin status to the session.

//The authorize function is called when the user attempts to log in. It first connects to a database using db.connect(), finds the user with the matching email address in the User model, and then checks whether the password provided by the user matches the hashed password in the database using bcryptjs.compareSync(). If the email and password match, the user's data is returned as an object, including the user's ID, name, email, image, and admin status. If the email and password do not match, an error is thrown with the message "Invalid email or password". Finally, the database connection is closed using db.disconnect().