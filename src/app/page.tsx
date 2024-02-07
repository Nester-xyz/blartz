"use client";
import { PrivyProvider } from "@privy-io/react-auth";
import Nav from "./Nav";
import Hero from "./Hero/Hero";

// This method will be passed to the PrivyProvider as a callback
// that runs after successful login.
const handleLogin = (user: any) => {
  console.log(`User ${user.id} logged in!`);
};

function MyApp() {
  return (
    <>
      <PrivyProvider
        appId="clsbdu38i06e9mr83ufba7gsn"
        onSuccess={handleLogin}
        config={{
          loginMethods: ["email", "wallet"],
          appearance: {
            theme: "light",
            accentColor: "#676FFF",
          },
        }}
      >
        <Nav />
        <Hero />
      </PrivyProvider>
    </>
  );
}

export default MyApp;
