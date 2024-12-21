"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import ChatComponent from "@/components/chatComponent";

export default function Chat() {
  const router = useRouter();

  return (
    <div>
        chat component
      <ChatComponent />
    </div>
  )
}