import React from "react";
import { Card } from "../atoms/Card";
import { Input } from "../atoms/Input";


export const SearchPanel = () => {
  return (
    <Card color={'#EDE8F5'} height={'40px'} width={'80%'}>
     <Input type={'text'} placeholder={'From (destnation)'}/>
     <Input type={'text'} placeholder={'To (destnation)'} />    
     </Card>
  );
}