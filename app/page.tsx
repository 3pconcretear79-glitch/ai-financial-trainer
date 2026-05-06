import Hero from "@/components/Hero";
import Features from "@/components/Features";
import ProUpgrade from "@/components/ProUpgrade";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#05051a]">
      <Hero />
      <Features />
      <ProUpgrade />
      <Footer />
    </main>
  );
}
