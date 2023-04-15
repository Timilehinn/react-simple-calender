import { useEffect, useState } from 'react';
import './index.css';
import moment from 'moment';
import { RxDoubleArrowRight, RxDoubleArrowLeft } from 'react-icons/rx';
import { MdKeyboardDoubleArrowRight, MdKeyboardDoubleArrowLeft, MdKeyboardArrowRight, MdKeyboardArrowLeft, MdOutlineArrowLeft } from 'react-icons/md'

/**
 * 
 * @param disabled takes in an array of dates in format: 2023-4-13
 * @returns blocks out specified dates
 * @param selectedDates Array
 * @param setSelectedDates :- setStateAction
 * @param mode <string> :- "single" | "multiple" | "datetime" defines how many dates can be selected. with date time, you can select a date and then choose from a list of times
 * @param times Array :- take in an array of times Array<string> i.e ['2pm - 4pm', '4pm - 6pm']. times are defined by you
 * @param minSelectable <string> "YYYY-MM-DD" defines the minimum date that can be selected anything before is disabled 
 * @param onSelect: ()=>void a function that determines what should happend when you click a date, should be used with single mode
 */
function SimpleCalender({ disabled, selectedDates, setSelectedDates, mode, minSelectable, onSelect, times }) {

  const [year, setYear] = useState(new Date().getFullYear())
  const [month, setMonth] = useState(new Date().getMonth() + 1)
  const [_times, showTimes] = useState(false)

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
    try {
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

      /**
       *  datetime will override single, because it runs after a day is clicked/selected
       *  the onselect function won't run
       * */ 
      if(mode == "datetime"){
        showTimes(true)
      }else if(mode == 'single' && onSelect !== undefined){onSelect()}

    } catch (error) {
      console.warn(error)
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

  const doesTimesArrayExist = () => {
    if(times == undefined) return false
    else if(times.length == 0 || undefined) return false
    else return true
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
       
        
        {_times? (
          <>
          <div style={{ width: '100%', display: 'flex', justifyContent:'flex-start', marginTop: '10px' }}>
            <span onClick={()=>showTimes(false)} style={{ cursor: 'pointer' }}>
            <MdKeyboardArrowLeft size={25} />
            </span>
          </div>
            <div style={{ height: '210px', width: '100%', display: 'flex', overflowY: 'scroll', flexDirection: 'column', alignItems: 'center', paddingBottom: '20px' }}>
              {times && times.map((time, i)=>(
                <div key={i} style={{ minHeight: '35px', width: '150px', borderRadius: '5px', border: '1px solid grey', margin: '5px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{time}</div>
              ))}
              {!doesTimesArrayExist() && (
                <p style={{ color: 'black' }}>No Times Available</p>
              )}
            </div>
          </>

          ): (
            <>
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
            </>
          )}
        
      </div>
    </div>
  );
}

export default SimpleCalender;
