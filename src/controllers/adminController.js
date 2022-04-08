const bcryptjs = require ('bcryptjs');
const {validationResult} = require("express-validator");
//const model = require('../database/models/User')
//const validator = require('express-validator');
const db = require('../database/models');
//const user = require('../database/models/user');

const adminController = {
    
    
    edit: (req, res) => {
        let pedidoUser = db.User.findByPk(req.params.id);
        Promise.all([pedidoUser])
        .then(function([users]){
            res.render('users/userUpdate', 
            { 
                styles: ['usersUpdate'],
                title: 'Fabri Whiskey',
                users: users, 
            })
        })
    },

    update: (req, res) => {
        db.User.update({
            url: req.file.filename,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email, 
            adress: req.body.adress,
            phone: req.body.phone,
        }, {
        where: {
            id: req.params.id
        }
    });
        res.redirect('/users/list' + req.params.id)
    },

    // userDelete: (req,res) => {
    //     res.clearCookie('userEmail');
    //           req.id.destroy();
    //       db.User.destroy(
    //         {
    //             where: {
    //                 id: req.params.id
    //             }
    //         })
    //         return res.redirect('/');
    //   },
}

module.exports = adminController