const express = require('express');
const employeeService = require('../services/employeeService');
const router = express.Router();
const { requireAuth2 } = require('../middleware/authFunction');
router.get('/', requireAuth2, async (req,res) => {
    try {
        const employee = await employeeService.getAllEmployee();
        res.json(employee);
    } catch (error) {
        res.status(500).json(error);
    }
});
router.get('/:id', requireAuth2, async (req,res) => {
    try {
        const { id } = req.params;
        const employee = await employeeService.getEmployeeById(id);
        res.json(employee);
    } catch (error) {
        res.status(500).json(error);
    }
});
router.post('/', requireAuth2,  (req,res) => {
    try {
        const obj = req.body;
        const resulte = employeeService.addEmployee(obj);
        res.status(201).json(resulte);
    } catch (error) {
        res.status(400).json(error);
    }
});
router.put('/:id', requireAuth2, async (req,res) => {
    
    try {
       const { id } = req.params;
       const obj = req.body;
       const resulte = await employeeService.updateEmployee(id, obj);
       res.status(201).json(resulte); 
    } catch (error) {
        res.status(400).json(error);
    }
});
router.delete('/:id', requireAuth2, async(req,res) => {
    try {
        const { id } = req.params;
        const resulte = await employeeService.deleteEmployee(id);
        res.status(202).json(resulte);
    } catch (error) {
        res.status(400).json(error);
    }
});

module.exports = router;