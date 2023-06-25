"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("../models/index"));
const getResult = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("get data : --- ");
    let data = yield index_1.default.Step.findAll();
    data = JSON.parse(JSON.stringify(data));
    return res.status(200).json(data);
});
const calculate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let outputData = calculateData(req.body);
    return res.status(200).json(outputData);
});
const store = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let outputData = calculateData(req.body);
    let data = yield index_1.default.Step.create({
        firstNumber: req.body.num1,
        secondNumber: req.body.num2,
        output: outputData,
    });
    console.log("data L: ", data);
    return res.status(200).json({ data: true });
});
const calculateData = (body) => {
    console.log("data ---");
    let { num1, num2 } = body;
    let carry = 0, count = 0;
    let out = { carryString: "_", sumString: "" }, outputData = {};
    while (num1 !== 0 || num2 !== 0) {
        count++;
        num1 = Math.floor(num1 / 10);
        num2 = Math.floor(num2 / 10);
        let data = addition(carry, out, num1, num2);
        out = data.out;
        carry = data.carry;
        outputData[`step${count}`] = data.out;
    }
    console.log("outputData : ", outputData);
    return outputData;
};
const addition = (carry, obj, num1, num2) => {
    let cal1 = num1 % 10;
    let cal2 = num2 % 10;
    let carryString = obj.carryString;
    let sum = cal1 + cal2 + carry;
    let sumString = String(sum % 10) + obj.sumString;
    if (num1 === 0 && num2 === 0 && Math.floor(sum / 10) > 0) {
        sumString = Math.floor(sum / 10) + sumString;
    }
    else if (!(num1 === 0 || num2 === 0) || sum > 9) {
        console.log("in if--");
        carryString = String(Math.floor(sum / 10)) + obj.carryString;
    }
    return {
        out: { carryString: carryString, sumString: sumString },
        carry: Math.floor(sum / 10),
    };
};
exports.default = { calculate, getResult, store };
//# sourceMappingURL=step.js.map