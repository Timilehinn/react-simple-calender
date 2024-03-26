import { CSSProperties, useState } from "react";
import { CalenderStyle } from "../type";

type Tile = {
  size: number,
  isEmpty?: boolean,
  day?: { number: number, day: number },
  isCurrentDay?: boolean,
  isSelectable?: boolean,
  isLessThenMin?: boolean,
  isSelected?: boolean,
  isDisabled?: boolean,
  onClick?: () => void;
  style?: CalenderStyle
}

export default function Tile(props: Tile) {
  const { size, isEmpty, day, isCurrentDay, isSelectable, isLessThenMin, isSelected, onClick, isDisabled, style } = props;

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const getExtraStyles = () => {
    if (isLessThenMin || isDisabled) {
      return {
        transition: '.3s',
        backgroundColor: style?.disabledDays?.bgColor || '#fffbfbe7',
        cursor: 'not-allowed'
      }
    }
    if (isSelected) {
      return {
        transition: '.3s',
        backgroundColor: style?.selectedDays?.bgColor || '#111111'
      }
    }

    if (isCurrentDay) {
      return {
        transition: '.3s',
        backgroundColor: style?.currentDay?.bgColor || 'lightblue'
      }
    }
    return {
      transition: '.3s',
      cursor: 'pointer',
      backgroundColor: isHovered ? '#F0F0F0' : 'transparent',
    }
  }

  const getFontStyle = () => {
    if (isLessThenMin || isDisabled) {
      return {
        color: style?.disabledDays?.color || 'lightgrey'
      }
    }
    if (isSelected) {
      return {
        color: style?.selectedDays?.color || "white"
      }
    }

    if (isCurrentDay) {
      return {
        color: style?.currentDay?.color || 'white'
      }
    }
  }

  const canClick = () => {
    if (isLessThenMin || isDisabled) return false
    return true
  }

  return (
    <button
    // title={isCurrentDay? new Date().toISOString() : null}
      onClick={() => canClick() ? onClick?.() : null}
      style={{
        ...style,
        height: size,
        width: size,
        borderRadius: style?.tileRadius || '5px',
        ...getExtraStyles()
      }}
      className="button center"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {!isEmpty && (
        <p style={{ ...getFontStyle() }}>{day?.number}</p>
      )}
    </button>
  )
}

export function EmptyTile({ size }: { size: number }) {
  return (
    <div
      style={{
        height: size,
        width: size,
      }}
    />
  )
}