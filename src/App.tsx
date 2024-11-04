import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage/LandingPage";
import NavBar from "./components/NavigationBar/NavBar";
import AuthenticationForm from "./pages/Authentication/Authentication";
import AllPackages from "./pages/Packages/AllPackages";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<NavBar />}>
        <Route index element={<LandingPage />} />
        <Route path="/auth" element={<AuthenticationForm />} />
        <Route path="/all-packages" element={<AllPackages />} />
      </Route>
    </Routes>
  );
};

export default App;
