// import pages
import Footer from "../components/Footer";
import Features from "./Features";
import Hello from "./Hello";
import HowWorks from "./HowWorks";
import Contact from "../pages/Contact";
import Services from "./Services";
import About from "./AboutUs";
import { Divider } from "../components/Divider";

const Home = () => {
  return (
    <>
      <Hello />
      <Features />
      <Divider />
      <Services />
      <About />
      <Contact />
    </>
  );
};

export default Home;
