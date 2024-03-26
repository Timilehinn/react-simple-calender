"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Calender = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const Tile_1 = __importStar(require("./Components/Tile"));
require("./Calender.css");
const Days_1 = __importDefault(require("./Components/Days"));
const utils_1 = require("./utils");
const Header_1 = __importDefault(require("./Components/Header"));
const Year_1 = __importDefault(require("./Components/Year"));
const Month_1 = __importDefault(require("./Components/Month"));
const constants_1 = require("./constants");
function Calender(props) {
    var _a;
    const { calenderSize = 300, selectable = true, minDate = '1920-01-01', preselectedDates, disabledDates, onChange, titleFormat, daysFormat, tileStyle, calenderStyle, renderHeader, renderMonthView, renderYearView, multiselect = false } = props;
    var size = calenderSize < 300 ? 300 : calenderSize;
    var tileSize = size / 7;
    const [year, setYear] = (0, react_1.useState)(new Date().getFullYear());
    const [month, setMonth] = (0, react_1.useState)(new Date().getMonth() + 1);
    const [_times, showTimes] = (0, react_1.useState)(false);
    const [selectedDates, setSelectedDates] = (0, react_1.useState)(preselectedDates ? preselectedDates : []);
    const [view, setView] = (0, react_1.useState)('calender');
    // useEffect(() => {
    //   if (preselectedDates && preselectedDates.length > 0) {
    //     setSelectedDates(preselectedDates);
    //   }
    // }, [preselectedDates, minDate])
    let currentDate = new Date().toISOString().slice(0, 10);
    const dayInMonth = new Date(year, month, 0).getDate();
    const daysArray = Array.from({ length: dayInMonth }, (_, i) => {
        return { number: i + 1, day: new Date(year, month - 1, i + 1).getDay() };
    });
    let initialBlocks = Array.from({ length: daysArray[0].day }, (_, i) => i + 1);
    function prevMonth() {
        if (month == 1) {
            setMonth(12);
            setYear(year - 1);
        }
        else {
            setMonth(month - 1);
        }
    }
    function nextMonth() {
        if (month == 12) {
            setMonth(1);
            setYear(year + 1);
        }
        else {
            setMonth(month + 1);
        }
    }
    function prevYear() {
        setYear(year - 1);
    }
    function nextYear() {
        setYear(year + 1);
    }
    const showYearView = () => {
        setView('year-view');
    };
    const showMonthView = () => {
        setView('month-view');
    };
    const selectDates = (date) => {
        // if(!multiselect && selectedDates.length === 1){
        //   return 
        // }
        setSelectedDates(prev => {
            if (!multiselect)
                return [date];
            const index = prev.indexOf(date);
            if (index !== -1) {
                return prev.filter(d => d !== date);
            }
            else {
                return [...prev, date];
            }
        });
    };
    const isSelected = (date) => {
        const findSelected = selectedDates.find(selected => selected === date);
        return findSelected ? true : false;
    };
    const shouldDisable = (0, react_1.useCallback)((date) => {
        if (disabledDates && disabledDates.length > 0) {
            const index = disabledDates.indexOf(date);
            if (index !== -1) {
                return true;
            }
            return false;
        }
        else {
            return false;
        }
    }, [disabledDates]);
    const selectMonth = (value) => {
        setView('calender');
        setMonth(value);
        onChange === null || onChange === void 0 ? void 0 : onChange({
            date: new Date((0, utils_1.getFormatedYearMonth)(year, value) + '-' + '01'),
            selectedDates,
        });
    };
    const selectYear = (value) => {
        setView('month-view');
        setYear(value);
    };
    let calenderTitle = (0, utils_1.getTitleFormat)(new Date(year, month, 0).toISOString(), titleFormat);
    const getYearTitle = (0, react_1.useCallback)(() => {
        return calenderTitle;
    }, [calenderTitle]);
    (0, react_1.useEffect)(() => {
        if (selectedDates.length > 0) {
            onChange === null || onChange === void 0 ? void 0 : onChange({
                date: new Date(selectedDates[selectedDates.length - 1]),
                selectedDates,
            });
        }
    }, [selectedDates]);
    const _renderHeader = () => {
        if (renderHeader !== undefined)
            return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: renderHeader({ title: calenderTitle, nextMonth, prevMonth, showMonthView }) }));
        return ((0, jsx_runtime_1.jsx)(Header_1.default, { height: tileSize, title: calenderTitle, nextMonth: nextMonth, prevMonth: prevMonth, nextYear: nextYear, prevYear: prevYear, showYearView: showYearView, showMonthView: showMonthView }));
    };
    const _renderMonthView = () => {
        if (renderMonthView !== undefined)
            return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: renderMonthView({ title: getYearTitle(), months: constants_1.months, goBack: () => setView('calender'), selectMonth, showYearView: () => setView('year-view') }) }));
        return ((0, jsx_runtime_1.jsx)(Month_1.default, { year: getYearTitle(), height: size, tileSize: tileSize, showCalender: () => setView('calender'), switchToYear: () => setView('year-view'), selectMonth: selectMonth }));
    };
    const _renderYearView = () => {
        if (renderYearView !== undefined)
            return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: renderYearView({ title: getYearTitle(), years: constants_1.years, selectYear }) }));
        return ((0, jsx_runtime_1.jsx)(Year_1.default, { year: getYearTitle(), height: size, tileSize: tileSize, showCalender: () => setView('calender'), goBack: () => setView('month-view'), selectYear: selectYear }));
    };
    return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ style: {
            width: size,
            border: '.5px solid #F0F0F0',
            borderRadius: '5px'
        } }, { children: [view === 'calender' && ((0, jsx_runtime_1.jsxs)("div", Object.assign({ style: {
                    height: 'auto',
                    width: size,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    backgroundColor: ((_a = calenderStyle === null || calenderStyle === void 0 ? void 0 : calenderStyle.calenderContainer) === null || _a === void 0 ? void 0 : _a.bgColor) || 'transparent'
                } }, { children: [(0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: _renderHeader() }), (0, jsx_runtime_1.jsx)(Days_1.default, { size: tileSize, daysFormat: daysFormat }), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: 'flex container' }, { children: [initialBlocks.map((_, i) => ((0, jsx_runtime_1.jsx)(Tile_1.EmptyTile, { size: tileSize }, i))), daysArray.map((day, i) => ((0, jsx_runtime_1.jsx)(Tile_1.default, { style: calenderStyle, onClick: () => {
                                    selectDates((0, utils_1.getFormatedYearMonth)(year, month) + '-' + day.number);
                                    // onChange?.({
                                    //   date: new Date(getFormatedYearMonth(year, month) + '-' + day.number),
                                    //   selectedDates,
                                    //   disabledDates,
                                    // })
                                    // getOnChangeData(day.number)
                                }, isSelectable: selectable, size: tileSize, day: day, isDisabled: shouldDisable((0, utils_1.getFormatedYearMonth)(year, month) + '-' + day.number), isSelected: isSelected((0, utils_1.getFormatedYearMonth)(year, month) + '-' + day.number), isCurrentDay: (0, utils_1.getFormatedYearMonth)(year, month) + '-' + day.number === currentDate, isLessThenMin: (0, utils_1.isLessThanMin)((0, utils_1.getFormatedYearMonth)(year, month) + '-' + day.number, minDate) }, i)))] }))] }))), view === 'month-view' && ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: _renderMonthView() })), view === 'year-view' && ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: _renderYearView() }))] })));
}
exports.Calender = Calender;
