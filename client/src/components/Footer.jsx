// import Logo from '../assets/images/logo.jpg';

const Footer = () => {
  return (
    <>
      <footer className="bg-primary text-light">
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div className="flex justify-center text-light sm:justify-start">
              <a
                href="https://godbless-nyagawa.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                Savarrah Made By - NjoxPy
              </a>
            </div>

            <p className="mt-4 text-center text-sm text-light lg:mt-0 lg:text-right">
              Savarrah &copy; 2024. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
