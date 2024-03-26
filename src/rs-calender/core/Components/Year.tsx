import { CSSProperties, useState } from "react";
import { BackArrow } from "../asset/icons";
import { years } from "../constants";

type YearProps = {
  height: number,
  showCalender: () => void;
  tileSize: number,
  year: string;
  selectYear: (value: number) => void;
  goBack: () => void;
}

const YearButton = ({ buttonStyles, label, selectYear }: { buttonStyles: CSSProperties, label: number, selectYear: (value: number) => void; }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const getCurrentYearStyles = () => {
    if(label === parseInt(new Date().toISOString().slice(0, 10)))
    return {
      backgroundColor: 'lightblue',
      color: 'white'
    }
  }

  return (
    <button
    onClick={()=>selectYear(label)}
    onMouseEnter={handleMouseEnter}
    onMouseLeave={handleMouseLeave}
    className="button" style={{ ...buttonStyles, backgroundColor: isHovered? '#F0F0F0' : 'transparent', ...getCurrentYearStyles()}}>
    <p style={{ fontWeight: 'bold', textAlign: 'center' }}>{label}</p>
  </button>
  )
}

export default function Year(props: YearProps) {

  const { height, showCalender, tileSize, year, selectYear, goBack } = props;
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
        <button onClick={() => goBack()} className="button">
          <BackArrow />
        </button>
        <button className="button">
          <p>{date}</p>
        </button>
      </div>
      <div style={{
        height,
        alignSelf: 'center',
        width: '80%',
        paddingTop: '20px',
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '10px',
        gridAutoRows: `${tileSize}px`,
        rowGap: '10px',
        overflow: 'scroll',
        scrollbarWidth: 'none'
      }}>
        {years.map((year, i) => (
         <YearButton selectYear={selectYear} key={i} buttonStyles={getButtonStyles()} label={year} />
        ))}
      </div>

    </div>
  )
}