import type { NextApiRequest, NextApiResponse } from 'next'
const Repository = require("../../helpers/Repository");
import axiosCall from '../../helpers/axioscall';
import Auth from "../../helpers/auth";
import { Tables } from "../../helpers/dto/tables";
import { responseDto } from "../../helpers/dto/dto";
import { getUser, processPayment } from "../../helpers/userService";


let newCredentials = new Repository(Tables.Credential);

let { PAYSTACK_URL } = process.env;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<responseDto>
  ) {
    const {userId, amount } = req.body;
    try {
      const {user} = await getUser(userId, newCredentials);
      const { data, error } = await axiosCall({
        url: PAYSTACK_URL,
        method: 'post',
        headers: await Auth.setHeader(user.child.secret),
        data: req.body
      });
      if(error) {
        return { status:false, message: "code:dw400 " + JSON.stringify(error?.data?.message)};
      }
      //assuming the user has passed card info and i have receive a callback data of the success status
      let makePayment = await processPayment({userId, sign:"add", amount});
      if(makePayment.status) res.status(200).json({status:true, data: data })
      res.status(400).json({status: false, message: makePayment.message });
    } catch (error) {
      res.status(400).json({status: false, message: "create: error" + JSON.stringify(error) });
    }
  }
  

  
