import { SendIcon, Settings2Icon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface FooterProps {
  input: string;
  setInput: (value: string) => void;
  handleSend: () => void;
}

const Footer: React.FC<FooterProps> = ({ input, setInput, handleSend }) => {
  return (
    <div className="w-full my-2">
      <div className="flex flex-col space-y-2">
        <div className="space-x-1 flex border-none items-center">
          <div>
            <Avatar className="w-8 h-8 mr-2">
              <AvatarImage src="https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671122.jpg?w=740&t=st=1725830395~exp=1725830995~hmac=0a664c00fa14b7c31cc3abe901f8f40ea2d9b3c913b00cc4c8595a06d1898c68" />
              <AvatarFallback>AVA</AvatarFallback>
            </Avatar>
          </div>
          <div className="flex-1">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleSend();
                }
              }}
              className="text-sm w-full rounded-lg focus:outline-none focus:border-gray-300 p-0"
              placeholder="Your question"
            />
          </div>
        </div>
        <div>
          <div className="flex justify-between items-center mt-1 w-full">
            <div className="flex items-center space-x-2">
              <div className="text-sm">Context</div>
              <Select defaultValue="onboarding">
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Select context" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="onboarding">Onboarding</SelectItem>
                  <SelectItem value="support">Support</SelectItem>
                  <SelectItem value="feedback">Feedback</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="text-gray-500">
              <Button variant="ghost" size="icon">
                <Settings2Icon className="h-4 w-4" />
              </Button>
              <Button
                onClick={handleSend}
                disabled={input.length == 0}
                variant="ghost"
                size="icon"
              >
                <SendIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
