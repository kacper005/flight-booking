import React from "react";
import { PageTemplate } from "../templates/PageTemplate/PageTempate";
import { Card } from "../atoms/Card/Card";

export const ContactUsPage = () => {
    return (
        <PageTemplate>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    padding: "40px 20px",
                }}
            >
                <Card
                    color={"#EDE8F5"}
                    display="flex"
                    flexDirection="column"
                    alignItems="flex-start" // Align content to the left
                    maxWidth="800px"
                    style={{
                        color: "#141619",
                        padding: "40px",
                        borderRadius: "12px",
                        boxShadow: "0px 6px 10px rgba(0, 0, 0, 0.15)",
                    }}
                >
                    <h1 style={{ textAlign: "left", marginBottom: "20px", fontSize: "28px" }}>
                        Contact Us
                    </h1>

                    {/* Contact & Reminder Section */}
                    <div
                        style={{
                            display: "flex",
                            flexWrap: "wrap",
                            justifyContent: "space-between",
                            width: "100%",
                        }}
                    >
                        {/* Contact Section */}
                        <div style={{ flex: "1", minWidth: "300px", paddingRight: "20px" }}>
                            <h2 style={{ fontSize: "22px", marginBottom: "10px" }}>Our Office</h2>
                            <p style={{ marginBottom: "6px" }}>Flight Finder </p>
                            <p style={{ marginBottom: "6px" }}>Larsgårdsvegen 2</p>
                            <p style={{ marginBottom: "6px" }}>6009 Ålesund, Norway</p>
                            <p style={{ marginBottom: "6px" }}>Email: support@flightfinder.com</p>

                            <h3 style={{ fontSize: "18px", marginTop: "15px" }}>Company Info</h3>
                            <p>Norway, Org. 987654321</p>
                        </div>

                        {/* Reminder Section */}
                        <div style={{ flex: "1", minWidth: "300px" }}>
                            <h2 style={{ fontSize: "22px", marginBottom: "10px" }}>Important Notice</h2>
                            <p style={{ lineHeight: "1.5" }}>
                                We are not a travel agency and do not sell tickets. If you have any
                                questions regarding a reservation, please contact the travel provider
                                or airline directly.
                            </p>
                        </div>
                    </div>

                    {/* Footer Text Inside the Card */}
                    <div style={{ marginTop: "30px", textAlign: "center", width: "100%" }}>
                        <p style={{ fontSize: "14px", color: "#555" }}>
                            © 2025 Flight Finder. All information provided here is for educational purposes.
                        </p>
                    </div>
                </Card>
            </div>
        </PageTemplate>
    );
};
