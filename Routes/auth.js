const express = require('express');
const router = express.Router();
const Admin = require('../models/admin');
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');
const checkAuth = require('../middleware/checkAuth');

router.post('/signup', async (req, res) => {
    const{username,password} = req.body
    let admin = await Admin.find({});

	let user =  admin.find((user)=>{
	    return user.username === req.body.username
	})
	if(user){
        return   res.status(400).json({
	        data:"this user already exists",
	        success:false
	    })
	}

	let hasPassword = await bcrypt.hash(req.body.password, 10);
	let newAdmin = new Admin({
		username: req.body.username,
		password: hasPassword
	});
	await newAdmin.save();
	// res.json({
	// 	data: 'add user suc',
	// 	success: true
	// });

	const token = await JWT.sign(
		{
			username
		},
		'ssamclmsmclslcmknsc',
		{
			expiresIn: 3600000
		}
	);

	res.json({
		data:"token add"
	});
});


router.post('/login',async(req,res)=>{
    const{username,password} = req.body
    let admin = await Admin.find({})
    let user =  admin.find((user)=>{
        return user.username=== username
    })
    if(!user){
        return   res.status(400).json({
	        data:"!user",
	        success:false
	    })
    }
    let isMatch =await bcrypt.compare(password,user.password)
    if(!isMatch){
    return res.status(400).json({
	        data:"!user",
	        success:false
	    })
    }

    const token = await JWT.sign(
		{
			username
		},
		'ssamclmsmclslcmknsc',
		{
			expiresIn: 3600000
		}
	);

	res.json({
		token
	});
    

})

router.get('/signup'  ,async (req, res) => {
	let admin = await Admin.find({});
	res.status(200).json({
		data: admin,
		success: true
	});
});
router.delete('/admins/:id', async (req, res) => {
	await Admin.deleteOne({ _id: req.params.id });
	res.json({
		data: 'delete user suc',
		success: true
	});
});

module.exports = router;
