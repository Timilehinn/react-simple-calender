"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
function Input(props) {
    const { value, openCalender } = props;
    return ((0, jsx_runtime_1.jsx)("input", { value: value, disabled: true }));
}
exports.default = Input;
