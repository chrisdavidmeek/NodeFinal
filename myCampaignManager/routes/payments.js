var express = require("express");
var router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
 const dbService = require('../../services/db');
 const Payment = require('../../models/Payment');
 const Campaign = require('../../models/Campaign');

router.get("/", function (req, res, next) {
  res.render("payments/index");
});

router.post("/charge", async (req, res) => {
  try {
    
    //collect info from body of form
    var campaign_id = req.body.campaign_id;
    var customer = await createCustomer(req);
    var charge = await createCharge(req.body.amount, customer, campaign_id, req.user);
   
    
  } catch (err) {
    res.send(err);
  }
//gets campaignID
var targetCampaign = await Payment.findCampaign(req.body.campaign);


  var trackDonation= new Payment(
      req.user.displayName,
        req.user.id,
        charge.amount,
        targetCampaign
  );
  //gets campaignName


  var campaignName = await Payment.campaignName(targetCampaign);
  

//update remaining balance
  var remainingAmt = await Campaign.remainingAmt(targetCampaign);
  var difference = charge.amount/100;
  var newBalance = remainingAmt - difference;
  var updated = await Campaign.updateAmt(targetCampaign,  newBalance);
  console.log(charge);
  
  //update specific view inside mongo

 var trackPayment = await Payment.trackUser(trackDonation);
 
  res.render("payments/completed", {user: req.user.displayName,  customer: customer.email, charge: charge.amount/100, campaignName: campaignName});
  
});

module.exports = router;

//helpers





//update to mongo new balance

const createCustomer = async function(req) {
  var customer = await stripe.customers.create({
    name: req.body.name,
    email: req.body.email,
    source: req.body.stripeToken,
  });
  return customer;
};

const createCharge = async function (amount, customer, campaign_id) {
  var charge = await stripe.charges.create({
    amount: amount * 100,
    currency: "usd",
    customer: customer.id,
    description: "Your donation",
    metadata: {
      campaign_id: campaign_id,
    },
  });
  return charge;
};

const trackDonation = async function(charge){
    
const addedCampaign = dbService.db.collection('campaigns').insertOne(charge.id);
}
  