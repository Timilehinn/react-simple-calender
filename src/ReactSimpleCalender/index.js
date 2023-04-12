import { useEffect, useState } from 'react';
import './index.css';
import moment from 'moment';
import { RxDoubleArrowRight, RxDoubleArrowLeft } from 'react-icons/rx'


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
        <div className='header'>
          <button className="arrow_btns" onClick={() => prevMonth()}>
            <RxDoubleArrowLeft />
          </button>
          <p>{calenderTitle}</p>
          <button className="arrow_btns" onClick={() => nextMonth()}>
            <RxDoubleArrowRight />
          </button>
        </div>
        <div className='month_label_container'>
          {months.map((month, i) => (
            <div key={i} className="month_labels" style={{ ...centerStyle }}>{month.title}</div>
          ))}

        </div>
        <div className='days_container'>
          {initialBlocks.map((_, i) => (
            <div key={i} className="grid" />
          ))}
          {daysArray.map((day, i) => (
            <div key={i}>
              {isCurrentDate(`${year}-${month.toString().length == 1 ? "0" + month : month}-${day.number.toString().length === 1 ? "0" + day.number : day.number}`) && (
                <div className='grid_current_date' style = {{ ...centerStyle }}>{day.number}</div>
              )}
              {isDisabled(`${year}-${month}-${day.number}`) && (
                <div onClick={() => selectedDate(`${year}-${month}-${day.number}`)} className="grid_disabled" style={{ ...centerStyle }}>{day.number}</div>
              )}
              {!isCurrentDate(`${year}-${month.toString().length == 1 ? "0" + month : month}-${day.number.toString().length === 1 ? "0" + day.number : day.number}`) && !isDisabled(`${year}-${month}-${day.number}`) && (
                <div onClick={() => selectedDate(`${year}-${month}-${day.number}`)} 
                style={{ 
                  backgroundColor: isSelected(`${year}-${month}-${day.number}`) ? "black" : 'white', 
                  color: !isSelected(`${year}-${month}-${day.number}`) ? "black" : 'white', 
                  ...centerStyle 
                }}  className="grid">{day.number}</div>
              )}
            </div>
          ))}
        </div>
      </div>
  );
}

export default SimpleCalender;
