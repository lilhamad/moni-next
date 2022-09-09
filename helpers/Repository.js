"use strict";
import Model from "../infrastructure/models";
class Repository {    
    constructor(modelname) {
        this.Model = Model[modelname];
    }

    getModel() {
        return this.Model;
    }

     create(payload = {},transaction = null) {
        return this.Model.create(payload,{transaction});
    }
    massInsert(data, options = null){
        return this.Model.bulkCreate(data, options);
    }
    updateOrCreate ( condition, data, transaction = null)  {
            // First try to find the record
            const foundItem = this.Model.findOne(condition);
            if (!foundItem) {
                // Item not found, create a new one
                return this.Model.create(data, {transaction});
            }
            // Found an item, update it
            condition.transaction = transaction;
            return this.Model.update(data, condition);
    }

     findOrCreate( condition, data, transaction = null) {
            return this.Model.findOrCreate( {where: condition, defaults: data, transaction});
    }
    update ( condition , data, transaction = null){
            let options = {where: condition, returning: true, plain: true, transaction};
            return this.Model.update(data, options);
    }

    findOneNative(condition = {}) {
        return this.Model.findOne(condition);
    }
    all(options = {}) {
        return this.Model.findAll(options);

    }
     delete  ( options = {})  {
        return this.Model.destroy(options);
    }
    count (options = {}){
        return this.Model.count(options);
    }
    findByPk(id){
        return this.Model.findByPk(id);
    }



}

module.exports = Repository;