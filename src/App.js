import { useState } from "react";
import SimpleCalender from "./ReactSimpleCalender";

export default function App(){

  const [ selectedDates, setSelectedDates ] = useState([])
  return (
    <SimpleCalender mode="multiple" selectedDates={selectedDates} setSelectedDates={setSelectedDates} disabled={['2023-04-14']} minSelectable="2023-04-13" />
  )
}