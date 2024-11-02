const express = require('express');
const userServices = require('../services/userServices');
const router = express.Router();
const { requireAuth2 } = require('../middleware/authFunction');

router.get('/', requireAuth2, async (req, res) => {
    try {
        const users = await userServices.getAllUsers();
        res.json(users);
    } catch (error) {
        res.json(error)

    }
})
router.get('/:id', requireAuth2, async (req, res) => {
    try {
        const { id } = req.params;
        const user = await userServices.getUserById(id);
        console.log(user);
        res.json(user);
    } catch (error) {
        res.json(error)

    }
})
router.post('/', requireAuth2, (req, res) => {
    try {
        const obj = req.body;
        const resulte = userServices.addUser(obj);
        res.json(resulte);
    } catch (error) {
        res.json(error)

    }
});

module.exports = router;