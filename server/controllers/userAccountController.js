const express = require("express");
const userAccountModel = require("../models/userAccountModel");
const router = express.Router();
const uuid = require('uuid');


//Creates the user account in the DB
router.post("/api/userAccounts", function(req, res, next) {
    let id = uuid.v4();
    const userAccount = new userAccountModel({
        _id: id,
        first_name: req.body.first_name,
        surname: req.body.surname,
        email: req.body.email,
        date_of_birth: new Date().toISOString().slice(0,10),
        links:[
            {
                rel: "self",
                href: "http://localhost:3000/api/userAccounts/" + id
            }
        ]
    })

    userAccount.save(function (err,userAccount) {
        if (err) {
            return next(err);
        }
        res.status(201).json(userAccount);
    });

});

// Gets all the user accounts
router.get("/api/userAccounts", function (req, res, next) {
    userAccountModel.find(function(err, userAccount) {
        if(err){return next(err);}
        res.json({"users": userAccount});
    })
});

// Gets a user account
router.get('/api/userAccounts/:id', function(req, res, next) {
    let id = req.params.id;
    userAccountModel.findById(id, function(err, userAccount) {
        if (err) {
            return next(err);
        }
        if (userAccount === null) {
            return res.status(404).json({'message': 'User not found!'});
        }

        res.json(userAccount);
    });
});

//I don't think we should have this for the user account
router.put('/api/userAccounts/:id', function(req, res, next) {
    let id = req.params.id;
    console.log(id);
    userAccountModel.findById(id, function(err, userAccount) {
        if (err) {
            return next(err);
        }
        if (userAccount == null) {
            return res.status(404).json({"message": "User not found"});
        }
        userAccount.first_name = req.body.first_name;
        userAccount.surname = req.body.surname;
        userAccount.email = req.body.email;
        userAccount.date_of_birth = req.body.date_of_birth;
        userAccount.save();
        res.json(userAccount);
    });
});

//Replaces specific attributes of the user account
router.patch('/api/userAccounts/:id', function(req, res, next) {
    let id = req.params.id;
    userAccountModel.findById(id, function(err, userAccount) {
        if (err) {
            return next(err);
        }
        if (userAccount == null) {
            return res.status(404).json(
                {"message": "User not found"});
        }
        userAccount.first_name = (req.body.first_name||userAccount.first_name);
        userAccount.surname = (req.body.surname||userAccount.surname);
        userAccount.email = (req.body.email||userAccount.email);
        userAccount.date_of_birth = (req.body.date_of_birth||userAccount.date_of_birth);
        userAccount.save();
        res.json(userAccount);
    });
});

//Deletes all user accounts
router.delete('/api/userAccounts', function(req, res, next) {
    userAccountModel.deleteMany(function(err, userAccount) {
        if (err) {
            return next(err);
        }
        res.json({'userAccounts': userAccount });
    });
});

//Deletes a user account
router.delete('/api/userAccounts/:id', function(req, res, next) {
    let id = req.params.id;
    userAccountModel.findOneAndDelete({_id: id}, function(err, userAccount) {
        if (err) {
            return next(err);
        }
        if (userAccount === null) {
            return res.status(404).json({'message': 'user not found'});
        }
        res.json(userAccount);
    });
});

module.exports = router;