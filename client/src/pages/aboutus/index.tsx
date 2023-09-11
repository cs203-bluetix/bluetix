import Head from "next/head";
import Link from "next/link";
import LandingLayout from "layouts/LandingLayout";
import { Section } from "layouts/Section";

const TECHNOLOGY_STACK = [
  { label: "Frontend:", value: "ReactJS, TailwindCSS" },
  { label: "Backend:", value: "Java SpringBoot" },
  { label: "Database:", value: "MySQL Database" },
  { label: "Deployment:", value: "AWS" },
];

type AboutRowProps = {
  title: string;
  description: string;
  image: string;
  imageAlt?: string;
  reverse?: boolean;
};

const AboutRow = (props: AboutRowProps) => {
  return (
    <div
      className={`mt-20 flex flex-wrap items-center ${
        props.reverse && "flex-row-reverse"
      }`}
    >
      <div className="w-full text-center sm:w-1/2 sm:px-6">
        <h3 className="text-3xl font-semibold text-gray-900">{props.title}</h3>
        <div className="mt-6 text-xl leading-9">{props.description}</div>
      </div>

      <div className="w-full p-6 sm:w-1/2">
        <img src={`${props.image}`} alt={props.imageAlt} />
      </div>
    </div>
  );
};

export default function About() {
  return (
    <LandingLayout title="BlueTix - About Us">
      <Section>
        <div>
          <div className="w-full pt-12 text-center sm:px-6">
            <h2 className="text-4xl font-bold text-gray-900">About BlueTix</h2>
            <div className="mt-6 text-xl leading-9">
              Welcome to BlueTix, your ultimate destination for hassle-free
              event ticketing! BlueTix is more than just a ticketing
              platform; it's a cutting-edge solution designed to
              revolutionize your event experience.
            </div>
          </div>
        </div>
        <AboutRow
          title="A Bridge Between 2.0 and 3.0"
          description="Say goodbye to counterfeit tickets. BlueTix employs cutting-edge blockchain technology to authenticate and secure event tickets. Every ticket is unique, ensuring that you have a genuine pass to your desired event."
          image="/images/undraw_golden_gate_bridge_re_e8tc.svg"
        />

        <AboutRow
          title="Smart Queuing Algorithm"
          description="We believe in fairness. BlueTix employs a smart queuing algorithm that guarantees every ticket buyer an equal opportunity. No more long queues or unfair ticket distribution."
          image="/images/undraw_wait_in_line_o2aq.svg"
          reverse
        />

        <AboutRow
          title="Reseller Prevention"
          description="We've put a stop to ticket reselling by imposing a cap. This means no more exorbitant ticket prices or sold-out events due to resellers. BlueTix ensures that tickets end up in the hands of genuine event-goers."
          image="/images/undraw_empty_cart_co35.svg"
        />

        <div className="mt-24 w-full text-center sm:px-6">
          <h2 className="text-4xl font-bold text-gray-900">Our Technology Stack</h2>
          <div className="mt-6 text-xl leading-9">
            <ul>
              {TECHNOLOGY_STACK.map((item, index) => (
                <li key={index}>
                  <span>{item.label}</span> {item.value}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>
    </LandingLayout>
  );
}
