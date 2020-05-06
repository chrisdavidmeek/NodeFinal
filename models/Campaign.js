 const dbService = require('../services/db');
const mongo = require('mongodb');

class Campaign {
    constructor(userID, title, request, amt, desc){
        this.userID= userID;
        this.title = title,
        this.amt = amt,
        this.desc= desc
        

    }

    static async addCampaign(campaign){ //also needs to be pushed all the information
        
        //connect to database, execute functionality

        const newCampaign = await dbService.db.collection('campaigns').insertOne(campaign);
     
        return newCampaign;
    }

    static async checkCampaignExists(userID){
        const result = await dbService.db.collection('campaigns').find({campaignId: campaignId}).toArray(); //find specific campaign, add to array
        if(result.length > 0){
            console.log('campaign already exists');
            return true;
        }
        else {
            return false;
        }
    }
//get amount remaining on campaign
  


    static async searchCampaign(id){
    const objId = new mongo.ObjectID(id);
      const result = await dbService.db.collection('campaigns').findOne({_id: objId});
     
        return result
    }


    static async myCampaigns(userID){
      const result = await dbService.db.collection('campaigns').find({userID: userID}).toArray();
      
        console.log(result);
        return result
    }

    static async remainingAmt(id){
        const objId = new mongo.ObjectID(id);
      const result = await dbService.db.collection('campaigns').findOne({_id: objId});
      return result.amt;
    }

    static async updateAmt(id, update){
        // const objId = new mongo.ObjectID(id);
    const result = await dbService.db.collection('campaigns').updateOne({"_id": id},{$set:{"amt": update}})
      return result;
      
    }

};

module.exports = Campaign; 