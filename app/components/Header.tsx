import { FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Header() {
  return (
    <section className="bg-[#0d0d12] w-full pt-4 z-20 top-0 left-0">
      <div className="max-w-7xl mx-auto px-4 mt-2 sm:mt-0">
        <div className="flex flex-wrap items-center justify-between gap-4 ">
          {/* Logo & Links (Always Visible) */}
          <div className="flex items-center gap-6">
            <div className="text-xl font-bold text-gray-200 tracking-tighter">Murali</div>
            <div className="flex items-center gap-4 text-md font-normal tracking-tighter text-white">
              <div>Home</div>
              <div>About</div>
            </div>
          </div>

          {/* Desktop Only Actions */}
          <div className="hidden md:flex items-center gap-2">
             <a
            href="https://github.com/itiswhatitis-sys"
            target="_blank"
            rel="noopener noreferrer"
            >
            <Button variant="outline" className="flex items-center gap-1">
              <FaGithub size={20} />
              <span className="text-sm tracking-tight text-gray-300/90">Github</span>
            </Button></a>
            <Link href="/">
            <Button variant="outline" className="flex items-center gap-1">
              <FaXTwitter size={20} />
              <span className="text-sm tracking-tight text-gray-300/90">Twitter</span>
            </Button></Link>
            <Input className="w-auto" placeholder="Search" />
            <a
            href="https://github.com/sponsors/itiswhatitis-sys"
            target="_blank"
            rel="noopener noreferrer"
            >
            <Button variant="outline">
              <span className="font-medium tracking-tight text-gray-300/90">
                <span className="text-[18px]">🫶</span> Sponsor
              </span>
            </Button></a>
          </div>
        </div>
      </div>
    </section>
  );
}
