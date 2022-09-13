import type { NextApiRequest, NextApiResponse } from 'next'
import { responseDto, fundDto } from "../../helpers/dto/dto";
import { getUser } from "../../helpers/userService";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<responseDto>
  ) {
    try {
      let user = await getUser();
      if(user.status) {
        res.status(200).json({status: true, data:user});
      }
      res.status(400).json(user);
    } catch (error) {
      res.status(400).json({status: false, message: "fetch error: error" + JSON.stringify(error) });
    }
  }
  
  
  
