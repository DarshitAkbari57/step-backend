"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// const router = require("express").Router(); // eslint-disable-line new-cap
const router = (0, express_1.Router)();
const step_1 = __importDefault(require("../controller/step"));
const integerValidator = (req, res, next) => {
    const { num1, num2 } = req.body;
    // Specify the regex pattern to validate integers
    const integerRegex = /^\d+$/;
    // Check if the body data is an integer
    if (!integerRegex.test(num1)) {
        return res.status(400).json({ error: 'num1 is an invalid integer value' });
    }
    if (!integerRegex.test(num2)) {
        return res.status(400).json({ error: 'num2 is an invalid integer value' });
    }
    // If the validation passes, proceed to the next middleware
    next();
};
// get method
router.route("/").get(step_1.default.getResult);
// post method
router.route("/calculate").post(integerValidator, step_1.default.calculate);
// post method
router.route("/store").post(integerValidator, step_1.default.store);
exports.default = router;
//# sourceMappingURL=route.js.map