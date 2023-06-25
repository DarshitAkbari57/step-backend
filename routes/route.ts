import { Router } from 'express'
// const router = require("express").Router(); // eslint-disable-line new-cap
const router: Router = Router()
import StepController from "../controller/step";
import { Request, Response, NextFunction } from 'express';


const integerValidator = (req:Request, res:Response, next:NextFunction) => {
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
router.route("/").get(StepController.getResult);

// post method
router.route("/calculate").post(integerValidator,StepController.calculate);

// post method
router.route("/store").post(integerValidator,StepController.store);

export default router;