import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { MoreVertical } from "lucide-react";

interface MessageProps {
  message: {
    id: number;
    sender: string;
    content: string;
    prompts?: Array<string>;
  };
  handlePrompts: (prompts: string) => void;
  handleEdit: (id: number) => void;
  handleDelete: (id: number) => void;
}

const Message: React.FC<MessageProps> = ({
  message,
  handleEdit,
  handleDelete,
  handlePrompts,
}) => {
  return (
    <div className="mb-4">
      <div
        key={message.id}
        className={`flex mb-2 ${message.sender === "user" ? "justify-end" : "justify-start"}`}
      >
        {message.sender === "bot" && (
          <Avatar className="w-8 h-8 mr-2">
            <AvatarImage src="https://www.artisan.co/_next/image?url=%2Fassets%2Fhome%2Fava%2Fava.webp&w=384&q=100" />
            <AvatarFallback>AVA</AvatarFallback>
          </Avatar>
        )}

        <div
          className={`space-y-2 flex ${message.sender === "user" ? "justify-end" : "justify-start flex-col"}`}
        >
          {message.sender === "user" &&
            message.content !== "Deleted message" && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8 ml-2">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => handleEdit(message.id)}>
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleDelete(message.id)}>
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          <div
            className={`rounded-3xl p-3 max-w-[80%] ${message.sender === "user" ? (message.content === "Deleted message" ? "bg-indigo-300 text-primary-foreground  rounded-tr-none" : "bg-indigo-600 text-primary-foreground  rounded-tr-none mr-3") : "bg-muted mr-4"}`}
          >
            {message?.content?.split("\n").map((line, i) => (
              <p key={i} className="text-sm">
                {line}
              </p>
            ))}
          </div>
          <div className="space-x-1">
            {message?.prompts?.map((promopt) => (
              <Button
                onClick={() => handlePrompts(promopt)}
                key={promopt}
                className="text-xs rounded-3xl bg-white border border-indigo-500 text-indigo-500 font-medium hover:bg-indigo-500 hover:text-white"
              >
                {promopt}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;
