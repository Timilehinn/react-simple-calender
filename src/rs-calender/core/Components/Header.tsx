import { ArrowDoubleLeft, ArrowDoubleRight, ArrowLeft, ArrowRight, CaretDown, CaretUp } from "../asset/icons";

type Header = {
  height: number,
  title: string,
  prevMonth: () => void;
  nextMonth: () => void;
  prevYear: () => void;
  nextYear: () => void;
  showYearView: () => void;
  showMonthView: () => void;
}

export default function Header(props: Header) {
  const { height, title, prevMonth, nextMonth, prevYear, nextYear, showYearView, showMonthView } = props;

  return (
    <div
      style={{
        height: height,
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '.5px solid #F0F0F0'
      }}
    >
      <button onClick={() => showMonthView()} className="button">
        <p>{title}</p>
      </button>
      <div>
        <button onClick={() => prevMonth()} className="button">
          <CaretUp />
        </button>
        <button onClick={() => nextMonth()} className="button">
          <CaretDown />
        </button>
      </div>
    </div>
  )
}