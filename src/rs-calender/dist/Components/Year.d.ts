type YearProps = {
    height: number;
    showCalender: () => void;
    tileSize: number;
    year: string;
    selectYear: (value: number) => void;
    goBack: () => void;
};
export default function Year(props: YearProps): import("react/jsx-runtime").JSX.Element;
export {};
