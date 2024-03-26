"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmptyTile = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
function Tile(props) {
    const { size, isEmpty, day, isCurrentDay, isSelectable, isLessThenMin, isSelected, onClick, isDisabled, style } = props;
    const [isHovered, setIsHovered] = (0, react_1.useState)(false);
    const handleMouseEnter = () => {
        setIsHovered(true);
    };
    const handleMouseLeave = () => {
        setIsHovered(false);
    };
    const getExtraStyles = () => {
        var _a, _b, _c;
        if (isLessThenMin || isDisabled) {
            return {
                transition: '.3s',
                backgroundColor: ((_a = style === null || style === void 0 ? void 0 : style.disabledDays) === null || _a === void 0 ? void 0 : _a.bgColor) || '#fffbfbe7',
                cursor: 'not-allowed'
            };
        }
        if (isSelected) {
            return {
                transition: '.3s',
                backgroundColor: ((_b = style === null || style === void 0 ? void 0 : style.selectedDays) === null || _b === void 0 ? void 0 : _b.bgColor) || '#111111'
            };
        }
        if (isCurrentDay) {
            return {
                transition: '.3s',
                backgroundColor: ((_c = style === null || style === void 0 ? void 0 : style.currentDay) === null || _c === void 0 ? void 0 : _c.bgColor) || 'lightblue'
            };
        }
        return {
            transition: '.3s',
            cursor: 'pointer',
            backgroundColor: isHovered ? '#F0F0F0' : 'transparent',
        };
    };
    const getFontStyle = () => {
        var _a, _b, _c;
        if (isLessThenMin || isDisabled) {
            return {
                color: ((_a = style === null || style === void 0 ? void 0 : style.disabledDays) === null || _a === void 0 ? void 0 : _a.color) || 'lightgrey'
            };
        }
        if (isSelected) {
            return {
                color: ((_b = style === null || style === void 0 ? void 0 : style.selectedDays) === null || _b === void 0 ? void 0 : _b.color) || "white"
            };
        }
        if (isCurrentDay) {
            return {
                color: ((_c = style === null || style === void 0 ? void 0 : style.currentDay) === null || _c === void 0 ? void 0 : _c.color) || 'white'
            };
        }
    };
    const canClick = () => {
        if (isLessThenMin || isDisabled)
            return false;
        return true;
    };
    return ((0, jsx_runtime_1.jsx)("button", Object.assign({ 
        // title={isCurrentDay? new Date().toISOString() : null}
        onClick: () => canClick() ? onClick === null || onClick === void 0 ? void 0 : onClick() : null, style: Object.assign(Object.assign(Object.assign({}, style), { height: size, width: size, borderRadius: (style === null || style === void 0 ? void 0 : style.tileRadius) || '5px' }), getExtraStyles()), className: "button center", onMouseEnter: handleMouseEnter, onMouseLeave: handleMouseLeave }, { children: !isEmpty && ((0, jsx_runtime_1.jsx)("p", Object.assign({ style: Object.assign({}, getFontStyle()) }, { children: day === null || day === void 0 ? void 0 : day.number }))) })));
}
exports.default = Tile;
function EmptyTile({ size }) {
    return ((0, jsx_runtime_1.jsx)("div", { style: {
            height: size,
            width: size,
        } }));
}
exports.EmptyTile = EmptyTile;
