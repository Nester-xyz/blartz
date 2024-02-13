import Nav from "../../Navigation/Nav";
import Create from "./Create";
<<<<<<< HEAD

=======
import { blastSepolia } from "viem/chains";

// This method will be passed to the PrivyProvider as a callback
// that runs after successful login.

const handleLogin = (user: any) => {
  console.log(`User ${user.id} logged in!`);
};
>>>>>>> yogesh
function MyApp() {
  return (
    <>
      <Nav />
      <Create />
    </>
  );
}

export default MyApp;
