const express = require('express');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./dbConnection/dbConnection');
const userControllers = require('./controllers/userControllers');
const departmentControllers = require('./controllers/departmentControllers');
const employeeControllers = require('./controllers/employeeControllers');
const shiftControllers = require('./controllers/shiftControllers');
const loginControllers = require('./controllers/loginControllers');
const useAppControllers = require('./controllers/useAppControllers');

const app = express();
const port = 3000;

// data base coonections
connectDB();

// Middleware
app.use(cookieParser())
app.use('/', express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({
    origin: 'http://127.0.0.1:5500',
    credentials: true // Allow credentials to be included
}));

// Routs
app.use('/users', userControllers);
app.use('/departments', departmentControllers);
app.use('/employees', employeeControllers);
app.use('/shifts', shiftControllers);
app.use('/login', loginControllers);
app.use('/authusers', useAppControllers);

app.listen(port, () => {
    console.log(`app is listening at http://localhost:${port}`);
})