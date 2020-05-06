 const dbService = require('../services/db');
const mongo = require('mongodb');

class Payment {
    constructor(name, userID, amt,campaignID){
        this.name = name,
        this.userID= userID,
        this.amt = amt,
        this.campaignID = campaignID

    };

    static async trackUser(user){
          const trackUser = await dbService.db.collection('payments').insertOne(user);
     
        return trackUser;
    }

    
     static async findCampaign(campaignName){
        
         const result = await dbService.db.collection('campaigns').findOne({title: campaignName})
        const objNm = new mongo.ObjectID(result._id);
            
            return objNm;
        }
        
    static async campaignName(id){
        const result = await dbService.db.collection('campaigns').findOne({_id: id});
        return result.title;
    }

    static async campaignAmt(id){
        const result = await dbService.db.collection('campaigns').findOne({_id: id});
        return result.amt;
        console.log(result);
    }


}


module.exports = Payment; 