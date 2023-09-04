import Head from "next/head";
import Link from "next/link";
import LandingLayout from "layouts/LandingLayout";
import { Section } from "layouts/Section";
import { AboutRow } from "pages/aboutus/aboutRow";

export default function About() {
    return (
        <>
            <LandingLayout title="BlueTix - Events">
                <main>
                    <Section title="About BlueTix" description="Welcome to BlueTix, your ultimate destination for hassle-free event ticketing! BlueTix is more than just a ticketing platform; it's a cutting-edge solution designed to revolutionize your event experience.">
                        <AboutRow
                            title="A Bridge Between 2.0 and 3.0"
                            description="Say goodbye to counterfeit tickets. BlueTix employs cutting-edge blockchain technology to authenticate and secure event tickets. Every ticket is unique, ensuring that you have a genuine pass to your desired event."
                            image="/images/undraw_golden_gate_bridge_re_e8tc.svg" />

                        <AboutRow
                            title="Smart Queuing Algorithm"
                            description="We believe in fairness. BlueTix employs a smart queuing algorithm that guarantees every ticket buyer an equal opportunity. No more long queues or unfair ticket distribution."
                            image="/images/undraw_wait_in_line_o2aq.svg"
                            reverse />

                        <AboutRow
                            title="Reseller Prevention"
                            description="We've put a stop to ticket reselling by imposing a cap. This means no more exorbitant ticket prices or sold-out events due to resellers. BlueTix ensures that tickets end up in the hands of genuine event-goers."
                            image="/images/undraw_empty_cart_co35.svg" />
                    </Section>
                    <Section
                        title="Our Technology Stack"
                        description={
                            <ul>
                                <li>
                                    <span>Frontend:</span> We use ReactJS to create a dynamic and user-friendly interface.
                                </li>
                                <li>
                                    <span>Styling:</span> TailWindCSS gives our website a sleek and responsive design.
                                </li>
                                <li>
                                    <span>Backend:</span> Java SpringBoot ensures speed and reliability.
                                </li>
                                <li>
                                    <span>Database:</span> MySQL Database securely stores your data.
                                </li>
                                <li>
                                    <span>Deployment:</span> BlueTix is hosted on AWS, ensuring high availability and scalability.
                                </li>
                            </ul>
                        }
                    />

                </main>
            </LandingLayout>
        </>
    );
}
