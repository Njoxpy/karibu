// import pages
import Contact from "../pages/Contact";
import Services from "./Services";
import About from "./AboutUs";
import { Divider } from "../components/Divider";
import Testimonials from "./Testimonials";
import HelloSection from "./SlideShow";

const Home = () => {
  return (
    <>
      <HelloSection />
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
