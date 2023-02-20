const User = require("../model/User");
const validationService = require("../services/validationService");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");



async function getByEmail(email) {
    return await User.findOne({
        email,
    });
}


async function getById(id) {
    return await User.findById(id);
}


async function signup(email, password) {
    user = new User({ email, password });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();
    return user;
}


async function verifyPassword(user, password) {
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return null;
    
    return user;
}


async function updatePassword(id, password) {
  const salt = await bcrypt.genSalt(10);
  await User.updateOne({ _id: id }, { password: await bcrypt.hash(password, salt) });
  return getById(id)
}

module.exports = { verifyPassword, signup, updatePassword, getByEmail, getById };
