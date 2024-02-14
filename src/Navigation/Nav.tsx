"use client";
import { blastSepolia } from "viem/chains";
import { PrivyProvider } from "@privy-io/react-auth";
import Content from "./Content";
// This method will be passed to the PrivyProvider as a callback
// that runs after successful login.
require('dotenv').config();
const handleLogin = (user: any) => {
  console.log(`User ${user.id} logged in!`);
};

function MyApp() {
  return (
    <>
      <PrivyProvider
        appId={`${process.env.NEXT_PUBLIC_PRIVY_APP_ID}`}
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
        <Content />
      </PrivyProvider>
    </>
  );
}

export default MyApp;
