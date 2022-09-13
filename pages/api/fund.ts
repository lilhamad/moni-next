import type { NextApiRequest, NextApiResponse } from 'next'
const Repository = require("../../helpers/Repository");
import axiosCall from '../../helpers/axioscall';
import Auth from "../../helpers/auth";
import { Tables } from "../../helpers/dto/tables";
import { responseDto, fundDto } from "../../helpers/dto/dto";
import { processPayment } from "../../helpers/userService";

let newCredentials = new Repository(Tables.Credential);

let { PAYSTACK_URL } = process.env;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<responseDto>
  ) {
    try {
      const {userId, amount} : fundDto = req.body;
      let credentaial = await newCredentials.findOneNative({
        where: { userId: userId }
      });
      const { data, error } = await axiosCall({
        url: PAYSTACK_URL,
        method: 'post',
        headers: await Auth.setHeader(credentaial.secret),
        data: req.body
      });
      if(error) {
        res.status(400).json( { status:false, message:"Paystack error response : " + JSON.stringify(error)});
      }
      let makePayment = await processPayment({userId, sign:"add", amount});
      if(makePayment.status) {
        let url = "<iframe src='" + data.data.authorization_url + "' width='100%' height='100%'></iframe>";
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.write(url, 'utf-8');
        res.end();
      }
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      res.write(makePayment.message, 'utf-8');
      res.end();
    } catch (error) {
      res.status(400).json({status: false, message: "create: error" + JSON.stringify(error) });
    }
  }
  
  
  
