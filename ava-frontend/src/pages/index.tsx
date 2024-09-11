import ChatBot from "@/components/chatbot/chatbot";
import TechCard from "@/components/home/tech-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageSquare, Server, Cpu } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      <div className="text-center mb-12">
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Avatar className="w-24 h-24 md:w-32 md:h-32 mt-4 md:mb-8 border-2 bg-indigo-500 border-indigo-300">
            <AvatarImage src="https://www.artisan.co/_next/image?url=%2Fassets%2Fhome%2Fava%2Fava.webp&w=384&q=100" />
            <AvatarFallback>AVA</AvatarFallback>
          </Avatar>
        </div>

        <h1 className="text-4xl font-bold text-gray-900 mb-2">Chat with Ava</h1>

        <p className="text-xl text-gray-600">
          AI-powered assistance for your questions
        </p>
      </div>

      <div className="w-full max-w-3xl">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Our Tech Stack
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <TechCard
            icon={<Cpu className="w-6 h-6 text-gray-600" />}
            title="Frontend"
            techs={["Next.js", "TypeScript", "shadcn/ui"]}
          />
          <TechCard
            icon={<Server className="w-6 h-6 text-gray-600" />}
            title="Backend"
            techs={["Flask", "OpenAI"]}
          />
          <TechCard
            icon={<MessageSquare className="w-6 h-6 text-gray-600" />}
            title="AI"
            techs={["LangChain"]}
          />
        </div>
      </div>

      <footer className="mt-16 text-gray-500 text-sm">
        Made with care by{" "}
        <Link
          className="hover:underline hover:text-black hover:font-bold"
          href="tiwaripratik.com"
        >
          Pratik
        </Link>{" "}
        · Hosted on Vercel · Open source on{" "}
        <Link
          className="hover:underline hover:text-black hover:font-bold"
          href="https://github.com/pratik-codes/ava-bot"
        >
          GitHub
        </Link>{" "}
      </footer>

      <ChatBot />
    </div>
  );
}
