import { useState } from "react";
import SimpleCalender from "./ReactSimpleCalender";

export default function App(){

  const [ selectedDates, setSelectedDates ] = useState([])

  const start = new Date("2023-04-15T08:00:00");
const end = new Date("2023-04-15T23:00:00");

const hours = [];
let current = new Date(start);
while (current < end) {
  const startString = current.toLocaleTimeString([], { hour: 'numeric', hour12: true });
  current.setHours(current.getHours() + 1);
  const endString = current <= end
    ? current.toLocaleTimeString([], { hour: 'numeric', hour12: true })
    : end.toLocaleTimeString([], { hour: 'numeric', hour12: true });
  hours.push(`${startString} - ${endString}`);
}


  return (
    <SimpleCalender mode="datetime" selectedDates={selectedDates} times={hours} setSelectedDates={setSelectedDates} onSelect={()=>console.log('you clicked a date')} disabled={['2023-04-14']} minSelectable="2023-04-13" />
  )
}