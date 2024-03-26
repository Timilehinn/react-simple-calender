export type TitleFormat = 'MMM YY' | 'MMM YYY' | 'MMMM YY' | 'MMMM YYYY' | 'MM YY';
export type CalenderStyle = {
    calenderContainer?: {
        bgColor?: string;
    };
    selectedDays?: {
        bgColor?: string;
        color?: string;
    };
    currentDay?: {
        bgColor?: string;
        color?: string;
    };
    disabledDays?: {
        bgColor?: string;
        color?: string;
    };
    tileRadius?: string;
};
export type HeaderProps = {
    title: string;
    showMonthView: () => void;
    nextMonth: () => void;
    prevMonth: () => void;
};
export type MonthViewProps = {
    title: string;
    months: {
        label: string;
        value: number;
    }[];
    goBack: () => void;
    selectMonth: (value: number) => void;
    showYearView: () => void;
};
export type YearViewProps = {
    title: string;
    years: number[];
    selectYear: (value: number) => void;
};
