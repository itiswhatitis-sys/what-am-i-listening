'use client';
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { FaGithub } from "react-icons/fa";

export default function Hero() {
  return (
    <section className="pt-32 max-w-3xl mx-auto px-4">
      <div className="flex flex-col items-center justify-center text-center">
        <div className="text-zinc-100 tracking-tighter">
          {/* Line 1 */}
          <div className="text-3xl sm:text-5xl font-semibold">
            Heyy I'm <span className="text-green-500">Murali</span>
          </div>

          {/* Line 2 */}
          <div className="text-3xl sm:text-4xl font-semibold mt-1 sm:mt-6">
            <div className="block sm:inline">and I love</div>

            {/* Line 3: Motion */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: [0, 1, 0], y: [10, 0, -10] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeIn",
              }}
              className="ml-1 sm:ml-2 inline-block"
            >
              WebDev, Music, Cricket!
            </motion.div>
          </div>
        </div>

        {/* Button */}
        <Button variant="outline" className="mt-6 mr-2 rounded-full">
          <FaGithub size={26} />
          <span className="font-medium">Github</span>
        </Button>
      </div>
    </section>
  );
}
