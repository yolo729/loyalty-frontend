// import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import image1 from "../assets/image1.jpg";
import image2 from "../assets/image2.jpg";
import image3 from "../assets/image3.jpg";
import image4 from "../assets/image4.jpg";
import image5 from "../assets/image5.jpg";
import image6 from "../assets/image6.jpg";
import image7 from "../assets/image7.jpg";
import image8 from "../assets/image8.jpg";
import '../App.css'

interface FeatureProps {
  icon: string;
  title: string;
  description: string;
  footText: string;
}

const features: FeatureProps[] = [
  {
    icon: image1,
    title: "2840 Broadway",
    description:
      "(corner of 110th St)",
    footText:
      "View Store Details",
  },
  {
    icon: image2,
    title: "2589 Broadway",
    description:
      "(between 97th & 98th St)",
    footText:
      "View Store Details",
  },
  {
    icon: image3,
    title: "84 Third Avenue",
    description:
      "(corner Of 12th St)",
    footText:
      "View Store Details",
  },
  {
    icon: image4,
    title: "180 Third Avenue",
    description:
      "(between 16th & 17th St)",
    footText:
      "View Store Details",
  },
  {
    icon: image5,
    title: "77 Seventh Avenue",
    description:
      "(between 14th & 15th St)",
    footText:
      "View Store Details",
  },
  {
    icon: image6,
    title: "1407 Lexington Avenue",
    description:
      "(corner of 92nd St)",
    footText:
      "View Store Details",
  },
  {
    icon: image7,
    title: "170 West 23rd Street",
    description:
      "(between 6th & 7th Ave)",
    footText:
      "View Store Details",
  },
  {
    icon: image8,
    title: "“Our Sister Store” Maywood’s Marketplace",
    description:
      "78 West Pleasant Avenue Maywood, NJ 07607",
    footText:
      "Website",
  },
];

export const Location = () => {
  return (
    <section
      id="howItWorks"
      className="container bg-white text-center"
    >
      <h2 className="text-2xl md:text-3xl font-bold ">
        Location
      </h2>
      <br />
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pt-0 p-36"
      >
        {features.map(({ icon, title, description, footText }: FeatureProps) => (
          <>
            <div>
              <div>
                <img
                  src={icon}
                  alt="About feature"
                  className="w-[200px] lg:w-[300px] mx-auto"
                />
                <div>
                  <p className="p-4">{title}</p>
                  <i className="p-4">{description}</i>
                  <p className="p-4" style={{color:'red'}}>{footText}</p>
                </div>
              </div>
            </div>
          </>
        ))}
      </div>
    </section>
  );
};
