import image3 from "../assets/wm-home-grocery-all.jpg";
import image2 from "../assets/wm-home-grocery-110th.jpg";
import image1 from "../assets/wm-home-catering-lunch.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUtensils,
  faShoppingCart,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import "../App.css";

interface FeatureProps {
  description: string;
  image: string;
  icon: IconDefinition;
}

const features: FeatureProps[] = [
  {
    description: "Order Catering & Lunch",
    image: image1,
    icon: faUtensils,
  },
  {
    description: "Order Groceries (110th Street Only)",
    image: image2,
    icon: faShoppingCart,
  },
  {
    description: "Order Groceries (All Other Locations)",
    image: image3,
    icon: faShoppingCart,
  },
];

export const Ordering = () => {
  return (
    <section id="features" className="container bg-white sm:py-2">
      <h2 className="m-[2%] text-3xl lg:text-4xl font-bold md:text-center">
        Online Ordering
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 pt-0 pb-16 p-36 text-center">
        {features.map(({ description, image, icon }: FeatureProps, i) => (
          <div key={i}>
            <div>
              <img
                key={image.charAt(image.length - 1)}
                src={image}
                alt={description}
                className="w-[200px] lg:w-[367px] mx-auto"
              />
              <div className="lg:h-[42px] p-2 bg-[#e60a0a]">
                <FontAwesomeIcon
                  className="ml-2 text-white"
                  icon={icon}
                  size="1x"
                />
                <span className="ml-2">{description}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
