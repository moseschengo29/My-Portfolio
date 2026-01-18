import Navbar from "@/src/components/ui/Navbar";
import Hero from "@/src/components/sections/Hero"; // From previous response
import TechStack from "@/src/components/sections/TechStack";
import Services from "@/src/components/sections/Services";
import Projects from "@/src/components/sections/Projects"; // From previous response
import Contact from "@/src/components/sections/Contact";
import WorkList from "../components/sections/WorkList";
import Footer from "../components/sections/Footer";
import Preloader from "../components/ui/PreLoader";
import CustomCursor from "../components/ui/CustomCursor";
import Process from "../components/sections/Process";
import StackedSection from "../components/layout/StackedSection";
import About from "../components/sections/About";
import SelectedWork from "../components/sections/SelectedWork";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Preloader />
      <CustomCursor />
      
      <Navbar />

      <StackedSection id="home">
      <Hero />
      </StackedSection>
      <About />
      <TechStack />
      <SelectedWork />
      <Process />
      <WorkList />
      <Footer />
    </main>
  );
}