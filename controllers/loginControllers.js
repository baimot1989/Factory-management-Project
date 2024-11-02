const express = require('express');
const path = require('path');
const router = express.Router();
const userServices = require('../services/userServices');

router.get('/',(req,res) => {
    try {
        console.log( req.cookies.jwt)
        if( req.cookies.jwt){
            return res.status(404).json({ error: 'Page not found' });
        }
        res.sendFile(path.join(__dirname, '..','public', 'login.html'));
    } catch (error) {
        res.json({ error: error.message })
    }
})
router.get('/logout',(req,res) => {
    try {
        res.cookie('jwt','',{httpOnly: true, maxAge: '1', secure: false, sameSite: 'Lax'})
        res.redirect('/login')
    } catch (error) {
        res.json({ error: error.message })
    }
})
router.post('/', async (req,res) => {
    try {
        const {fullName, email} = req.body;
        const token = await userServices.loginUser(fullName, email);
        res.cookie('jwt', token, { httpOnly: true, maxAge: 3 * 24 * 60 * 60*60, secure: false, sameSite: 'Lax'});
        res.json({fullName});
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
})

module.exports = router;