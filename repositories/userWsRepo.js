const axios = require('axios');

const url = 'https://jsonplaceholder.typicode.com/users';

const getUserWs = () => {
     return  axios.get(url);
   
}

module.exports = { getUserWs };