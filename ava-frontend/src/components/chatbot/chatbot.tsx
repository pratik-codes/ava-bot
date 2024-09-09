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
import { SendMsgApiCall } from "@/utils/api";
import Message from "./message";

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "bot",
      content: "Hi there,\n what can I help you with today?",
    },
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    // Scroll to the bottom of the scroll area whenever messages are updated
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  const handleSend = async () => {
    if (input.trim()) {
      // if the user is sending a new message
      setMessages([
        ...messages,
        { id: Date.now(), sender: "user", content: input },
      ]);
      setInput("");
      const lastMessageResponse = await SendMsgApiCall(input);
      console.log({ lastMessageResponse });
      // in  case  the  llm gives an erro
      if (lastMessageResponse?.error) {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now() + 1,
            sender: "bot",
            content: "Sorry, I didn't get that. Can you please rephrase?",
          },
        ]);
        setInput("");
        return;
      }
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now() + 1,
            sender: "bot",
            content: lastMessageResponse,
          },
        ]);
      }, 1000);
    }
  };

  const handleEdit = (id: number) => {
    const messageToEdit = messages.find((msg) => msg.id === id);
    if (messageToEdit) {
      setInput(messageToEdit.content);
    }
  };

  const handleDelete = async (id: number) => {
    // Find the message to delete
    const messageToDelete = messages.find((msg) => msg.id === id);

    if (messageToDelete) {
      // Update the message content to "Deleted message"
      messageToDelete.content = "Deleted message";

      // Update the messages array with the modified message
      setMessages(
        messages.map((msg) =>
          msg.id === id ? { ...msg, content: "Deleted message" } : msg,
        ),
      );
    }
  };

  return (
    <div className="fixed bottom-4 right-4">
      {(isOpen || isAnimating) && (
        <Card
          className={`mb-12 w-[28rem] h-[50rem] flex flex-col shadow-xl transition-all duration-300 ease-in-out ${
            isAnimating ? "scale-95 opacity-0" : "scale-100 opacity-100"
          }`}
        >
          <CardHeader>
            <Header setIsOpen={setIsOpen} />
          </CardHeader>
          <CardContent className="flex-grow overflow-hidden p-4">
            <ScrollArea ref={scrollRef} className="h-full pr-4">
              {messages.map((message) => (
                <Message
                  key={message.id}
                  message={message}
                  handleEdit={handleEdit}
                  handleDelete={handleDelete}
                />
              ))}
            </ScrollArea>
          </CardContent>
          <CardFooter className="p-4 flex flex-col space-y-3 border-t pt-3">
            <Footer input={input} setInput={setInput} handleSend={handleSend} />
          </CardFooter>
        </Card>
      )}

      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="rounded-full border-black p-4 bg-black text-white hover:bg-gray-600 transition-colors"
        >
          <MessageSquare className="font-bold" />
        </button>
      )}
    </div>
  );
}
