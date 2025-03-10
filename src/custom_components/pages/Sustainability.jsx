import React from "react";
import {PageTemplate} from "../templates/PageTemplate/PageTempate";
import {Card} from "../atoms/Card/Card";

export const Sustainability = () => {
    return (<PageTemplate>
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    flexWrap: "wrap",
                    gap: "20px",
                }}
            >
                <Card
                    color={"#EDE8F5"}
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    maxWidth="800px"
                    style={{
                        color: "#141619",
                        padding: "30px",
                        borderRadius: "10px",
                        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                    }}
                >
                    <h1 style={{textAlign: "center"}}>Our Commitment to Sustainability</h1>
                    <p style={{textAlign: "justify", maxWidth: "700px"}}>
                        At Flight Finder, we believe that air travel and sustainability can go hand
                        in hand.
                        As a flight price aggregator, we are committed to promoting greener travel
                        choices
                        by providing travelers with eco-conscious flight options and raising
                        awareness
                        about carbon footprints in aviation.
                    </p>

                    <p style={{textAlign: "justify", maxWidth: "700px"}}>
                        We partner with airlines that prioritize fuel efficiency, use sustainable
                        aviation fuels,
                        and adopt carbon offset programs. Our platform helps travelers make informed
                        choices by
                        highlighting flights with lower emissions and promoting airlines that
                        actively invest in sustainability.
                    </p>

                    <p style={{textAlign: "justify", maxWidth: "700px"}}>
                        Flight Finder also encourages responsible travel by providing information on
                        carbon offset programs, sustainable travel tips, and options for
                        eco-friendly accommodations.
                        We aim to make it easier for our users to reduce their environmental impact
                        while still enjoying
                        the convenience of air travel.
                    </p>

                    <p style={{textAlign: "justify", maxWidth: "700px"}}>
                        As we move towards a more sustainable future, Flight Finder is dedicated to
                        continuously
                        improving our services, collaborating with industry leaders, and advocating
                        for greener aviation practices.
                        By choosing responsible travel options, together, we can make a difference
                        for our planet.
                    </p>

                    <br/>
                    <p style={{textAlign: "justify", maxWidth: "700px"}}>
                        © 2025 Flight Finder. All information provided here is for
                        educational purposes.
                    </p>
                </Card>
            </div>
        </PageTemplate>);
};
