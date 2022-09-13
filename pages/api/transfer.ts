import type { NextApiRequest, NextApiResponse } from 'next'
const Repository = require("../../helpers/Repository");
import { Tables } from "../../helpers/dto/tables";
import { responseDto, transerDto } from "../../helpers/dto/dto";
import { processPayment } from "../../helpers/userService";


let newWallet = new Repository(Tables.Wallet);


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<responseDto>
  ) {
    try {
      
      const {senderId, recipientId, amount} : transerDto = req.body;
      
      let sender = await newWallet.findOneNative({ where: { userId: senderId }});
      if(Number(sender.balance) < amount){
        res.status(400).json({status: false, message: "insuficient balance" });
      }      
      let recipient = await newWallet.findOneNative({ where: { userId: recipientId }});
      if(!recipient){
        res.status(400).json({status: false, message: "Invalid recipient use the seeded recipient with ID : 2" });
      }
      let makePayment = await processPayment({userId:senderId, sign:"substract", amount});
      if(makePayment.status){
        let makePaymentRecipient = await processPayment({userId:recipientId, sign:"add", amount});
        if(makePaymentRecipient.status) res.status(200).json({status:true, data: "Transfer successful" })
      }
      res.status(400).json({status: false, message: makePayment.message });
    } catch (error) {
      res.status(400).json({status: false, message: "transfer: error" + JSON.stringify(error) });
    }
  }
  
  
  
