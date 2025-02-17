import React from "react";
import { Card } from "../atoms/Card/Card";
import { Input } from "../atoms/Input";
import { Button } from "../atoms/Button";
import BookingModal from "./BookingModal/BookingModal";
import { Select } from "../atoms/Select";
import SearchIcon from "../../assets/icons/search.svg?react";

export const SearchPanel = () => {
  return (
    <Card color={"#EDE8F5"}>
      <Input type={"text"} placeholder={"From (destination)"} required={true} />
      <Input type={"text"} placeholder={"To (destnation)"} required={true} />
      <Select />
      <Input type={"date"} />
      <Input type={"date"} />

      <BookingModal />
      <Button>
        <ion-icon name="search-outline"></ion-icon>
      </Button>
    </Card>
  );
};
