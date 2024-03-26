"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const icons_1 = require("../asset/icons");
const constants_1 = require("../constants");
const YearButton = ({ buttonStyles, label, selectYear }) => {
    const [isHovered, setIsHovered] = (0, react_1.useState)(false);
    const handleMouseEnter = () => {
        setIsHovered(true);
    };
    const handleMouseLeave = () => {
        setIsHovered(false);
    };
    const getCurrentYearStyles = () => {
        if (label === parseInt(new Date().toISOString().slice(0, 10)))
            return {
                backgroundColor: 'lightblue',
                color: 'white'
            };
    };
    return ((0, jsx_runtime_1.jsx)("button", Object.assign({ onClick: () => selectYear(label), onMouseEnter: handleMouseEnter, onMouseLeave: handleMouseLeave, className: "button", style: Object.assign(Object.assign(Object.assign({}, buttonStyles), { backgroundColor: isHovered ? '#F0F0F0' : 'transparent' }), getCurrentYearStyles()) }, { children: (0, jsx_runtime_1.jsx)("p", Object.assign({ style: { fontWeight: 'bold', textAlign: 'center' } }, { children: label })) })));
};
function Year(props) {
    const { height, showCalender, tileSize, year, selectYear, goBack } = props;
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
                } }, { children: [(0, jsx_runtime_1.jsx)("button", Object.assign({ onClick: () => goBack(), className: "button" }, { children: (0, jsx_runtime_1.jsx)(icons_1.BackArrow, {}) })), (0, jsx_runtime_1.jsx)("button", Object.assign({ className: "button" }, { children: (0, jsx_runtime_1.jsx)("p", { children: date }) }))] })), (0, jsx_runtime_1.jsx)("div", Object.assign({ style: {
                    height,
                    alignSelf: 'center',
                    width: '80%',
                    paddingTop: '20px',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '10px',
                    gridAutoRows: `${tileSize}px`,
                    rowGap: '10px',
                    overflow: 'scroll',
                    scrollbarWidth: 'none'
                } }, { children: constants_1.years.map((year, i) => ((0, jsx_runtime_1.jsx)(YearButton, { selectYear: selectYear, buttonStyles: getButtonStyles(), label: year }, i))) }))] })));
}
exports.default = Year;
