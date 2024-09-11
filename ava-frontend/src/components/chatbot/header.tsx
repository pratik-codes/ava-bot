import { Maximize2, PanelLeftDashed, X } from "lucide-react";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface HeaderProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header: React.FC<HeaderProps> = ({ setIsOpen }) => {
  return (
    <>
      <div className="flex flex-col justify-center items-center space-y-2 mt-6">
        <Avatar className="bg-indigo-400 border-none">
          <AvatarImage src="https://www.artisan.co/_next/image?url=%2Fassets%2Fhome%2Fava%2Fava.webp&w=384&q=100" />
          <AvatarFallback>AVA</AvatarFallback>
        </Avatar>
        <div className="text-center space-y-1">
          <h4 className="text-sm font-semibold">Hey👋, {"I'm Ava"}</h4>
          <p className="text-xs text-muted-foreground">
            Ask me anything or pick a place to start
          </p>
        </div>
      </div>
      <div className="absolute top-0 left-0 flex m-1 text-gray-500">
        <Button
          className="p-0"
          variant="ghost"
          size="icon"
          onClick={() => setIsOpen(false)}
        >
          <Maximize2 className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
          <PanelLeftDashed className="h-4 w-4" />
        </Button>
      </div>
      <div className="absolute right-0 top-0 m-1 text-gray-500">
        <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
          <X className="h-4 w-4" />
        </Button>
      </div>
    </>
  );
};

export default Header;
