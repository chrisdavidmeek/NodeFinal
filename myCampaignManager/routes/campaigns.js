const express = require("express");
const router = express.Router();
const saveCampaign = require("../../models/savedCampaigns");
const Campaign = require("../../models/Campaign");
const dbService = require("../../services/db");
const Payment = require("../../models/Payment");

// ---- created empty campaign object 
//get amount remaining on campaign

/* list single campaign */
router.get("/view", async function (req, res, next) {

  let specCampaign = await Campaign.searchCampaign(req.query.id );
  console.log(specCampaign);
    let record = await Payment.record(req.user.id);
    console.log(record);



  res.render("myCampaigns/view", { //data passed through the form generates. 
    campaign: specCampaign,
    
    
  });
});

/* GET listing of campaigns. */
router.get("/", async function (req, res, next) {

//will show all campaigns in database
const campaigns = await dbService.db.collection('campaigns').find({}).toArray();

res.render("myCampaigns/campaigns", {
    campaigns: campaigns
})
});

/* Get addCampaign form */

//All this does is take the user to the form

router.get("/add", function (req, res, next) {
  console.log("went to add new campaign");
  res.render("myCampaigns/addCampaign", {
    title: "New Campaign",
  });
});

/* save campaignForm to list */



router.post("/save", async (req, res, next) => {
  var newCampaign = new Campaign(
    req.user.id,
    req.body.title,
    req.body.amt,
    req.body.desc,
    

    //req.campaignId this is generated from mongoDb

  );
  var addCampaign = await Campaign.addCampaign(newCampaign);
  
console.log(req.id); 

  res.redirect("/campaigns/view?key=" + req.body.title);
  
}

);
module.exports = router;
