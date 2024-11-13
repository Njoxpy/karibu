// import pages
import Hello from "./Hello";
import Contact from "../pages/Contact";
import Services from "./Services";
import About from "./AboutUs";
import { Divider } from "../components/Divider";
import Testimonials from "./Testimonials";

const Home = () => {
  return (
    <>
      <Hello />
      <Divider />
      <About />
      <Divider />
      <Services />
      <Divider />
      <Testimonials />
      <Divider />
      <Contact />
    </>
  );
};

export default Home;
