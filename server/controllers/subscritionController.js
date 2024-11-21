const Errorhandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Subscription = require("../models/subscription");
const sendToken = require("../utils/jwtToken");




// create subscription for a channel 
exports.createSubscription = catchAsyncErrors(async (req, res, next) => {

   // login user 
   let user = req.user;
     
   // chanel id 
   let { chanelId } = req.body

   if (!chanelId) {
      return next(new Errorhandler("Please Provide chanelId", 400));
   }

   if (user._id == chanelId) {
      return next(new Errorhandler("You can not subscribe to your own chanel", 403));

   }

   // now create a subscription document 

   const subscription = await Subscription.create({
      chanel: chanelId,
      subscriber: user._id

   });

   res.status(200).json({
      success: true,
      subscription
   })

})



// how many subscribers for channel
exports.countSubscribers = catchAsyncErrors(async (req, res, next) => {

   const {chanelId} = req.params;
 
const chanel = await Subscription.aggregate([
   {
      
      $lookup:{
         from:'subscriptions',
         localField:'_id',
         foreignField:'chanel',
         as:'subscribers'
      }
   }
])

res.status(200).json({
   success: true,
   chanel
})
 
})