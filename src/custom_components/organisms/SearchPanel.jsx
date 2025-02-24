import React from "react";
import { Card } from "../atoms/Card/Card";
import { Button } from "../atoms/Button";
import BookingModal from "./BookingModal/BookingModal";
import { Calendar } from "lucide-react";
import SwitchButton from "../molecules/SwitchButton/SwitchButton";
import { IconInput } from "../molecules/IconInput/IconInput";

export const SearchPanel = () => {
  return (
    <Card flexDirection="column">
      <SwitchButton />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
          width: "auto",
          gap: "45px",
        }}
      >
        <IconInput type="date" icon={Calendar} />
        <IconInput type="date" icon={Calendar} />
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
          gap: "16px",
        }}
      >
        <>
          <BookingModal />
        </>
      </div>
      <Button>
        {/* <Search size={"16px"} /> */}
        Search
      </Button>
    </Card>
  );
};
