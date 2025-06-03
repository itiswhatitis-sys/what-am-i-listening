import Image from "next/image";
import Header from "./components/Header";
import Hero from "./components/Hero";

export default function Home() {
  return (
  <>
    <Header />
    <div className="dotted-bg min-h-screen">
    <Hero />
    </div>
   </>
  );
}
