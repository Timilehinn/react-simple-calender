import { CSSProperties } from "react";
import './Calender.css';
import { CalenderStyle, HeaderProps, MonthViewProps, TitleFormat, YearViewProps } from "./type";
type OnChangeEvent = {
    date: Date;
    selectedDates?: string[];
};
export type Calender = {
    /**
     * This will determine the height and width of the Calender container, default value is 300.
     */
    calenderSize?: number;
    /**
     * If you want the dates on the calender to be selectable, true by default
     */
    selectable?: boolean;
    /**
     * An array of dates to disable
     * @example ['2024-05-07', '2024-05-08', etc]
     */
    disabledDates?: string[];
    /**
     * Dates before this day will disabled by default
     * @example 2024-05-07
    */
    minDate?: string;
    /**
     * Function called when a user clicks on a date
     */
    onChange?: (params: OnChangeEvent) => void;
    /**
     * An array of dates that need to be preselected
     * @example ['2024-05-07', '2024-05-08', etc]
     */
    preselectedDates?: string[];
    /**
     * Prop to change title format
     * @example 'MMM DD'
     */
    titleFormat?: TitleFormat;
    /**
     * Prop to choose how many letters are shown for days i.e Sun or S
     * @example value 1 will return 'S','M','T','W','T','F','S'
     * @example value 2 will return 'Sun', 'Mon', 'Tue', 'Wed','Thur', 'Fri', 'Sat'
     */
    daysFormat?: 1 | 2;
    /**
     * Style property to change tile styles
     */
    tileStyle?: CSSProperties;
    /**
    * Custom style for all calender components
    */
    calenderStyle?: CalenderStyle;
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
};
export declare function Calender(props: Calender): import("react/jsx-runtime").JSX.Element;
export {};
