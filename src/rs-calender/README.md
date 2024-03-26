
![Logo](https://imgur.com/uf3uc4H.png)


# react-simple-calender

A simple calender component for React


## Usage/Examples

```javascript
import React, { useState } from 'react';
import Calender from 'react-simple-calender';

function App() {

  const [date, setDate] = useState(new Date());

  return (
    <div className="App">
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
```



### Guide

```javascript
  import Calender from 'react-simple-calender
```

| Prop name | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `calenderSize` | `number` | **Optional**. This will determine the height and width of the Calender container, default value is 300. |
| `selectable` | `boolean` | **Optional**. If you want the dates on the calender to be selectable, true by default |
| `disabledDates` | `string[]` | **Optional**. An array of dates to disable. **Example** ['2024-05-07', '2024-05-08', etc] |
| `minDate` | `string[]` | **Optional**. Dates before this day will disabled by default  |
| `onChange` | `OnChangeEvent { date: Date, selectedDates: string[] }` | **Optional**. Dates before this day will disabled by default  |
| `preselectedDates` | `string[]` | **Optional**. Dates before this day will disabled by default, **Example** ['2024-05-07', '2024-05-08', etc]  |
| `titleFormat` | `'MMM YY', 'MMM YYY', 'MMMM YY', 'MMMM YYYY', 'MM YY';` | **Optional**. Prop to change title format   |
| `daysFormat` | `number` | **Optional**. Prop to choose how many letters are shown for days i.e Sun or S   |
| `calenderStyle` | `CalenderStyle` | **Optional**. Custom style for all calender components  |
| `renderHeader` | `(props: HeaderProps) => void` | **Optional**.Render a custom calender header  |
| `multiselect` | `boolean` | **Optional**. Enable multiple date selection  |
| `renderMonthView` | `(props: MonthViewProps) => void` | **Optional**. Render a custom view for Month list  |
| `renderYearView` | `(props: YearViewProps) => void` | **Optional**. Render a custom view for Year list  |

