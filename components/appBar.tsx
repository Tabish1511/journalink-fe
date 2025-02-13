"use client";

import { useRouter } from "next/navigation";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Appbar(){
    const router = useRouter();
    const session = useSession();

    return (
        <div>
            <button onClick={() => {
                router.push('/chat')
            }}>Chat page</button>
            -
            <button onClick={()=> signIn()}>
                Signin
            </button>
            -
            <button onClick={()=> signOut()}>
                Signout
            </button>
        
        
        <br/>
        {JSON.stringify(session)}

        
        
        </div>

    )
}