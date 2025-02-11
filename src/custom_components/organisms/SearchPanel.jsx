import React from "react";
import { Card } from "../atoms/Card";
import { Input } from "../atoms/Input";
import { Button } from "../atoms/Button";
import BookingModal from "./BookingModal/BookingModal";
import { Select } from "../atoms/Select";


export const SearchPanel = () => {
  return (
    <Card color={'#EDE8F5'} height={'40px'} width={'60%'} display={'flex'} justifyContent={'space-between'} alighItems={'center'}>
      <div style={{ display: "flex", alignItems: "center" }}>
     <Input type={'text'} placeholder={'From (destnation)'} required={true}/>
     <Input type={'text'} placeholder={'To (destnation)'} required={true}/>    
     </div>
     <Select/>
     <BookingModal/>
     <Button children={'Search'} color={'#3D52A0'} width={'100px'} height={'40px'}/>
     </Card>
  );
}