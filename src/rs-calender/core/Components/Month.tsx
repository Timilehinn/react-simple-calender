import { CSSProperties, useState } from "react";
import { BackArrow } from "../asset/icons";
import { months } from "../constants";

type MonthProp = {
  height: number,
  showCalender: () => void;
  tileSize: number,
  year: string,
  switchToYear: () => void;
  selectMonth: (value: number) => void;
}

type Month = { label: string, value: number }

const MonthButton = ({ buttonStyles, month, selectMonth }: { buttonStyles: CSSProperties, month: Month, selectMonth: (value: number) => void; }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const getCurrentMonthStyles = () => {
    if(month.value === new Date().getMonth() + 1)
    return {
      backgroundColor: 'lightblue',
      color: 'white'
    }
  }

  return (
    <button
      onClick={() => selectMonth(month.value)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="button" style={{ ...buttonStyles, backgroundColor: isHovered ? '#F0F0F0' : 'transparent', ...getCurrentMonthStyles() }}>
      <p style={{ fontWeight: 'bold', textAlign: 'center' }}>{month.label}</p>
    </button>
  )
}

export default function Month(props: MonthProp) {

  const { height, showCalender, tileSize, year, switchToYear, selectMonth } = props;
  var date = new Date(year).getFullYear();

  const getButtonStyles = () => {
    return {
      borderRadius: '5px',
      height: tileSize,
    }
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        border: '.5px solid #F0F0F0'
      }}
    >
      <div style={{
        height: tileSize, display: 'flex', alignItems: 'center',
        borderBottom: '.5px solid #F0F0F0',
      }}>
        <button onClick={() => showCalender()} className="button">
          <BackArrow />
        </button>
        <button onClick={() => switchToYear()} className="button">
          <p>{date}</p>
        </button>
      </div>
      <div style={{
        height,
        alignSelf: 'center',
        width: '80%',
        paddingTop: '20px',
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)', // Three buttons per column
        gap: '10px', // Adjust gap between buttons as needed
        gridAutoRows: `${tileSize}px`,
        rowGap: '10px'
      }}>
        {months.map((month, i) => (
          <MonthButton selectMonth={selectMonth} key={i} buttonStyles={getButtonStyles()} month={month} />
        ))}
      </div>
    </div>
  )
}