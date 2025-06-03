import Image from "next/image";
import { FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";
export default function Header (){
    return (
     
     <section className="bg-[#0d0d12] w-full py-4 z-20 top-0 left-0 ">
         <div className="max-w-7xl mx-auto">
          <div className=" flex flex-row p-1">
                    {/* <Image src={"/logoipsum-374.png"} width={40} alt="logo" height={20}>
                    </Image> */}
                    <div className="text-xl mt-1 px-2 font-bold text-gray-200">
                    Murali
                    </div>
            <div className="ml-8  mt-2 text-md font-medium">Home</div>
            <div className="ml-4  mt-2 text-md font-medium">About</div>
                <div className="flex felx-row ml-96 ">
                    <Button variant="outline" className="mt-2 mr-2">
                    <FaGithub size={26} />
                    <span className="font-medium">Github </span></Button>
                    <Button variant="outline" className="mt-2 mr-4 ">
                    <FaXTwitter size={26} />
                    <span className="font-medium" >Twitter</span></Button>
                    <Input className="mt-2 mr-2 p-4 " placeholder="Search"/>
                     <Button variant="outline" className="mt-2">
                        <span className="font-medium "> <span className="text-[18px]">🫶</span> Sponsor</span>
                    </Button>
                </div>

          </div>        
        </div>

     </section>
    );
}