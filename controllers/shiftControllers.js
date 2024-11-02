const express = require('express');
const shiftService = require('../services/shiftService');
const router = express.Router();
const { requireAuth2 } = require('../middleware/authFunction');

router.get('/', requireAuth2,  async (req,res) => {
    try {
        const shift = await shiftService.getAllShift();
        res.json(shift);
    } catch (error) {
        res.status(500).json(error);
    }
});
router.get('/:id', requireAuth2, async (req,res) => {
    try {
        const { id } = req.params;
        const shift = await shiftService.getShiftById(id);
        res.json(shift);
    } catch (error) {
        res.status(500).json(error);
    }
});
router.post('/', requireAuth2, async (req,res) => {
    try {
        const obj = req.body;
        const result = shiftService.addShift(obj);
        res.status(201).json(result);
    } catch (error) {
        res.status(400).json(error);
    }
});
router.put('/:id', requireAuth2,  async (req,res) => {
    try {
       const { id } = req.params;
       const obj = req.body;
       const result = await shiftService.updateShift(id, obj);
       res.status(201).json(result); 
    } catch (error) {
        res.status(400).json(error);
    }
});
router.delete('/:id', requireAuth2, async (req,res) => {
    try {
        const { id } = req.params;
        const result = await shiftService.deleteShift(id);
        res.status(202).json(result);
    } catch (error) {
        res.status(400).json(error);
    }
});

module.exports = router;