import Link from "next/link";
import { Github } from "lucide-react";
import Image from "next/image";

export default function NavBar() {
  return (
    <div className="absolute top-0 left-0 right-0 flex justify-center y-4 z-50">
      <footer className="w-full py-4 px-4 text-center text-sm text-gray-700 font-mono font-bold">
        <p className="inline-flex items-center justify-center flex-wrap font-medium">
          <span className="flex items-center">
            Made with love by{" "}
            <Link
              href="https://tiwaripratik.com/"
              className="text-gray-900 hover:underline flex items-center ml-1"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="https://pbs.twimg.com/profile_images/1832540190369353728/k5_ijX8Q_400x400.jpg"
                alt="Pratik's avatar"
                width={20}
                height={20}
                className="rounded-full mx-1"
              />
              Pratik
            </Link>
          </span>
          <span className="mx-2">·</span>
          <span>Hosted on Vercel</span>
          <span className="mx-2">·</span>
          <span className="flex items-center">
            The source code is available on{" "}
            <Link
              href="https://github.com/pratik-codes/ava-bot"
              className="text-gray-900 hover:underline flex items-center ml-1"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="mx-1 border rounded-full p-1 border-black" />
              GitHub
            </Link>
          </span>
        </p>
      </footer>
    </div>
  );
}
