import { paymentDto } from "./dto/dto";
const Repository = require("./Repository");
import { Tables } from "./dto/tables";

let newUser = new Repository(Tables.User);
let newWallet = new Repository(Tables.Wallet);

export async function getUser(userId:any, childModel:any){
    try {
        let user = await newUser.findOneNative({
            where: { id: userId },
            attributes: { exclude:  ['userId'], }  
        });
        let child = await childModel.findOneNative({
            where: { userId: userId },
            attributes: { exclude:  ['userId'], }  
        } );
        user.child = child
        return { status:true, user: user };
    } catch (error) {
        return {status: false, message: "fund: error" + JSON.stringify(error)};
    }
}

export  async function processPayment(model : paymentDto){
    try {
        let userUpdate = await getUser(model.userId, newWallet);
        let newData = { 
            balance : model.sign == "add"? Number(userUpdate.user.child.balance) + model.amount : Number(userUpdate.user.child.balance) - model.amount
        } //could still make a -ve balance check
        let updateWallet = await newWallet.update({ id: userUpdate.user.child.id }, newData);
        return { status:true, user: updateWallet };
    } catch (error) {
        return {status: false, message: "fund: error" + JSON.stringify(error)};
    }
}