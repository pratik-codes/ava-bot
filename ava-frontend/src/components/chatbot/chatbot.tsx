import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { X, Send, MoreVertical, Settings, MessageSquare } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "bot",
      content:
        "Hi Jane,\nAmazing how Mosey is simplifying state compliance for businesses across the board!",
    },
    { id: 2, sender: "user", content: "Hi, thanks for connecting!" },
    {
      id: 3,
      sender: "bot",
      content:
        "Hi Jane,\nAmazing how Mosey is simplifying state compliance for businesses across the board!",
    },
  ]);
  const [input, setInput] = useState("");
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleSend = () => {
    if (input.trim()) {
      if (editingId) {
        setMessages(
          messages.map((msg) =>
            msg.id === editingId ? { ...msg, content: input } : msg,
          ),
        );
        setEditingId(null);
      } else {
        setMessages([
          ...messages,
          { id: Date.now(), sender: "user", content: input },
        ]);
        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            {
              id: Date.now() + 1,
              sender: "bot",
              content:
                "Thank you for your message. How else can I assist you today?",
            },
          ]);
        }, 1000);
      }
      setInput("");
    }
  };

  const handleEdit = (id) => {
    const messageToEdit = messages.find((msg) => msg.id === id);
    if (messageToEdit) {
      setInput(messageToEdit.content);
      setEditingId(id);
    }
  };

  const handleDelete = (id) => {
    setMessages(messages.filter((msg) => msg.id !== id));
  };

  return (
    <div className="fixed bottom-4 right-4">
      {(isOpen || isAnimating) && (
        <Card
          className={`mb-12 w-96 h-[40rem] flex flex-col shadow-xl transition-all duration-300 ease-in-out ${
            isAnimating ? "scale-95 opacity-0" : "scale-100 opacity-100"
          }`}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 border-b">
            <div className="flex items-center space-x-2">
              <Avatar>
                <AvatarImage src="/placeholder.svg?height=40&width=40" />
                <AvatarFallback>AVA</AvatarFallback>
              </Avatar>
              <div>
                <h4 className="text-sm font-semibold">Hey👋, I'm Ava</h4>
                <p className="text-xs text-muted-foreground">
                  Ask me anything or pick a place to start
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="flex-grow overflow-hidden p-4">
            <ScrollArea className="h-full pr-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"} mb-4`}
                >
                  {message.sender === "bot" && (
                    <Avatar className="w-8 h-8 mr-2">
                      <AvatarImage src="/placeholder.svg?height=32&width=32" />
                      <AvatarFallback>AVA</AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={`rounded-2xl p-3 max-w-[80%] ${message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted"}`}
                  >
                    {message.content.split("\n").map((line, i) => (
                      <p key={i} className="text-sm">
                        {line}
                      </p>
                    ))}
                  </div>
                  {message.sender === "user" && (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 ml-2"
                        >
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => handleEdit(message.id)}
                        >
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDelete(message.id)}
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </div>
              ))}
            </ScrollArea>
          </CardContent>
          <CardFooter className="flex flex-col space-y-3 border-t pt-3">
            <div className="flex flex-wrap gap-2 w-full">
              <Button
                variant="outline"
                className="flex-grow bg-primary/10 text-primary border-primary/20 rounded-full text-xs py-1 h-auto hover:bg-primary/20 transition-colors"
              >
                Create Report this month
              </Button>
              <Button
                variant="outline"
                className="flex-grow bg-primary/10 text-primary border-primary/20 rounded-full text-xs py-1 h-auto hover:bg-primary/20 transition-colors"
              >
                Call Lead
              </Button>
            </div>
            <div className="flex items-center space-x-2 bg-muted rounded-full p-1">
              <Input
                placeholder="Your question"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 flex-grow"
              />
              <Button
                size="icon"
                onClick={handleSend}
                className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center justify-between w-full text-xs text-muted-foreground">
              <Select defaultValue="onboarding">
                <SelectTrigger className="w-[180px] border-0 p-0 h-auto text-xs font-normal">
                  <SelectValue placeholder="Select context" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="onboarding">
                    Context: Onboarding
                  </SelectItem>
                  <SelectItem value="support">Context: Support</SelectItem>
                  <SelectItem value="sales">Context: Sales</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
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
