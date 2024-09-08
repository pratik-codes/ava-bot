import ChatBot from "@/components/chatbot/chatbot";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Home() {
  return (
    <div className="flex flex-col justify-center w-screen min-h-screen min-w-screen items-center">
      <div>
        <Avatar className="w-32 h-32 mb-2 border-2 border-indigo-500">
          <AvatarImage src="https://www.artisan.co/_next/image?url=%2Fassets%2Fhome%2Fava%2Fava.webp&w=384&q=100" />
          <AvatarFallback>AVA</AvatarFallback>
        </Avatar>
        <h1 className="text-5xl mb-2 font-bold">Chat with Ava</h1>
        <div className="flex space-x-4">
          <p className="text-gray-500">
            An <b>AI</b> powered chat bot which helps you with any questions you
            have
          </p>
          <div className="text-2xl border-gray-700 border-2 px-2 rounded-full">
            ↘️
          </div>
        </div>
      </div>
      <ChatBot />
    </div>
  );
}
