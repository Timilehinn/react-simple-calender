"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const icons_1 = require("../asset/icons");
const constants_1 = require("../constants");
const MonthButton = ({ buttonStyles, month, selectMonth }) => {
    const [isHovered, setIsHovered] = (0, react_1.useState)(false);
    const handleMouseEnter = () => {
        setIsHovered(true);
    };
    const handleMouseLeave = () => {
        setIsHovered(false);
    };
    const getCurrentMonthStyles = () => {
        if (month.value === new Date().getMonth() + 1)
            return {
                backgroundColor: 'lightblue',
                color: 'white'
            };
    };
    return ((0, jsx_runtime_1.jsx)("button", Object.assign({ onClick: () => selectMonth(month.value), onMouseEnter: handleMouseEnter, onMouseLeave: handleMouseLeave, className: "button", style: Object.assign(Object.assign(Object.assign({}, buttonStyles), { backgroundColor: isHovered ? '#F0F0F0' : 'transparent' }), getCurrentMonthStyles()) }, { children: (0, jsx_runtime_1.jsx)("p", Object.assign({ style: { fontWeight: 'bold', textAlign: 'center' } }, { children: month.label })) })));
};
function Month(props) {
    const { height, showCalender, tileSize, year, switchToYear, selectMonth } = props;
    var date = new Date(year).getFullYear();
    const getButtonStyles = () => {
        return {
            borderRadius: '5px',
            height: tileSize,
        };
    };
    return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ style: {
            display: 'flex',
            flexDirection: 'column',
            border: '.5px solid #F0F0F0'
        } }, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ style: {
                    height: tileSize, display: 'flex', alignItems: 'center',
                    borderBottom: '.5px solid #F0F0F0',
                } }, { children: [(0, jsx_runtime_1.jsx)("button", Object.assign({ onClick: () => showCalender(), className: "button" }, { children: (0, jsx_runtime_1.jsx)(icons_1.BackArrow, {}) })), (0, jsx_runtime_1.jsx)("button", Object.assign({ onClick: () => switchToYear(), className: "button" }, { children: (0, jsx_runtime_1.jsx)("p", { children: date }) }))] })), (0, jsx_runtime_1.jsx)("div", Object.assign({ style: {
                    height,
                    alignSelf: 'center',
                    width: '80%',
                    paddingTop: '20px',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '10px',
                    gridAutoRows: `${tileSize}px`,
                    rowGap: '10px'
                } }, { children: constants_1.months.map((month, i) => ((0, jsx_runtime_1.jsx)(MonthButton, { selectMonth: selectMonth, buttonStyles: getButtonStyles(), month: month }, i))) }))] })));
}
exports.default = Month;
