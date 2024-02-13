"use client";
import { blastSepolia } from "viem/chains";
import { PrivyProvider } from "@privy-io/react-auth";
import Content from "./Content";
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
