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
      />
    </div>
  );
}

export default App;
