import Header from "./components/Header";
import Hero from "./components/Hero";
import Music from "./components/Music";

export default function Home() {
  return (
  <>
    <Header />
    <div className="dotted-bg max-h-screen">
    <Hero />
    <Music />
    </div>
   </>
  );
}
