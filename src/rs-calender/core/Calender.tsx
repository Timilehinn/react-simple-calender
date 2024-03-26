import { CSSProperties, useCallback, useEffect, useState } from "react";
import Tile, { EmptyTile } from "./Components/Tile";
import './Calender.css'
import Days from "./Components/Days";
import { getFormatedYearMonth, getTitleFormat, isLessThanMin } from "./utils";
import Header from "./Components/Header";
import Year from "./Components/Year";
import { CalenderStyle, HeaderProps, MonthViewProps, TitleFormat, YearViewProps } from "./type";
import Month from "./Components/Month";
import { months, years } from "./constants";

type OnChangeEvent = {
  date: Date
  selectedDates?: string[]
}

export type Calender = {
  /**
   * This will determine the height and width of the Calender container, default value is 300.
   */
  calenderSize?: number;

  /**
   * If you want the dates on the calender to be selectable, true by default
   */
  selectable?: boolean,

  /**
   * An array of dates to disable 
   * @example ['2024-05-07', '2024-05-08', etc]
   */
  disabledDates?: string[],

  /**
   * Dates before this day will disabled by default 
   * @example 2024-05-07 
  */
  minDate?: string // YYYY-MM-DD

  /**
   * Function called when a user clicks on a date 
   */
  onChange?: (params: OnChangeEvent) => void;

  /**
   * An array of dates that need to be preselected
   * @example ['2024-05-07', '2024-05-08', etc]
   */
  preselectedDates?: string[],

  /**
   * Prop to change title format 
   * @example 'MMM DD'
   */
  titleFormat?: TitleFormat

  /**
   * Prop to choose how many letters are shown for days i.e Sun or S
   * @example value 1 will return 'S','M','T','W','T','F','S'
   * @example value 2 will return 'Sun', 'Mon', 'Tue', 'Wed','Thur', 'Fri', 'Sat'
   */
  daysFormat?: 1 | 2

  /**
   * Style property to change tile styles 
   */
  tileStyle?: CSSProperties

  /**
  * Custom style for all calender components
  */
  calenderStyle?: CalenderStyle

  /**
   * Render a custom calender header
   * @example renderHeader: (props: HeaderProps) => ()
 */
  renderHeader?: (props: HeaderProps) => void;

  /**
   * Enable multiple date selection
  */
   multiselect?: boolean;

  /**
   * Render a custom view for Month list
   * @example renderMonthView: (props: MonthViewProps) => ()
   */
  renderMonthView?: (props: MonthViewProps) => void;

  /**
  * Render a custom view for Year list
  * @example renderYearView: (props: YearViewProps) => ()
  */
  renderYearView?: (props: YearViewProps) => void;

}

type View = 'calender' | 'year-view' | 'month-view';

