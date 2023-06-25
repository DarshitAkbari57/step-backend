import db from "../models/index";
import { Response, Request, NextFunction } from "express";

/**
 * Helper method for defining associations.
 * This method is not a part of Sequelize lifecycle.
 * The `models/index` file will call this method automatically.
 */

interface BodyType {
  num1: number;
  num2: number;
}
interface MyObject {
  [key: string]: string | number | MyObject;
}

const getResult = async (req: Request, res: Response) => {
  console.log("get data : --- ");
  let data = await db.Step.findAll();
  data = JSON.parse(JSON.stringify(data));
  return res.status(200).json(data);
};

const calculate = async (req: Request, res: Response) => {
  let outputData = calculateData(req.body);
  return res.status(200).json(outputData);
};

const store = async (req: Request, res: Response) => {
  let outputData = calculateData(req.body);
  let data = await db.Step.create({
    firstNumber: req.body.num1,
    secondNumber: req.body.num2,
    output: outputData,
  });
  console.log("data L: ", data);

  return res.status(200).json({ data: true });
};

const calculateData = (body: BodyType) => {
  console.log("data ---");
  let { num1, num2 } = body;
  let carry = 0,
    count = 0;
  let out: MyObject = { carryString: "_", sumString: "" },
    outputData: MyObject = {};
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

const addition = (carry: number, obj: MyObject, num1: number, num2: number) => {
  let cal1 = num1 % 10;
  let cal2 = num2 % 10;

  let carryString = obj.carryString;
  let sum = cal1 + cal2 + carry;
  let sumString: string = String(sum % 10) + obj.sumString;
  if (num1 === 0 && num2 === 0 && Math.floor(sum / 10) > 0) {
    sumString = Math.floor(sum / 10) + sumString;
  } else if (!(num1 === 0 || num2 === 0) || sum > 9) {
    console.log("in if--");
    carryString = String(Math.floor(sum / 10)) + obj.carryString;
  }
  return {
    out: { carryString: carryString, sumString: sumString },
    carry: Math.floor(sum / 10),
  };
};

export default { calculate, getResult, store };
