import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
// import Calender from './rs-calender/core';
import Calender from 'react-simple-calender';

function App() {

  const [date, setDate] = useState(new Date());

  return (
    <div className="App" style={{ marginLeft: '50px' }}>
      <p>{date.toTimeString()} {date.getFullYear()} {date.toLocaleDateString()}</p>
      <Calender
        preselectedDates={[
          '2024-03-20',
          '2024-03-23'
        ]}
        disabledDates={[
          '2024-03-28',
          '2024-03-29',
          '2024-04-2'
        ]}
        multiselect={false}
        onChange={(params) => {setDate(params.date); console.log(JSON.stringify(params))}}
        titleFormat={'MMMM YYYY'}
        daysFormat={2}
        // calenderStyle={{
        //   currentDay: {
        //     bgColor: 'red',
        //     color: 'green',
        //   },
        //   tileRadius: '200px',
        //   selectedDays: {
        //     bgColor: 'violet'
        //   },
        //   calenderContainer: {
        //     bgColor: 'violet'
        //   }
        // }}
        // renderHeader={(params) => (
        //   <div style={{
        //     backgroundColor: 'green',
        //     width: '100%',
        //   }}>
        //     <p onClick={() => params.showMonthView()}>{params.title}</p>
        //     <p onClick={() => params.prevMonth()}>prev</p>
        //     <p onClick={() => params.nextMonth()}>next</p>
        //   </div>
        // )}
        // renderMonthView={(params) => (
        //   <div style={{ height: '100%', width: '100%' }}>
        //     <p style={{ margin: 0, padding: 0 }} onClick={() => params.goBack()}>Go back</p>
        //     <p style={{ margin: 0, padding: 0 }} onClick={() => params.showYearView()}>Year view {params.title}</p>
        //     {params.months.map((month, i) => (
        //       <p style={{ margin: 0, padding: 0 }} onClick={() => params.selectMonth(month.value)}>{month.label}</p>
        //     ))}
        //   </div>
        // )}
        // renderYearView={(params) => (
        //   <div style={{ height: '100%', width: "100%", backgroundColor: 'violet' }}>
        //     {params.years.map(year => (
        //       <p onClick={()=>params.selectYear(year)}>{year}</p>
        //     ))}
        //   </div>
        // )}
      />
    </div>
  );
}

export default App;
