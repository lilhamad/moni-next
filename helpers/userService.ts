import { paymentDto } from "./dto/dto";
const Repository = require("./Repository");
import { Tables } from "./dto/tables";

let newWallet = new Repository(Tables.Wallet);
let newUser = new Repository(Tables.User);


export  async function processPayment(model : paymentDto){
    try {
        let updateRow = await newWallet.findOneNative({
            where: { userId: model.userId },
            attributes: { exclude:  ['userId'], }  
        } );
        let newData = { 
            balance : model.sign == "add"? Number(updateRow.balance) + model.amount : Number(updateRow.balance) - model.amount
        } //could still make a -ve balance check
        let updateWallet = await newWallet.update({ id: updateRow.id }, newData);
        return { status:true, user: updateWallet };
    } catch (error) {
        return {status: false, message: "fund: error" + JSON.stringify(error)};
    }
}

export  async function getUser(){
    try {
        let user = await newWallet.findByPk(1);
        return { status:true, user: user };
    } catch (error) {
        return {status: false, message: "fund: error" + JSON.stringify(error)};
    }
}