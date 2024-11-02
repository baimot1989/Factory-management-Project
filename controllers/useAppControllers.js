const express = require('express');
const path = require('path');
const { requireAuth } = require('../middleware/authFunction');
const router = express.Router();

router.get('/home', requireAuth, (req,res) => {
    
    res.sendFile(path.join(__dirname, '..','public', 'home.html'));
});
router.get('/users', requireAuth,(req,res) => {
    res.sendFile(path.join(__dirname, '..','public', 'users.html'));
});
router.get('/departments', requireAuth,(req,res) => {
    res.sendFile(path.join(__dirname, '..','public', 'departments.html'));
});
router.get('/departments/edit', requireAuth,(req,res) => {
    res.sendFile(path.join(__dirname, '..','public', 'editDepartment.html'));
});
router.get('/departments/create', requireAuth,(req,res) => {
    res.sendFile(path.join(__dirname, '..','public', 'createDepartment.html'));
});
router.get('/employees', requireAuth,(req,res) => {
    res.sendFile(path.join(__dirname, '..','public', 'employees.html'));
});
router.get('/employees/edit', requireAuth,(req,res) => {
    res.sendFile(path.join(__dirname, '..','public', 'editEmployees.html'));
});
router.get('/employees/create', requireAuth,(req,res) => {
    res.sendFile(path.join(__dirname, '..','public', 'createEmployee.html'));
});
router.get('/shifts', requireAuth,(req,res) => {
    res.sendFile(path.join(__dirname, '..','public', 'shifts.html'));
});

module.exports = router; 