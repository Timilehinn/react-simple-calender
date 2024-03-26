"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const icons_1 = require("../asset/icons");
function Header(props) {
    const { height, title, prevMonth, nextMonth, prevYear, nextYear, showYearView, showMonthView } = props;
    return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ style: {
            height: height,
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: '.5px solid #F0F0F0'
        } }, { children: [(0, jsx_runtime_1.jsx)("button", Object.assign({ onClick: () => showMonthView(), className: "button" }, { children: (0, jsx_runtime_1.jsx)("p", { children: title }) })), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("button", Object.assign({ onClick: () => prevMonth(), className: "button" }, { children: (0, jsx_runtime_1.jsx)(icons_1.CaretUp, {}) })), (0, jsx_runtime_1.jsx)("button", Object.assign({ onClick: () => nextMonth(), className: "button" }, { children: (0, jsx_runtime_1.jsx)(icons_1.CaretDown, {}) }))] })] })));
}
exports.default = Header;
