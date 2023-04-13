import { useEffect, useState } from 'react';
import './index.css';
import moment from 'moment';
import { RxDoubleArrowRight, RxDoubleArrowLeft } from 'react-icons/rx';
import { MdKeyboardDoubleArrowRight, MdKeyboardDoubleArrowLeft, MdKeyboardArrowRight, MdKeyboardArrowLeft } from 'react-icons/md'

/**
 * 
 * @param disabled takes in an array of dates in format: 2023-4-13
 * @returns blocks out specified dates
 * 
 * @param selectedDates array
 * @param setSelectedDates setStateAction
 * @param mode <string> "single" | "multiple" defines how many dates can be selected
 * @param minSelectable <string> "YYYY-MM-DD" defines the minimum date that can be selected anything before is disabled 
 */
function SimpleCalender({ disabled, selectedDates, setSelectedDates, mode, minSelectable }) {

  const [year, setYear] = useState(2023)
  const [month, setMonth] = useState(4)
  const [isHover, setIsHover] = useState(false)
  // const [selectedDates, setSelectedDates] = useState([])
  // const disabled = ["2023-4-13"]

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


  function prevYear() {
    setYear(year - 1)
  }

  function nextYear() {
    setYear(year + 1)
  }


  function selectedDate(d) {
    if (mode == "single") {
      setSelectedDates([d])
    }
    if (mode == 'multiple') {
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


  const isSelectable = (d) => {
    if (minSelectable) {
      const d_1 = moment(d)
      const d_2 = moment(minSelectable)

      return d_1.isBefore(d_2)
    } else {
      return false
    }
  }


  return (
    <div className="container">
      <div className='header'>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <button className="arrow_btns" onClick={() => prevYear()}>
            <MdKeyboardDoubleArrowLeft size={20} />
          </button>
          <button onClick={() => prevMonth()} className="arrow_btns">
            <MdKeyboardArrowLeft size={20} />
          </button>
        </div>
        <p>{calenderTitle}</p>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <button onClick={() => nextMonth()} className="arrow_btns">
            <MdKeyboardArrowRight size={20} />
          </button>
          <button className="arrow_btns" onClick={() => nextYear()}>
            <MdKeyboardDoubleArrowRight size={20} />
          </button>
        </div>

      </div>
      <div className='month_label_container'>
        {months.map((month, i) => (
          <div key={i} className="month_labels" style={{ ...centerStyle }}>{month.title}</div>
        ))}

      </div>
      <div className='days_container'>
        {initialBlocks.map((_, i) => (
          <div key={i} className="grid_null" />
        ))}
        {daysArray.map((day, i) => (
          <div key={i}>
            {isSelectable(`${year}-${month.toString().length == 1 ? "0" + month : month}-${day.number}`) ? (
              <div className="grid_disabled" style={{ ...centerStyle }}>{day.number}</div>
            ) : (
              <div >
                {!isDisabled(`${year}-${month.toString().length == 1 ? "0" + month : month}-${day.number}`) && isCurrentDate(`${year}-${month.toString().length == 1 ? "0" + month : month}-${day.number.toString().length === 1 ? "0" + day.number : day.number}`) && (
                  <div onClick={() => isDisabled(`${year}-${month.toString().length == 1 ? "0" + month : month}-${day.number}`) ? null : selectedDate(`${year}-${month}-${day.number}`)} className='grid_current_date' style={{ ...centerStyle, backgroundColor: isSelected(`${year}-${month}-${day.number}`) ? "black" : 'rgb(96, 166, 223)', }}>{day.number}</div>
                )}
                {isDisabled(`${year}-${month.toString().length == 1 ? "0" + month : month}-${day.number}`) && (
                  <div className="grid_disabled" style={{ ...centerStyle }}>{day.number}</div>
                )}
                {!isCurrentDate(`${year}-${month.toString().length == 1 ? "0" + month : month}-${day.number.toString().length === 1 ? "0" + day.number : day.number}`) && !isDisabled(`${year}-${month.toString().length == 1 ? "0" + month : month}-${day.number}`) && (
                  <div onClick={() => selectedDate(`${year}-${month}-${day.number}`)}
                    onMouseOver={() => {
                      setIsHover(true)
                    }}
                    onMouseLeave={() => {
                      setIsHover(false)
                    }}
                    style={{
                      backgroundColor: isSelected(`${year}-${month}-${day.number}`) ? "black" : 'white',
                      color: !isSelected(`${year}-${month}-${day.number}`) ? "black" : 'white',
                      ...centerStyle
                    }} className="grid">{day.number}</div>
                )}
              </div>
            )}
          </div>

        ))}
      </div>
    </div>
  );
}

export default SimpleCalender;
