import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage/LandingPage";
import NavBar from "./components/NavigationBar/NavBar";
import AuthenticationForm from "./pages/Authentication/Authentication";
import AllPackages from "./pages/Packages/AllPackages";
import Cart from "./pages/Cart/Cart";
import CreatePackage from "./pages/Packages/CreatePackage";
import ModifyPackage from "./pages/Packages/ModifyPackage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<NavBar />}>
        <Route index element={<LandingPage />} />
        <Route path="/auth" element={<AuthenticationForm />} />
        <Route path="/all-packages" element={<AllPackages />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/create-package" element={<CreatePackage />} />
        <Route path="/modify-package" element={<ModifyPackage />} />
      </Route>
    </Routes>
  );
};

export default App;
