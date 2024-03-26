import { Dispatch, SetStateAction } from "react";
type InputProps = {
    value: string;
    setDate: Dispatch<SetStateAction<string>>;
    openCalender: () => void;
};
export default function Input(props: InputProps): import("react/jsx-runtime").JSX.Element;
export {};
