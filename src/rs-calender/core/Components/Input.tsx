import React, { Dispatch, SetStateAction } from "react"

type InputProps = {
  value: string,
  setDate: Dispatch<SetStateAction<string>>
  openCalender: ()=> void;
}

export default function Input(props: InputProps) {
  const {
    value,
    openCalender
  } = props;
  return (
    <input 
      value={value}
      disabled
    />
  )
}