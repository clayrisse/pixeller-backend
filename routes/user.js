const express = require('express');
const userRouter = express.Router();

const bcrypt = require('bcrypt');
const saltRounds = 10;

// const parser = require('./../config/cloudinary');

const User = require('./../models/User');
const SellingPic = require('./../models/SellingPic');

const {
    isLoggedIn,
    isNotLoggedIn,
    validationLoggin,
  } = require("../helpers/middlewares");


userRouter.get('/', isLoggedIn(), (req, res, next) => {
    User.findById(req.session.currentUser._id)
    .then ((user) => {
        req.session.currentUser = user;
            res.json(user)
    })
    .catch ((error) => console.log(error))
    
})

userRouter.put('/', isLoggedIn(), (req, res, next) => {
    
    const { username, email, password, lastName, address, phoneNum, seller, sellerAvatar, sellingPic, sellerArtistName, sellerInfo, sellerContact} = req.body;
   

    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(password, salt);
    
    User
        .findByIdAndUpdate(
            req.session.currentUser._id ,
            { $set: { username, email, password: hashedPassword, lastName, address, phoneNum, seller, sellerAvatar, sellingPic, sellerArtistName, sellerInfo, sellerContact} },
            { new: true }
        )
        .then((userEDit) => {
            //console.log(userEDit)
            req.session.currentUser = userEDit;
            res.json(userEDit)
            
        })
        .catch(error => {
            console.log('Error while retrieving user details: ', error);
        })
});

userRouter.delete('/', (req, res, next) => {

    User
        .findByIdAndDelete(req.session.currentUser._id)
        .then(() => {
            req.session.destroy(()  =>{
                res
                .status(204) //  No Content
                .send();
              return;
              });
        })
        .catch(error => {
        console.log(error);
        });
});

userRouter.post('/checkout/:picId', (req, res, next) => {

    const userId = req.session.currentUser._id;
    const currPic = req.params.picId;//????UROS es currentPic what do I do

    SellingPic
        .findByIdAndUpdate(
            currPic, 
            { $push: {buyer: userId} },
            { new: true })
        .then(pickedPic => {
            

            User.findByIdAndUpdate(
                userId,
                { $push: { buyCheckout: currPic} },
                { new: true }
                )
                .then((user) => {
                    res.status(201).send()
                })
                .catch(error => {
                    console.log(error);
                });
        })
        .catch(error => {
            console.log('Error while adding to car: ', error);
            // res.redirect('/activity-calendar');
        });

});



userRouter.put('/checkout/:picId', (req, res, next) => {

    const userId = req.session.currentUser._id;
    const currPic = req.params.picId;//????UROS es currentPic what do I do

    SellingPic
        .findByIdAndUpdate(
            currPic, 
            { $pull: {buyer: userId} },
            { new: true })
        .then(pickedPic => {
            

            User.findByIdAndUpdate(
                userId,
                { $pull: { buyCheckout: currPic} },
                { new: true }
                )
                .then((user) => {
                    res.status(201).send()
                })
                .catch(error => {
                    console.log(error);
                });
        })
        .catch(error => {
            console.log('Error while adding to car: ', error);
            // res.redirect('/activity-calendar');
        });

});


module.exports = userRouter;