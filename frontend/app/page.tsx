import Image from "next/image";
import Hero from "@/components/Hero";
import Nav from "@/components/Nav";
export default function Home() {
  return (
  <section className="bg-slate-900">
    <Nav/>
    <Hero/>
  </section>
  );
}
