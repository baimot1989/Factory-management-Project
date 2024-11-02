const jwt = require('jsonwebtoken');
const userActionsLogService = require('../services/userActionsLogService')
const userActionsLogRepo = require('../repositories/userActionsLogRepo')

// this authentication function is for client pages 
const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    const urlRequest = `${req.protocol}://${req.get('host')}${req.originalUrl}`; 
    if (token) {
        jwt.verify(token, 'secretkey', async (error, decodedToken) => {
            if (error) {
                res.redirect('/login');
            } else {
                let actionAllowd = null;
                const usersActionLog = await userActionsLogRepo.getActionLog();
                const action = usersActionLog.actions.find(item => item.id === decodedToken.id && item.actionAllowd === 0);
                if (action) { // Checks if there is a value
                    actionAllowd = action.actionAllowd;
                }
                if (actionAllowd === 0) { // this if block checks if user is allowed to login base on is current action allowed , if he reach to the number limit he can't login
                    res.cookie('jwt','',{httpOnly: true, maxAge: '1', secure: false, sameSite: 'Lax'})
                    res.redirect('/login?message=ActionLimitReached');
                } else {
                    // the logAction function is checking the statuse of user current action allowed if he reach to the number limit he will loged out of the system
                    const numberActionLimtChecke = await userActionsLogService.logAction(decodedToken.id, urlRequest);

                    if (numberActionLimtChecke === 0) {
                        console.log('user need log out')
                        res.cookie('jwt','',{httpOnly: true, maxAge: '1', secure: false, sameSite: 'Lax'})
                        res.redirect('/login?message=ActionLimitReached');
                    } else {
                        next();

                    }
                }


            }
        })
    } else {
        res.redirect('/login');
    }
}

// this authentication is for api request  from the database
const requireAuth2 = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, 'secretkey', (error, decodedToken) => {
            if (error) {
                res.json(error.message);
            } else {
                next();
            }
        })
    } else {
        res.json('Request rejected, you need to register')
    }
}

module.exports = { requireAuth, requireAuth2 };