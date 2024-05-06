
export const Footer = () => {
  return (
    <footer id="footer">
      <hr className="w-11/12 mx-auto" />

      <section className="container bg-white py-5 grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-x-12 gap-y-8">

      </section>

      <section className="container bg-white pb-14 text-center">
        <div className="float-left">
          © Westside Market NYC / All rights reserved
        </div>
        <div className="float-right">

          <a
            target="_blank"
            href=""
            className="text-primary transition-all border-primary hover:border-b-2"
          >
            Contact Us
          </a>
        </div>
      </section>
    </footer>
  );
};
