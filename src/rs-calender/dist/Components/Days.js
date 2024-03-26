"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
function Days(props) {
    const { size, daysFormat = 1 } = props;
    let days = [
        { number: 0, label: daysFormat === 1 ? 's' : "sun" },
        { number: 1, label: daysFormat === 1 ? 'm' : "mon" },
        { number: 2, label: daysFormat === 1 ? 't' : "tue" },
        { number: 3, label: daysFormat === 1 ? 'w' : "wed" },
        { number: 4, label: daysFormat === 1 ? 't' : "thur" },
        { number: 5, label: daysFormat === 1 ? 'f' : "fri" },
        { number: 6, label: daysFormat === 1 ? 's' : "sat" }
    ];
    return ((0, jsx_runtime_1.jsx)("div", Object.assign({ style: {
            height: 'auto',
            width: '100%',
            display: 'flex',
        } }, { children: days.map((day, i) => ((0, jsx_runtime_1.jsx)("div", Object.assign({ style: {
                height: size,
                width: size
            }, className: "center" }, { children: (0, jsx_runtime_1.jsx)("p", Object.assign({ style: { textTransform: 'capitalize', fontWeight: '500' } }, { children: day.label })) }), i))) })));
}
exports.default = Days;
