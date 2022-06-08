const User = require('../modals/user.modal')
const asyncWrapper = require('../middleware/async')
const dotenv = require('dotenv')
const bcrypt = require('bcrypt')
const { generateAccessToken, generateRefreshToken } = require('../middleware/generateToken')


const signUp = asyncWrapper(async (req, res) => {
    try {
        console.log(req.body, 'request')
        const { name, username, age, password, subscription } = req.body
        // const checkUser = await User.findOne({ username: username })
        // if (typeof checkUser != null) {
        // res.status(404).json({ msg: `username ${req.body.username} is already exist` })
        // } else {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        const create = {};
        create.name = name;
        create.age = age;
        create.username = username;
        create.password = hashedPassword;
        // create.subscription = subscription
        const createUser = await User.create(create)
        res.status(201).json(createUser);
        // }
    } catch (err) {
        console.log(err.message)
        res.status(500).json({ msg: err.message || 'error in sign-up' })
    };
});

const signIn = asyncWrapper(async (req, res) => {
    try {
        const username = req.body.username;
        const password = req.body.password;
        const user = { name: username }
        const findUser = await User.findOne({ username: username }).exec()
            .then((result) => {
                bcrypt.compare(password, result.password).then((match) => {
                    if (match) {
                        const accessToken = generateAccessToken(user)
                        const refreshToken = generateRefreshToken(user)
                        res.status(201).json({ id: result._id, access_token: accessToken, refresh_token: refreshToken })
                    }
                })
            })
    } catch (err) {
        console.log(err, 'err')
        res.status(500).json({ msg: err.message || "error in signin" })
    }
})

const getAllUser = asyncWrapper(async (req, res) => {
    try {
        const findAllUsers = await User.find({}).populate('subscription');
        res.status(201).json(findAllUsers)
    } catch (err) {
        res.status(500).json({ msg: err || 'error in getAllusers' })
    }
})

const getUser = asyncWrapper(async (req, res) => {
    try {
        const { charCode } = req.params
        User.findOne({ charCode: charCode }).populate('subscription').exec(function (err, result) {
            if (err) {
                console.log(err)
            }
            res.status(201).json(result)
        })
        // res.status(201).json(findUser)
    } catch (err) {
        res.status(500).json({ msg: err.message || 'error in find user' })
    }
})

const updateSubscriptionInUser = asyncWrapper(async (req, res) => {
    try {
        const { charCode } = req.params;
        const { subscription } = req.body;
        const updateUser = await User.findOneAndUpdate({ charCode: charCode }, { $set: { subscription: subscription } }).populate('subscription')
        console.log(updateUser, 'updateUser')
        res.status(201).json(updateUser)
    } catch (err) {
        res.status(500).json({ msg: err.message || 'error in update subscription of user' })
    }
})

module.exports = {
    signUp,
    signIn,
    getAllUser,
    getUser,
    updateSubscriptionInUser
}