"use client";
import Nav from "./components/nav";
import Hero from "./components/heroOptions";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="flex grow flex-col">
      <Nav />
      <main className="flex-1">
        <Hero />
      </main>
      <Footer />
    </div>
  );
}
