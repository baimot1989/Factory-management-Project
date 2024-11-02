const jwt = require('jsonwebtoken');


const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({ id }, 'secretkey', {
        expiresIn: maxAge
    })
};

const getDate = () => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0'); 
    const month = String(today.getMonth() + 1).padStart(2, '0'); 
    const year = today.getFullYear();

    const date = `${day}/${month}/${year}`;
    return date
};

module.exports = { getDate, createToken }