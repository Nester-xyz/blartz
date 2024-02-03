import Image from "next/image";
import Hero from "../app/Hero/Hero";
import Showcase1 from "../app/Showcase1/Showcase1";
import Showcase2 from "../app/Showcase2/Showcase2";
import Teammate from "../app/Teammate/Teammate";

export default function Home() {
  return (
    <>
      <Hero />
      <Showcase1 />
      <Showcase2 />
      <Teammate />
    </>
  );
}
