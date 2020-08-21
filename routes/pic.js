const express = require('express');
const picRouter = express.Router();

const bcrypt = require('bcrypt');
const saltRounds = 10;

const {
    isLoggedIn,
    isNotLoggedIn,
    validationLoggin,
  } = require("../helpers/middlewares");

const parser = require('./../config/cloudinary');

const User = require('./../models/User');
const SellingPic = require('./../models/SellingPic');



picRouter.post('/create', isLoggedIn(), parser.single('picture'),(req, res, next) => {
    
    const {  title, formats, tags, description, price, maxPrints, date } = req.body;
    const currUser = req.session.currentUser._id;
    let sellingPic_url;
    if (req.file){
        sellingPic_url = req.file.secure_url;
    }

    SellingPic
        .create({ title, formats, tags, description, price, maxPrints, date, picture: sellingPic_url })
        .then(newCreatePic => {

            const picId = newCreatePic._id;
            User.findByIdAndUpdate(
                currUser,
                { $push: { sellingPic: picId} },
                { new: true }
                )
                .then(() => {
                    res.status(200).send()

                })
                .catch(error => {
                    console.log(error);
                });
        })
        .catch(error => {
        console.log('Error while creating the pic: ', error);
        // res.render("forusers/activity-create");
        });

});


picRouter.put('/:id', isLoggedIn(), (req, res, next) => {  //tengo que chequiar si isLoggedIn(), ???
    
    const { title, formats, tags, description, price, maxPrints, date, picture: imageAct_url } = req.body;
    //console.log(req.body)
    SellingPic
        .findByIdAndUpdate(
            req.params.id,
            { $set: { title, formats, tags, description, price, maxPrints, date, picture: imageAct_url} },
            { new: true }
        )
        .then( (picUpdate) => {
        res.json(picUpdate)

        })
        .catch(error => {
            console.log('Error while retrieving picture details: ', error);
        })
});

picRouter.delete('/:id', isLoggedIn(), (req, res, next) => {   //tengo que chequiar si isLoggedIn(), ???

    const currUser = req.session.currentUser._id;

    SellingPic
        .findByIdAndDelete(req.params.id)
        .then(deletedPic => {
            
            const bookId = deletedPic._id;

            User.findByIdAndUpdate(
                currUser,
                { $pull: { sellingPic: bookId} },
                { new: true }
                )
                .then(() => {
                    res.status(204).send()
                    
                })
                .catch(error => {
                    console.log(error);
                });
        })
        .catch(error => {
        console.log(error);
        });

});


module.exports = picRouter;