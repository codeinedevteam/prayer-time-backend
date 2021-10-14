const express = require('express');
const router = express.Router();

const FoodController = require('controllers/foodController');
const FoodValidator = require('validators/foodValidator');
const upload = require('../upload/uploadImg');
const checkAuth = require('../middleware/checkAuth');

router.get('/', FoodController.getAllFoods);
router.get('/:id', FoodController.seeOneFoodasync);

router.post('/', checkAuth,upload.single('img'),(req,res,next)=>{
    if(!req.file){
        req.body.img= "null"
    }else{
        req.body.img=  req.file.filename
    }
    next()
},FoodController.createFood);

router.put('/:id', FoodController.editFood);

router.delete('/:id', checkAuth,FoodController.deleteFood);

module.exports = router;
