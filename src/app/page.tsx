import Hero from "./Hero/Hero";
import Link from "next/link";

function MyApp() {
  return (
    <>
      <div className="text-white flex justify-between mt-3 w-10/12 mx-auto">
        <Link href={"/"}>
          <h1 className="text-4xl select-none">Blartz ⚡</h1>
        </Link>
      </div>
      <Hero />
    </>
  );
}

export default MyApp;
