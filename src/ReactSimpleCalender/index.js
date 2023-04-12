import { useEffect, useState } from 'react';
import './index.css';
import moment from 'moment'


function SimpleCalender() {

  const [year, setYear] = useState(2023)
  const [month, setMonth] = useState(4)
  const [selectedDates, setSelectedDates] = useState([])
  const disabled = ["2023-4-13"]

  let currentDate = moment(new Date()).format("YYYY-MM-DD");

  let months = [{ number: 0, title: "sun" }, { number: 1, title: "mon" }, { number: 2, title: "tue" }, { number: 3, title: 'wed' }, { number: 4, title: "thur" }, { number: 5, title: "fri" }, { number: 6, title: "sat" }]
  const dayInMonth = new Date(year, month, 0).getDate();


  const daysArray = Array.from({ length: dayInMonth }, (_, i) => {
    return { number: i + 1, day: new Date(year, month - 1, i + 1).getDay() }
  })


  let initialBlocks = Array.from({ length: daysArray[0].day }, (_, i) => i + 1)


  function isDisabled(d) {
    var exists = disabled.find(day => day == d)
    return exists
  }

  function prevMonth() {
    if (month == 1) {
      setMonth(12)
      setYear(year - 1)
    } else {
      setMonth(month - 1)
    }
  }

  function nextMonth() {
    if (month == 12) {
      setMonth(1)
      setYear(year + 1)
    } else {
      setMonth(month + 1)
    }
  }

  function selectedDate(d) {
    const isSelected = selectedDates.find(date => date == d)
    if (isSelected) {
      var filteredDates = selectedDates.filter(date => date !== d)
      setSelectedDates(filteredDates)
    } else {
      setSelectedDates((prev) => {
        return [...prev, d]
      })
    }
  }

  function isSelected(d) {
    const _ = selectedDates.find(date => date == d)
    return _ ? true : false
  }

  function isCurrentDate(date) {
    return date === currentDate
  }

  let centerStyle = {
    display: 'flex', alignItems: 'center', justifyContent: 'center'
  }

  let calenderTitle = moment(new Date(`${year}-${month}-${new Date().getDate()}`)).format("MMMM YYYY");


  return (
      <div className="container">
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <button onClick={() => prevMonth()}>prev</button>
          <p>{calenderTitle}</p>
          <button onClick={() => nextMonth()}>next</button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center' }}>
          {months.map((month, i) => (
            <div key={i} style={{ height: '50px', width: '50px', border: '1px solid black', ...centerStyle }}>{month.title}</div>
          ))}

        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', width: '100%' }}>
          {initialBlocks.map((_, i) => (
            <div key={i} style={{ height: '50px', width: '50px', border: '1px solid black' }} />
          ))}
          {daysArray.map((day, i) => (
            <div key={i}>
              {isCurrentDate(`${year}-${month.toString().length == 1 ? "0" + month : month}-${day.number.toString().length === 1 ? "0" + day.number : day.number}`) && (
                <div style={{ height: '50px', width: '50px', border: '1px solid black', backgroundColor: 'red', ...centerStyle }}>{day.number}</div>
              )}
              {isDisabled(`${year}-${month}-${day.number}`) && (
                <div onClick={() => selectedDate(`${year}-${month}-${day.number}`)} style={{ height: '50px', width: '50px', border: '1px solid black', backgroundColor: "grey", ...centerStyle }}>{day.number}</div>
              )}
              {!isCurrentDate(`${year}-${month.toString().length == 1 ? "0" + month : month}-${day.number.toString().length === 1 ? "0" + day.number : day.number}`) && !isDisabled(`${year}-${month}-${day.number}`) && (
                <div onClick={() => selectedDate(`${year}-${month}-${day.number}`)} style={{ height: '50px', width: '50px', border: '1px solid black', backgroundColor: isSelected(`${year}-${month}-${day.number}`) ? "yellow" : 'white', ...centerStyle }}>{day.number}</div>
              )}
            </div>
          ))}
        </div>
      </div>
  );
}

export default SimpleCalender;
