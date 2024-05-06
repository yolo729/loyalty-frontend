import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import image1 from "../assets/WM_Apps_1500x600_Home.jpg";
import image2 from "../assets/WM_Breads_1500x600_Home.jpg";
import image3 from "../assets/WM_Butcher_1500x600_Home.jpg";
import image4 from "../assets/WM_CAtering_1500x600_Home.jpg";
import image5 from "../assets/WM_Char_1500x600_Home.jpg";
import image6 from "../assets/WM_Cheese_1500x600_Home.jpg";
import image7 from "../assets/WM_Deli_1500x600_Home.jpg";
import image8 from "../assets/WM_Desserts_1500x600_Home.jpg";
import image9 from "../assets/WM_Grocery_1500x600_Home.jpg";
import image10 from "../assets/WM_OrgFruit_1500x600_Home.jpg";
import image11 from "../assets/WM_PrepFoods_1500x600_Home.jpg";
import image12 from "../assets/WM_Salads_1500x600_Home.jpg";
import image13 from "../assets/WM_Sand_1500x600_Home.jpg";
import image14 from "../assets/WM_Seafood_1500x600_Home.jpg";
import image15 from "../assets/WM_Sushi_1500x600_Home.jpg";


interface CarouselProps {
  title: string;
  image: string;
}

const Carousel: CarouselProps[] = [
  {
    title: "APPETIZERS",
    image: image1,
  },
  {
    title: "BREADS & BAGELS",
    image: image2,
  },
  {
    title: "BUTCHER SHOP",
    image: image3,
  },
  {
    title: "CATERING",
    image: image4,
  },
  {
    title: "CHARCUTERIE",
    image: image5,
  },
  {
    title: "ARTISANAL CHEESE",
    image: image6,
  },
  {
    title: "DELI PLATTERS",
    image: image7,
  },
  {
    title: "DESSERTS",
    image: image8,
  },
  {
    title: "GROCERY",
    image: image9,
  },
  {
    title: "ORGANIC FRUIT",
    image: image10,
  },
  {
    title: "PREPARED FOODS",
    image: image11,
  },
  {
    title: "SALAD",
    image: image12,
  },
  {
    title: "SANDWICH",
    image: image13,
  },
  {
    title: "SEAFOOD",
    image: image14,
  },
  {
    title: "SUSHI",
    image: image15,
  },
];

export const Gallery = () => {
  const settings = {
    className: "gallery",
    dots: true,
    arrows: false,
    infinite: true,
    fade: true,
    autoplay: true,
    speed: 700,
    adaptiveHeight: true
  };
  
  return (
    <>
      <section
        id="about"
        className="container  bg-white px-12 sm:py-12"
      >
        <div>
          <Slider {...settings}>
            {Carousel.map(({ title, image }: CarouselProps) => (
              <div>
                <img
                  src={image}
                  alt={title}
                />
              </div>
            ))}
          </Slider>
        </div>

      </section>
    </>
  );
};
