const jFile = require('jsonfile');

const FILE = 'data/userActionLog.json';

const getActionLog = async () => {
    return await jFile.readFile(FILE)
    
}
const writeAction = async (obj) => {
    return await jFile.writeFile(FILE, obj)
    
}


module.exports = { getActionLog, writeAction }