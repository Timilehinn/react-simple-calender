import { CalenderStyle } from "../type";
type Tile = {
    size: number;
    isEmpty?: boolean;
    day?: {
        number: number;
        day: number;
    };
    isCurrentDay?: boolean;
    isSelectable?: boolean;
    isLessThenMin?: boolean;
    isSelected?: boolean;
    isDisabled?: boolean;
    onClick?: () => void;
    style?: CalenderStyle;
};
export default function Tile(props: Tile): import("react/jsx-runtime").JSX.Element;
export declare function EmptyTile({ size }: {
    size: number;
}): import("react/jsx-runtime").JSX.Element;
export {};
