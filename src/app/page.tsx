import { Navbar, Hero, Features, HowItWorks, Footer } from "@/components/landing";

export default function Home() {
  return (
    <main className="min-h-screen bg-dot-pattern">
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <Footer />
    </main>
  );
}
