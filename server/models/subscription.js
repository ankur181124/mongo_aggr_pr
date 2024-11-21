const mongoose = require("mongoose");
const validator = require("validator");


const subscriptionSchema = new mongoose.Schema({

   chanel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
   },
   subscriber: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
   },
 
   createdAt: {
      type: Date,
      default: Date.now()
   },

});


module.exports = mongoose.model("Subscription", subscriptionSchema);