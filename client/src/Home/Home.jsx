import React, { Suspense } from "react";
import Divider from "../components/Divider";
import HelloSection from "./SlideShow";
import Footer from "../components/Footer";

const About = React.lazy(() => import("./AboutUs"));
const Services = React.lazy(() => import("./Services"));
const Testimonials = React.lazy(() => import("./Testimonials"));
const Contact = React.lazy(() => import("../pages/Contact"));

const Home = () => {
  return (
    <>
      <HelloSection />
      <Divider />

      <Suspense fallback={<div>Loading About Section...</div>}>
        <About />
      </Suspense>
      <Divider />

      <Suspense fallback={<div>Loading Services...</div>}>
        <Services />
      </Suspense>
      <Divider />

      <Suspense fallback={<div>Loading Testimonials...</div>}>
        <Testimonials />
      </Suspense>
      <Divider />

      <Suspense fallback={<div>Loading Contact Form...</div>}>
        <Contact />
      </Suspense>

      <Footer />
    </>
  );
};

export default Home;
