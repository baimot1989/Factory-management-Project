const User = require('../modelCollection/usersModel');

const getAllUser = () => {
    return User.find();
  };
const getUserById = (id) => {
    return User.findById(id);
  };
const getUserByEmail = (name) => {
    return User.findOne({fullName:name});
  };

const addUser = (obj) => {
    const user = new User(obj);
    return user.save()
}

module.exports = {
    getAllUser, addUser, getUserById, getUserByEmail
}

