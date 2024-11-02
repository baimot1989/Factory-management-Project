const express = require('express');
const departmentService = require('../services/departmentService');
const router = express.Router();
const { requireAuth2 } = require('../middleware/authFunction');

// get request for the department
router.get('/', requireAuth2, async (req,res) => {
    try {
        const department = await departmentService.getAllDepartment();
        res.json(department);
    } catch (error) {
        res.status(500).json(error);
    }
});
// get by id request for department
router.get('/:id', requireAuth2, async (req,res) => {
    try {
        const { id } = req.params;
        const department = await departmentService.getDepartmentById(id);
        res.json(department);
    } catch (error) {
        res.status(500).json(error);
    }
});
router.post('/', requireAuth2, async (req,res) => {
    try {
        const obj = req.body;
        const resulte = await departmentService.addDepartment(obj);
        res.status(201).json(resulte);
    } catch (error) {
        res.status(400).json(error.message);
    }
});
router.put('/:id', requireAuth2, async (req,res) => {
    try {
       const { id } = req.params;
       const obj = req.body;
       console.log(obj,id)
       const resulte = await departmentService.updateDepartment(id, obj);
       res.status(201).json(resulte); 
    } catch (error) {
        res.status(400).json(error.message);
    }
});
router.delete('/:id', requireAuth2, async (req,res) => {
    try {
        const { id } = req.params;
        const resulte = await departmentService.deleteDepartment(id);
        res.status(202).json(resulte);
    } catch (error) {
        res.status(400).json(error.message);
    }
});

module.exports = router;