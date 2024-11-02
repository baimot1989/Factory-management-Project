const userWsRepo = require('../repositories/userWsRepo');
const usersDbRepo = require('../repositories/usersDbRepo');
const { getDate } = require('../utils/utils');
const logFile = require('../repositories/userActionsLogRepo');
const { createToken } = require('../utils/utils');
const { isEmail } = require('validator');


// The "fileUsersPlaceholder" is for initialization of the users Collection
// const fileUsersPlaceholder = async () => {
//     const { data: users } = await userWsRepo.getUserWs();
//     users.forEach(item => {
//         const user = {
//             fullName: item.name,
//             numOfAction: 10
            
//         }
//          usersDbRepo.addUser(user);
//     });
    
//     return 

// };

const getAllUsers = async () => {

    const users = await usersDbRepo.getAllUser();
    const logActionFile = await logFile.getActionLog();
    const date = getDate();

    // creating new array of user with data from Data base and current action allowed from json file
    const newUsers = users.map(element => {
        let lowestActionAllowed = null
        // the userActionLogByDate return array of all action taken on the courent day
        const userActionLogByDate = logActionFile.actions.filter(item => item.id === element._id.toString() && item.date === date);
        // chcke if the array is empty,  if it  is the if block code is skiped
        if (userActionLogByDate.length) { // return the lowest action taken by the user
            lowestActionAllowed = userActionLogByDate.reduce((min, action) => {

                return action.actionAllowd < min ? action.actionAllowd : min;
            }, Infinity);
        }
        // check if the lowestActionAllowed value is true or is equal to 0
        if (lowestActionAllowed || lowestActionAllowed === 0) {
            return {
                id: element._id,
                fullName: element.fullName,
                numOfAction: element.numOfAction,
                currentActionsAllowed: lowestActionAllowed
            }

        } else {
            return {
                id: element._id,
                fullName: element.fullName,
                numOfAction: element.numOfAction,
                currentActionsAllowed: element.numOfAction
            }
        }
    });

    return newUsers;
};
const getUserById = (id) => {
    return usersDbRepo.getUserById(id);
};

const addUser = async (obj) => {
    const resulte = await usersDbRepo.addUser(obj);
    return resulte;

};
const loginUser = async (name, email) => {

    const { data: users } = await userWsRepo.getUserWs();

    if (!isEmail(email)) {
        throw new Error('Please enter a valid email');
    }

    const user = users.find(user => user.email === email && user.name === name);
     console.log(typeof(user))
    if (user) {
        const result = await usersDbRepo.getUserByEmail(name);
        if (!result) {
            throw new Error('User not found');
        }
        const token = createToken(result._id);
      
        return token;
    } else {
        throw new Error('User not found');
    }

    
}

module.exports = { addUser, getAllUsers, getUserById, loginUser };