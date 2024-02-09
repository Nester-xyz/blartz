"use client";
import { PrivyProvider } from "@privy-io/react-auth";
import Nav from "../Nav";
import Create from "./Create";
import { blastSepolia } from "viem/chains";

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
        <Create />
      </PrivyProvider>
    </>
  );
}

export default MyApp;
