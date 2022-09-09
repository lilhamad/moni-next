import { Cypher } from './cypher';
let { AES_KEY, IV_KEY} = process.env;
const cypher = new Cypher(AES_KEY, IV_KEY);

let {KEY } = process.env;

export default class Auth {


  static async setHeader (encryptSecret) {
    
    try {

      let secret = cypher.decrypt(encryptSecret);
      secret = secret.replace(/['"]+/g, '');
      return {
        'Authorization':'Bearer ' + secret
      };
    } catch (error) {
      return {status: false, message: "getAll " + JSON.stringify(error) + error.message};
    }
  };
}