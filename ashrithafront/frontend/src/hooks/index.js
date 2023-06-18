import { UserProvider } from "./auth";
import { ToursProvider } from "./tours";

const AppProvider = ({ children }) => (
  <>
    <UserProvider>{children}</UserProvider>
  </>
);

export default AppProvider;
