"use client";
import Nav from "../Nav";
import Mint from "./Mint";
import { blastSepolia } from "viem/chains";
import { PrivyProvider } from "@privy-io/react-auth";

// This method will be passed to the PrivyProvider as a callback
// that runs after successful login.
const handleLogin = (user: any) => {
  console.log(`User ${user.id} logged in!`);
};

function MyApp() {
  return (
    <>
      <PrivyProvider
        appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID!}
        onSuccess={handleLogin}
        config={{
          loginMethods: ["email", "wallet"],
          appearance: {
            theme: "light",
            accentColor: "#676FFF",
          },
          defaultChain: blastSepolia,
          supportedChains: [blastSepolia],
        }}
      >
        <Nav />
        <Mint />
      </PrivyProvider>
    </>
  );
}

export default MyApp;
