import React from "react";
import LandingLayout from "layouts/LandingLayout";
import { Section } from "layouts/Section";
import { Accordion } from '@mantine/core';

export default function faq() {
  const groceries = [
    {
      // emoji: '',
      value: 'What Payment Methods Are Accepted?',
      description:
        'We accept a variety of payment methods to make it convenient for you. These typically include major credit cards like Visa, MasterCard, American Express, as well as payment services like PayPal and sometimes Apple Pay or Google Pay. Please check our website or app for the specific payment methods available for the event you are interested in.',
    },
    {
      // emoji: '🍌',
      value: 'How do I receive my tickets?',
      description:
        'Ticket delivery methods can vary depending on the event and your preferences. Common delivery options include electronic tickets (e-tickets) that you can download or receive via email, mobile tickets that can be stored on your smartphone, or physical tickets that are shipped to your address. You can choose your preferred delivery method during the checkout process.',
    },
    {
      // emoji: '🥦',
      value: 'Can I Get a Refund or Exchange Tickets?',
      description:
        "Our refund and exchange policies may vary depending on the event and the organizer's terms. In general, tickets are non-refundable, but some events may offer refund or exchange options for specific circumstances. Please refer to the event's terms and conditions or contact our customer support for more information on the refund and exchange policy for your event.",
    },

    {
      // emoji: '🥦',
      value: 'What Happens If an Event Is Canceled or Rescheduled?',
      description:
        'In the unfortunate event that an event is canceled or rescheduled, we will work to provide you with the best possible options. This may include a refund for canceled events or automatically transferring your tickets to the new date for rescheduled events. We will communicate directly with ticket holders to ensure you are informed and taken care of.',
    },

    {
      // emoji: '🥦',
      value: 'Can I Transfer My Tickets to Someone Else?',
      description:
        "Yes, you can often transfer your tickets to someone else if you're unable to attend the event. This transfer process can typically be done through our website or app. Be sure to check the event's specific transfer policy for details and any associated fees.",
    },

    {
      // emoji: '🥦',
      value: 'Is There a Waiting List for Sold-Out Events?',
      description:
        "We may offer waiting lists for certain sold-out events. If a waiting list is available, you can join it to be notified if tickets become available due to cancellations or additional inventory. Availability of waiting lists may vary by event, so please check the event's page for details.",
    },
  ];

  
  const items = groceries.map((item) => (
    <Accordion.Item key={item.value} value={item.value}>
      {/* <Accordion.Control icon={item.emoji}>{item.value}</Accordion.Control> */}
      <Accordion.Control>{item.value}</Accordion.Control>
      <Accordion.Panel className="text-sm">{item.description}</Accordion.Panel>
    </Accordion.Item>
  ));
  
    return (
      <>
        <LandingLayout withNavbar withFooter title="BlueTix - FAQ">
          <Section title="Frequently Asked Questions">
            <div className="p-[30px]">
            <Accordion defaultValue="Apples">
              {items}
            </Accordion>
            {/* <div className="h-full w-full">
            <div>
              { <h1  className="text-center text-5xl font-bold py-[50px]">Frequently Asked Questions</h1> 
              <div className="md: grid grid-cols-1 grid-cols-3 gap-10 pt-[30px]">
                <div className="border-1 h-[400px] w-[300px] rounded-lg border border-black bg-sky-100 p-[20px] shadow-lg">
                  <h2 className="font-bold ">
                    What Payment Methods Are Accepted?
                  </h2>
                  <p className="pt-[10px] ">BLA BLA BLA</p>
                </div>
                <div className="border-1 h-[400px] w-[300px] rounded-lg border border-black bg-sky-100 p-[20px] shadow-lg">
                  <h2 className="font-bold ">How do I receive my tickets?</h2>
                  <p className="pt-[10px] ">BLA BLA BLA</p>
                </div>
                <div className="border-1 h-[400px] w-[300px] rounded-lg border border-black bg-sky-100 p-[20px] shadow-lg">
                  <h2 className="font-bold ">
                    Can I Get a Refund or Exchange Tickets?
                  </h2>
                  <p className="pt-[10px] ">BLA BLA BLA</p>
                </div>
                <div className="border-1 h-[400px] w-[300px] rounded-lg border border-black bg-sky-100 p-[20px] shadow-lg">
                  <h2 className="font-bold ">
                    What Happens If an Event Is Canceled or Rescheduled?
                  </h2>
                  <p className="pt-[10px] ">BLA BLA BLA</p>
                </div>
                <div className="border-1 h-[400px] w-[300px] rounded-lg border border-black bg-sky-100 p-[20px] shadow-lg">
                  <h2 className="font-bold ">
                    Can I Transfer My Tickets to Someone Else?
                  </h2>
                  <p className="pt-[10px] ">BLA BLA BLA</p>
                </div>
                <div className="border-1 h-[400px] w-[300px] rounded-lg border border-black bg-sky-100 p-[20px] shadow-lg">
                  <h2 className="font-bold ">
                    Is There a Waiting List for Sold-Out Events?
                  </h2>
                  <p className="pt-[10px] ">BLA BLA BLA</p>
                </div>
              </div>
            </div>
          </div> */}
          </div>
          </Section>
        </LandingLayout>
      </>
    );
  }
