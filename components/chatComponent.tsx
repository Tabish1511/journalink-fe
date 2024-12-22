"use client";

import { useEffect, useState, useRef } from "react";
import { AllMessagesComponent } from "./allMessagesComponent";

export default function ChatComponent() {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [allMessages, setAllMessages] = useState<string[]>([]);
  const [message, setMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const baseEndpoint = process.env.NEXT_PUBLIC_API_URL as string;
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {

    const newSocket = new WebSocket(`${baseEndpoint}/api/v1/chatWs`);
    newSocket.onopen = () => {
      console.log("Connection established");
      setSocket(newSocket);
    };

    newSocket.onmessage = (message) => {
      console.log("Message received:", message);
      setAllMessages((prevMessages) => [...prevMessages, message.data]);
    };
  }, [baseEndpoint]);

  if (!socket) {
    return <div>Loading messages...</div>;
  }

  return (
    <div className="h-screen flex justify-center">
      <div className="w-2/6 flex flex-col justify-center">
        <AllMessagesComponent messagesObject={allMessages} />
        <div className="flex justify-center">
          <input
            ref={inputRef}
            autoFocus
            className="rounded-lg bg-indigo-800 border-sky-500 w-4/5 py-4"
            onChange={(e) => setMessage(e.target.value)}
            value={message}
            placeholder="Type your message"
          />
          <button
            className="rounded-lg bg-indigo-800 border-sky-500 w-32 py-4"
            onClick={() => {
              if (message.trim() === "") return;
              socket?.send(message);
              setMessage("");
              inputRef.current?.focus();
            }}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
