import { ContactUs } from "./ContactUs/ContactUs";
import { Features } from "./Features/Features";
import { Footer } from "./Footer/Footer";
import HeroHeader from "./HeroHeader/HeroHeader";

const LandingPage = () => {
  return (
    <>
      <HeroHeader />
      <Features />
      <ContactUs />
      <Footer />
    </>
  );
};
export default LandingPage;
