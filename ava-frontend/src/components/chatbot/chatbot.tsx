import { useState, useEffect, useRef } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageSquare } from "lucide-react";
import Header from "./header";
import Footer from "./footer";
import { SendMsgApiCall } from "@/lib/api";
import Message from "./message";

interface Message {
  id: number;
  sender: "bot" | "user";
  content: string;
  prompts?: Array<string>;
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [fetchingResponse, setFetchingResponse] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "bot",
      content: "Hi there,\n what can I help you with today?",
      prompts: ["Create Report this month", "Call Lead"],
    },
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, fetchingResponse]);

  const handleResponse = async (input: string) => {
    setFetchingResponse(true);
    const lastMessageResponse = await SendMsgApiCall(input);
    console.log({ lastMessageResponse });
    if (lastMessageResponse?.error) {
      setMessages((prev: Message[]) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: "bot",
          content: "Sorry, I didn't get that. Can you please rephrase?",
        },
      ]);
      setInput("");
      setFetchingResponse(false);
      return;
    }
    setFetchingResponse(false);
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now() + 1,
        sender: "bot",
        content: lastMessageResponse,
      },
    ]);
  };

  const handleSend = async (msg = "") => {
    const message = input.trim() || msg;
    if (message.trim()) {
      setMessages((prev) => [
        ...prev,
        { id: Date.now(), sender: "user", content: message },
      ]);
      setInput("");
      await handleResponse(message);
    }
  };

  const handlePrompts = (message: string) => {
    handleSend(message);
  };

  const handleEdit = (id: number) => {
    const messageToEdit = messages.find((msg) => msg.id === id);
    if (messageToEdit) {
      setInput(messageToEdit.content);
    }
  };

  const handleDelete = async (id: number) => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === id ? { ...msg, content: "Deleted message" } : msg,
      ),
    );
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8">
      <div
        className={`rounded-lg sm:rounded-2xl w-full h-full sm:w-[90vw] sm:h-[90vh] md:w-[28rem] md:h-[42rem] max-w-[28rem] max-h-[42rem] flex flex-col shadow-xl transition-all duration-300 ease-in-out ${
          isOpen
            ? "scale-100 opacity-100"
            : "scale-95 opacity-0 pointer-events-none"
        } ${
          isOpen
            ? "fixed inset-0 sm:relative sm:inset-auto"
            : "absolute bottom-0 right-0"
        }`}
      >
        {isOpen && (
          <Card className="flex flex-col h-full">
            <CardHeader className="p-2 flex justify-between items-center">
              <Header setIsOpen={setIsOpen} />
            </CardHeader>
            <CardContent className="flex-grow overflow-hidden p-4">
              <ScrollArea ref={scrollRef} className="h-full pr-4">
                {messages.map((message) => (
                  <Message
                    handlePrompts={handlePrompts}
                    key={message.id}
                    message={message}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                  />
                ))}
                {fetchingResponse && (
                  <Message
                    handlePrompts={handlePrompts}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                    message={{
                      id: Date.now(),
                      sender: "bot",
                      content: "Typing...",
                    }}
                  />
                )}
              </ScrollArea>
            </CardContent>
            <CardFooter className="p-4 flex flex-col space-y-3 border-t pt-3">
              <Footer
                input={input}
                setInput={setInput}
                handleSend={handleSend}
                fetchingResponse={fetchingResponse}
              />
            </CardFooter>
          </Card>
        )}
      </div>

      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 rounded-full border-black p-4 text-white bg-indigo-500 hover:bg-indigo-600 transition-colors"
        >
          <MessageSquare className="font-bold" />
        </button>
      )}
    </div>
  );
}
