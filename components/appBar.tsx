"use client";

import { useRouter } from "next/navigation";

export default function Appbar(){
    const router = useRouter();

    return (
        <div>
            <button onClick={() => {
                router.push('/chat')
            }}>Chat page</button>
        </div>
    )
}