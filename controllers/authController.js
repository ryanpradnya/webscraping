const { validationResult } = require('express-validator/check');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const config = require('../util/config');

exports.signup = async (req, res, next) => {
    const errors = validationResult(req);

    try {
        if (!errors.isEmpty()) {
            const error = new Error('Signup failed');
            error.statusCode = 422;
            error.data = errors.array();
            throw error;
        }
        const email = req.body.email;
        const password = req.body.password;
        const mobilePhone = req.body.mobilePhone;
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        const hashedPw = await bcrypt.hashSync(password, 12);

        const user = new User({
            email: email,
            password: hashedPw,
            mobilePhone: mobilePhone,
            firstName: firstName,
            lastName: lastName,
        });

        const result = await user.save();
        res.status(201).json({ message: 'User created!', user: result });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.signin = async (req, res, next) => {
    const errors = validationResult(req);

    try {
        if (!errors.isEmpty()) {
            const error = new Error('Signin failed');
            error.statusCode = 422;
            error.data = errors.array();
            throw error;
        }

        const email = req.body.email;
        const password = req.body.password;

        const user = await User.findOne({ email: email });
        if (!user) {
            const error = new Error('Email not found');
            error.statusCode = 401;
            throw error;
        }
        const passrowdIsValid = await bcrypt.compareSync(password, user.password);
        if (!passrowdIsValid) {
            const error = new Error('Wrong passord!');
            error.statusCode = 401;
            throw error;
        }

        const token = jwt.sign(
            {
                email: user.email,
                userId: user._id.toString()
            }, config.jwtSecret,
            { expiresIn: 86400 }
        );
        res.status(200).json({ message: 'Signin success', token: token, user: user })

    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};