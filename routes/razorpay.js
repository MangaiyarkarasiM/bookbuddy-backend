var express = require("express");
var router = express.Router();
const Razorpay = require("razorpay");
const shortid = require('shortid');
const { authVerify } = require("../auth");

var razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

router.post("/create-order", authVerify, async (req, res) => {

  let options = {
    amount: req.body.amount * 100,
    currency: "INR",
    receipt: shortid.generate()
  }
  try {
    razorpay.orders.create(options, function (err, order) {
      if(err){
        console.log(err);
      }else{
        res.send({
          statusCode:200,
          order:{...order,key_id:process.env.RAZORPAY_KEY_ID}
        })
      }
    });
  } catch (error) {
    console.log(error);
  }

});

module.exports = router;
