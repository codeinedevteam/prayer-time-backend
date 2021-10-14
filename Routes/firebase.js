const express = require('express');
const router = express.Router();
const admin =require( '../firebase-config');
const tokenDevice = require('../models/tokenDevice');






const notification_options = {
    priority: "high",
    timeToLive: 60 * 60 * 24
  };


  router.post('/register',async (req, res)=>{

    console.log(req.body)
    let newToken = new tokenDevice({
		token: req.body.username
	});
    await newToken.save();

       res.status(200).send("token add")
        
  

})
router.post('/send-notification', (req, res)=>{
    console.log(req.body)
    const  registrationToken = req.body.registrationToken
    const message = req.body.message
    const options =  notification_options
    
      admin.messaging().sendToDevice(registrationToken, message, options)
      .then( response => {

       res.status(200).send("Notification sent successfully"+response)
        
      })
      .catch( error => {
          console.log(error);
      });

})

module.exports =router
