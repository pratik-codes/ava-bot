// import { useState, useEffect } from 'react'
// import { motion } from 'framer-motion'
import ChatBot from "@/components/chatbot/chatbot";
import TechCard from "@/components/home/tech-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageSquare, Server, Cpu } from "lucide-react";

export default function Home() {
  // const [isLoaded, setIsLoaded] = useState(false)

  // useEffect(() => {
  //   setIsLoaded(true)
  // }, [])

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      <div
        // initial={{ opacity: 0, y: -20 }}
        // animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : -20 }}
        // transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <div
          className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6"
          // whileHover={{ scale: 1.05 }}
        >
          <Avatar className="w-32 h-32 mb-2 border-2 bg-indigo-500 border-indigo-300">
            <AvatarImage src="https://www.artisan.co/_next/image?url=%2Fassets%2Fhome%2Fava%2Fava.webp&w=384&q=100" />
            <AvatarFallback>AVA</AvatarFallback>
          </Avatar>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Chat with Ava</h1>
        <p className="text-xl text-gray-600">
          AI-powered assistance for your questions
        </p>
      </div>

      <div
      // initial={{ opacity: 0, scale: 0.95 }}
      // animate={{ opacity: isLoaded ? 1 : 0, scale: isLoaded ? 1 : 0.95 }}
      // transition={{ duration: 0.5, delay: 0.2 }}
      ></div>

      <div
        // initial={{ opacity: 0, y: 20 }}
        // animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
        // transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-16 w-full max-w-3xl"
      >
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
        Made with care by Pratik · Hosted on Vercel · Open source on GitHub
      </footer>

      <ChatBot />
    </div>
  );
}
