import React from "react";
import { Link } from "react-router-dom";
import AdminCard from "@atoms/AdminCard/AdminCard.jsx";
import { Plane } from "lucide-react";
import { PlaneTakeoff } from "lucide-react";
import { TowerControl } from "lucide-react";
import { UserRoundPen } from "lucide-react";
import { CalendarDays } from "lucide-react";
import { MessageSquare } from "lucide-react";

export const Admin = () => {
  return (
    <div
      className={"adminDashboard"}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1
        style={{
          color: "var(--textColorDark)",
          fontSize: "4rem",
          paddingTop: "50px",
        }}
      >
        Edit:
      </h1>
      <div
        className={"cardContainer"}
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "40px",
          flexWrap: "wrap",
          maxWidth: "850px",
          paddingTop: "30px",
          paddingBottom: "70px",
        }}
      >
        <Link to={"/admin/flights"}>
          <AdminCard icon={Plane} title={"Flights"} />
        </Link>
        <AdminCard icon={PlaneTakeoff} title={"Airlines"} />
        <AdminCard icon={TowerControl} title={"Airports"} />
        <Link to={"/admin/users"}>
          <AdminCard icon={UserRoundPen} title={"Users"} />
        </Link>
        <AdminCard icon={CalendarDays} title={"Bookings"} />
        <AdminCard icon={MessageSquare} title={"Feedback"} />
      </div>
    </div>
  );
};
