import React from "react";
import { Card } from "../atoms/Card/Card";
import AccordionList from "../atoms/Accordion/Accordion";
import { Box } from "../atoms/Box/Box";

export const FAQ = () => {
  const questionSet1 = [
    {
      title: "How does this flight finder app work?",
      content:
        "Our app searches multiple airlines and travel websites to find the best flight deals for your preferred destination, dates, and budget.",
    },
    {
      title: "Is it free to use?",
      content:
        "Yes! Searching for flights is completely free. You only pay when you book a flight with an airline or travel provider.",
    },
    {
      title: "Can I book flights directly through this app?",
      content:
        "Our app helps you find the best flight options, and we redirect you to the airline or travel website to complete the booking.",
    },
  ];

  const questionSet2 = [
    {
      title: "Can I search for flights with flexible dates?",
      content:
        "Yes! Our flexible date search lets you find cheaper flights by showing price differences for nearby dates.",
    },
    {
      title: "Can I filter flights by airline, price, or layovers?",
      content:
        "Absolutely! You can use filters to refine your search based on airlines, price range, number of layovers, departure times, and more.",
    },
    {
      title: "How do I receive my booking confirmation?",
      content:
        "Once you book a flight on the airline’s website, they will send you a confirmation email directly.",
    },
  ];

  const questionSet3 = [
    {
      title: "Why do flight prices change so often?",
      content:
        "Airlines use dynamic pricing, which means fares can change based on demand, seat availability, and other factors. We recommend booking quickly when you see a good deal.",
    },
    {
      title: "Are there any hidden fees?",
      content:
        "We do not charge any extra fees. However, airlines or booking sites may have additional charges for baggage, seat selection, or other services.",
    },
    {
      title: "Can I hold a flight price before booking?",
      content:
        "Some airlines allow fare holds, but this depends on their policy. Our app does not currently offer this feature.",
    },
  ];

  const questionSet4 = [
    {
      title: "Can I change or cancel my flight through this app?",
      content:
        "Since we don’t handle bookings directly, you’ll need to contact the airline or travel provider where you booked your flight.",
    },
    {
      title: "How can I check my airline’s cancellation policy?",
      content:
        "Most airlines display their cancellation and refund policies during booking. You can also check their official website for details.",
    },
  ];

  const questionSet5 = [
    {
      title: "Does the app support multi-city or round-the-world trips?",
      content:
        "Yes! You can search for multi-city flights to plan complex itineraries.",
    },
    {
      title: "Can I track flight prices and get alerts?",
      content:
        "Yes! You can set up price alerts to get notified when flight prices drop.",
    },
    {
      title: "Does this app support different currencies?",
      content: "Yes, you can choose your preferred currency in the settings.",
    },
  ];

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      {/* <h2>Flight Finder FAQ</h2> */}
      <Box width={"100%"} maxWidth={"1000px"} margin={"25px auto"}>
        <h2 style={{ marginBottom: "25px" }}>General Questions</h2>
        <AccordionList items={questionSet1} />

        <h2 style={{ margin: "25px 0px 25px 0px" }}>Search & Booking</h2>
        <AccordionList items={questionSet2} />

        <h2 style={{ margin: "25px 0px 25px 0px" }}>Pricing & Payments</h2>
        <AccordionList items={questionSet3} />

        <h2 style={{ margin: "25px 0px 25px 0px" }}>Changes & Cancellations</h2>
        <AccordionList items={questionSet4} />

        <h2 style={{ margin: "25px 0px 25px 0px" }}>Other Questions</h2>
        <AccordionList items={questionSet5} />
      </Box>
    </div>
  );
};
