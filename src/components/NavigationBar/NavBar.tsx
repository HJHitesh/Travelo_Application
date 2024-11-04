import NavigationBar from "./NavigationBar";
import { Outlet } from "react-router-dom";

const NavBar = () => {
  return (
    <>
      <NavigationBar />
      <Outlet />
    </>
  );
};

export default NavBar;
