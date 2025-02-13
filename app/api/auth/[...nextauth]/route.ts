import NextAuth from "next-auth"
import CredentialsProvider from 'next-auth/providers/credentials';
const baseEndpoint = process.env.NEXT_PUBLIC_API_URL as string;

const handler = NextAuth({
  providers: [
    CredentialsProvider({
        name: 'Credentials',
        credentials: {
          email: { label: 'Email', type: 'text', placeholder: 'Email' },
          password: { label: 'Password', type: 'password', placeholder: 'Password' },
        },
        async authorize(credentials: any) {
            const email = credentials.email;
            const password = credentials.password;

            // Example: Replace with actual backend API endpoint
            const response = await fetch(`${baseEndpoint}/api/v1/user`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
            //   body: JSON.stringify({ email, password }),
            });

            const textResponse = await response.text();
            console.log("TEXT RESPONSE FROM BACKEND: ", textResponse);
            
            return {
                id: "1",
                email: email,
                password: password,
            }

            // try {
            //     const user = JSON.parse(textResponse); // Manually parse JSON
            //     console.log("User authenticated:", user);
            //     return user;
            // } catch (error) {
            //     console.error("Invalid JSON response:", textResponse);
            //     throw new Error('Authentication failed: Invalid JSON response');
            // }
        },
      })
  ],
  secret: process.env.NEXTAUTH_SECRET
})

export { handler as GET, handler as POST }
