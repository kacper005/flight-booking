import React from "react"

export const Input = ({ type, placeholder, required }) => {
  return <input style={{
    width:"200px", 
    height:"40px", 
    outline:"none", 
    borderRadius:"5px", 
    border:"1px solid #ccc", 
    paddingLeft:"15px",
    fontSize:"16px",
    margin:"2px"
   }} type={type} placeholder={placeholder} required={required}/>
}