export function Calender(props: Calender) {
  const {
    calenderSize = 300,
    selectable = true,
    minDate = '1920-01-01',
    preselectedDates,
    disabledDates,
    onChange,
    titleFormat,
    daysFormat,
    tileStyle,
    calenderStyle,
    renderHeader,
    renderMonthView,
    renderYearView,
    multiselect = false
  } = props;

  var size = calenderSize < 300 ? 300 : calenderSize

  var tileSize = size / 7
  const [year, setYear] = useState(new Date().getFullYear())
  const [month, setMonth] = useState(new Date().getMonth() + 1)
  const [_times, showTimes] = useState(false);
  const [selectedDates, setSelectedDates] = useState<string[]>(preselectedDates? preselectedDates : []);
  const [view, setView] = useState<View>('calender');

  // useEffect(() => {
  //   if (preselectedDates && preselectedDates.length > 0) {
  //     setSelectedDates(preselectedDates);
  //   }
  // }, [preselectedDates, minDate])

  let currentDate = new Date().toISOString().slice(0, 10);
  const dayInMonth = new Date(year, month, 0).getDate();
  
  const daysArray = Array.from({ length: dayInMonth }, (_, i) => {
    return { number: i + 1, day: new Date(year, month - 1, i + 1).getDay() }
  })

  let initialBlocks = Array.from({ length: daysArray[0].day }, (_, i) => i + 1);

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

  const showYearView = () => {
    setView('year-view');
  }

  const showMonthView = () => {
    setView('month-view');
  }

  const selectDates = (date: string) => {
    // if(!multiselect && selectedDates.length === 1){
    //   return 
    // }
    setSelectedDates(prev => {
      if(!multiselect) return [date]
      const index = prev.indexOf(date);

      if (index !== -1) {
        return prev.filter(d => d !== date);
      } else {
        return [...prev, date];
      }
    });
  }

  const isSelected = (date: string) => {
    const findSelected = selectedDates.find(selected => selected === date);
    return findSelected ? true : false;
  }

  const shouldDisable = useCallback((date: string) => {
    if (disabledDates && disabledDates.length > 0) {
      const index = disabledDates.indexOf(date);
      if (index !== -1) {
        return true
      }
      return false
    } else {
      return false
    }

  }, [disabledDates]);

  const selectMonth = (value: number) => {
    setView('calender');
    setMonth(value);
    onChange?.({
      date: new Date(getFormatedYearMonth(year, value) + '-' + '01'),
      selectedDates,
    })
  }

  const selectYear = (value: number) => {
    setView('month-view');
    setYear(value)
  }

  let calenderTitle = getTitleFormat(new Date(year, month, 0).toISOString(), titleFormat);
  
  const getYearTitle = useCallback(() => {
    return calenderTitle
  }, [calenderTitle]);

  useEffect(() => {
    if(selectedDates.length > 0) {
      onChange?.({
        date: new Date(selectedDates[selectedDates.length - 1]),
        selectedDates,
      })
    }
   
  }, [selectedDates]);

  const _renderHeader = () => {
    if (renderHeader !== undefined) return (
      <>{renderHeader({ title: calenderTitle, nextMonth, prevMonth, showMonthView })}</>
    )
    return (
      <Header
        height={tileSize}
        title={calenderTitle}
        nextMonth={nextMonth}
        prevMonth={prevMonth}
        nextYear={nextYear}
        prevYear={prevYear}
        showYearView={showYearView}
        showMonthView={showMonthView}
      />
    )
  }

  const _renderMonthView = () => {
    if (renderMonthView !== undefined) return (
      <>{renderMonthView({ title: getYearTitle(), months, goBack: () => setView('calender'), selectMonth, showYearView: () => setView('year-view') })}</>
    )
    return (
      <Month
        year={getYearTitle()}
        height={size}
        tileSize={tileSize}
        showCalender={() => setView('calender')}
        switchToYear={() => setView('year-view')}
        selectMonth={selectMonth}
      />
    )
  }

  const _renderYearView = () => {
    if (renderYearView !== undefined) return (
      <>{renderYearView({ title: getYearTitle(), years, selectYear })}</>
    )
    return (
      <Year
        year={getYearTitle()}
        height={size}
        tileSize={tileSize}
        showCalender={() => setView('calender')}
        goBack={() => setView('month-view')}
        selectYear={selectYear}
      />
    )
  }

  return (
    <div
      style={{
        width: size,
        border: '.5px solid #F0F0F0',
        borderRadius: '5px'
      }}
    >
      {view === 'calender' && (
        <div
          style={{
            height: 'auto',
            width: size,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            backgroundColor: calenderStyle?.calenderContainer?.bgColor || 'transparent'
          }}>
          <>{_renderHeader()}</>
          <Days size={tileSize} daysFormat={daysFormat} />
          <div className='flex container'>
            {initialBlocks.map((_, i) => (
              <EmptyTile size={tileSize} key={i} />
            ))}
            {daysArray.map((day, i) => (
              <Tile
                style={calenderStyle}
                key={i}
                onClick={() => {
                  selectDates(getFormatedYearMonth(year, month) + '-' + day.number);
                  // onChange?.({
                  //   date: new Date(getFormatedYearMonth(year, month) + '-' + day.number),
                  //   selectedDates,
                  //   disabledDates,
                  // })
                  // getOnChangeData(day.number)
                }}
                isSelectable={selectable}
                size={tileSize}
                day={day}
                isDisabled={shouldDisable(getFormatedYearMonth(year, month) + '-' + day.number)}
                isSelected={isSelected(getFormatedYearMonth(year, month) + '-' + day.number)}
                isCurrentDay={getFormatedYearMonth(year, month) + '-' + day.number === currentDate}
                isLessThenMin={isLessThanMin(getFormatedYearMonth(year, month) + '-' + day.number, minDate)}
              />
            ))}
          </div>
        </div>
      )}
      {view === 'month-view' && (
        <>{_renderMonthView()}</>
      )}
      {view === 'year-view' && (
        <>{_renderYearView()}</>
      )}
    </div>
  )
}

