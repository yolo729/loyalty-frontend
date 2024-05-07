import loveLogo from "../assets/wsm-love-logo.jpg";
import '../App.css'



export const Lovelg = () => {
  return (
    <section className="container bg-white py-14 sm:py-10 pb-2 pt-0 p-[8%]">
      <div className="grid lg:grid-cols-[0.4fr,1fr] bg-black gap-8 place-items-center">
        <img
          src={loveLogo}
          className="w-[200px] lg:w-[300px] mx-auto"
          alt="About services"
        />

        <div>
          <p className="text-muted-foreground text-xl text-white mt-4 mb-8 ">
            Since 1977, we have been deeply engrained in the fabric of Manhattan. Each of our locations enjoys a remarkably loyal following, which is no surprise; it’s a direct result of the fact that the Zoitas family takes great pride in every aspect of their business. Our mission is simple: to become your favorite neighborhood food market and caterer of choice by offering the highest quality foods and hard-to-find products supported by friendly, personalized, efficient service.
          </p>
        </div>
      </div>
    </section>
  );
};
