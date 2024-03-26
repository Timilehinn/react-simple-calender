type Header = {
    height: number;
    title: string;
    prevMonth: () => void;
    nextMonth: () => void;
    prevYear: () => void;
    nextYear: () => void;
    showYearView: () => void;
    showMonthView: () => void;
};
export default function Header(props: Header): import("react/jsx-runtime").JSX.Element;
export {};
