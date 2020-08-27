const express = require('express');
const picRouter = express.Router();

const bcrypt = require('bcrypt');
const saltRounds = 10;

const {
    isLoggedIn,
    isNotLoggedIn,
    validationLoggin,
  } = require("../helpers/middlewares");

const uploader = require('./../config/cloudinary');

const User = require('./../models/User');
const SellingPic = require('./../models/SellingPic');


picRouter.get('/list', (req, res, next) => {
    SellingPic
    .find()
    .then((data) => res.json(data).status(200))
    .catch(error => console.log(error));
})

picRouter.get('/:id', (req, res, next) => { 
    SellingPic
    .findById(req.params.id)
    .then((pic) => res.json(pic).status(200))
    .catch(error => console.log(error));
})


picRouter.post("/upload", uploader.single("photo"), (req, res, next) => {
    if (!req.file) {
      next(new Error("No file uploaded!"));
      return;
    }
    res.json({ secure_url: req.file.secure_url });
  });


picRouter.post('/create', isLoggedIn(), (req, res, next) => {
    
    const {  picture, title, formats, tags, description, price, maxPrints, date, artistInfo } = req.body;
    const currUser = req.session.currentUser._id;
    

    SellingPic
        .create({ title, formats, tags, description, price, maxPrints, date, artistInfo, picture })
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
    
    const { title, formats, tags, description, price, maxPrints, artistInfo, date, picture } = req.body;
    //console.log(req.body)
    SellingPic
        .findByIdAndUpdate(
            req.params.id,
            { $set: { title, formats, tags, description, price, maxPrints, artistInfo, date, picture} },
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