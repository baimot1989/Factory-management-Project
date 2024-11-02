const userActionsLogRepo = require('../repositories/userActionsLogRepo');
const usersDbRepo = require('../repositories/usersDbRepo')
const { getDate } = require('../utils/utils')

const logAction = async (id, urlRequest) => {
    console.log(`user Id: ${id} URL: ${urlRequest}`)
 
   //  If the path matches one of url skip the whole process
    switch (urlRequest) {
        case 'http://localhost:3000/users':

            return
        case 'http://localhost:3000/authusers/home':
            return
        case 'http://localhost:3000/authusers/users':
            return
        default:
    }

// if(urlRequest){
//     return
// }
    let currentAction;
    
    const user = await usersDbRepo.getUserById(id)
    const actionLog = await userActionsLogRepo.getActionLog();
    const date = getDate();
    const maxActions = user.numOfAction;

    // the userActionLogByDate return array of all action taken on the courent day
    const userActionLogByDate = actionLog.actions.filter(item => item.id === id && item.date === date);

    const lowestActionAllowed = userActionLogByDate.reduce((min, action) => {
        return action.actionAllowd < min ? action.actionAllowd : min;
    }, Infinity);

    // indicate that user has no more action allowed
    if (lowestActionAllowed === 0) {
        return 0
    }


    if (lowestActionAllowed < 10) {
        currentAction = {
            id,
            maxActions,
            date,
            actionAllowd: lowestActionAllowed - 1
        }
    } else {
        console.log(lowestActionAllowed)
        currentAction = {
            id,
            maxActions,
            date,
            actionAllowd: maxActions - 1
        }
    }


    actionLog.actions.push(currentAction)

    userActionsLogRepo.writeAction(actionLog)
    return
};




module.exports = { logAction };