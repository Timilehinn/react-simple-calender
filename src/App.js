import { useState } from "react";
import SimpleCalender from "./ReactSimpleCalender";

export default function App(){

  const [ selectedDates, setSelectedDates ] = useState([])
  return (
    <SimpleCalender mode="single" selectedDates={selectedDates} setSelectedDates={setSelectedDates} disabled={['2023-04-14']} />
  )
}