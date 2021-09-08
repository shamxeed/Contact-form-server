const express = require('express')
const { check, validationResult } = require('express-validator')

const sendMail = require('../../utils/sendMail')

const router = express.Router()

router.post('/', [

    check('name', 'full name must be at least 6 characters!')
    .exists()
    .isLength({min: 6}),
    check('email', 'invalid email address')
    .isEmail()
    .normalizeEmail(),
    check('message', 'message is too short')
    .exists()
    .isLength({min: 5})
],

(req, res) => {

    const errors = validationResult(req)

    if(!errors.isEmpty()) return res.status(206).json(errors.array())
    
    const { name, email, message } = req.body

    sendMail(name, email, message, (err, data) => {

        if(err){

            return res.status(500).json({msg: "Oops, Server error!! please try again..."})
        
        }

        return res.json({msg: "Your message has been successfully sent!!!"})

    });
});

module.exports = router