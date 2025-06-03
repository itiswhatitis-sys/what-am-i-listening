'use client';
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { FaGithub } from "react-icons/fa";
export default function Hero (){

    return(
        
        <section className="pt-32 max-w-3xl mx-auto ">
            <div className="flex flex-col items-center justify-center">
                <div className="text-5xl font-semibold text-zinc-100 tracking-tighter">
                    <div>Heyy I'm <span className="text-green-500"> Murali</span></div>
                </div>
                    
                  <div className=" flex flex-row text-4xl font-semibold text-zinc-100 mt-4 tracking-tighter "> and I love  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: [0, 1, 0], y: [10, 0, -10] }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: 'easeIn',
                    }}
                    className="ml-2.5 "
                    > WebDev, Music, Cricket !
                    </motion.div></div>
             <Button variant="outline" className="mt-6 mr-2 rounded-full">
                    <FaGithub size={26} />
                    <span className="font-medium">Github </span></Button>        
               </div>

        </section>
    
    );

}