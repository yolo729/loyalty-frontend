import cubeLeg from "../assets/mark.jpg";
import '../App.css'


export const Giftcard = () => {
  return (
    <section className="container bg-white">
      <div className="grid lg:grid-cols-[1fr,1fr] gap-8 place-items-center pb-2 pt-0 p-32">
        <img
          src={cubeLeg}
          className="w-[300px] md:w-[500px] lg:w-[600px] object-contain"
          alt="About services"
        />

        <div>
          <h2 className="text-2xl md:text-1xl font-bold">
            Purchase your gift card today!
          </h2>

          <p className="text-muted-foreground text-1xl mt-4 mb-8">
            Celebrate, thank or commemorate with one of our gift<br /> cards. Valid at any of our seven locations in NYC, gift <br /> cards are mailed to you or your recipient.
          </p>
          <button className="p-2 w-40 rounded bg-[#e60a0a]">Purchase Now</button>
        </div>
      </div>
    </section>
  );
};
