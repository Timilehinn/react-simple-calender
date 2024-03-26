type MonthProp = {
    height: number;
    showCalender: () => void;
    tileSize: number;
    year: string;
    switchToYear: () => void;
    selectMonth: (value: number) => void;
};
export default function Month(props: MonthProp): import("react/jsx-runtime").JSX.Element;
export {};
