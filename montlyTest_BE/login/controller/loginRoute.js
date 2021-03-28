const express = require('express');
const router = express.Router();
// const user = require('../model/user');
const jwt = require('jsonwebtoken');

let refreshTokens = [];

router.use(express.json());

function auth() {
    let token = req.headers['content-authorization'];
    token = token.split(' ')[1]; //accessToken
    jwt.verify(token, 'access', (err, user) => {
        if(!err) {
            req.user = user;
            next();
        }else {
            return res.status(403).json({
                message: "user not authenticated"
            });
        }
    });
}

router.post('/refreshToken', (req, res) => {
    const refreshToken = req.body.token;
    if(!refreshToken) {
        return res.status(403).json({
            message: "User is not authenticated"
        });
    }
    //verifying refreshToken
    jwt.verify(refreshToken, "refresh", (err, user) => {

        if(!err) {
            //generating new access token once user verified
            const accessToken = jwt.sign({username: user.name}, "access", {expiresIn: '50s'});
        
        return res.status(201).json({accessToken});
        }
        else {
            return res.status(403).json({
                message: 'User was not authenticated'
            });
        }
    });
});
//route
router.post('/login', (req, res) => {
    const user = req.body.user;
    if(!user) {
        res.status(404).send({
            message: 'Please enter the field'
        });
    }
    let accessToken = jwt.sign({username: user.name}, "access", ({expiresIn: '50s'}));
    let refreshToken = jwt.sign({username: user.name}, "refresh", ({expiresIn: '7d'}));
    refreshTokens.push(refreshToken);
    return res.json({
        user,
        accessToken,
        refreshToken
    });
    
});

module.exports = router;