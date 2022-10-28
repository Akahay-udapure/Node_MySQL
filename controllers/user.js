const db = require('../models');
const User = db.user;
const Otp = db.otp;
const Contact = db.contact;
const mail = require('../config/mail');
const randomstring = require("randomstring");


exports.register = async (req, res) => {
    try {
        let user = await User.create(req.body);
        res.json({ status: 200, message: "User Registerd Success!", data: user });
    } catch (error) {
        if (error.parent.code == "ER_DUP_ENTRY")
            res.json({ status: 400, message: "User Already Exist!" })
        else
            res.json({ status: 400, message: "Error!", error: error })
    }
}

exports.login = async (req, res) => {
    try {
        let userData = await User.findOne({ email: req.body.email });
        if (userData.password == req.body.password)
            res.json({ status: 200, message: "User Login Success!", data: userData })
        else
            res.json({ status: 400, message: "Incorrect Password!" })

    } catch (error) {
        console.log(error);
        res.json({ status: 400, message: "Error!", error: error })
    }
}

exports.findAll = async (req, res) => {
    try {
        let user = await User.findAll();
        if (user)
            res.json({ status: 200, message: "User Found Successfully!", data: user });
        else
            res.json({ status: 400, message: "Error!", error: error });

    } catch (error) {
        res.json({ status: 400, message: "Error!", error: error });
    }
}

exports.changePassword = async (req, res) => {
    try {
        let user = await User.update({ paasword: req.body.password }, { where: { id: req.params.userId } });
        if (user)
            res.json({ status: 200, message: "password change successfully!", data: user });
        else
            res.json({ status: 400, message: "Unable to change password!", error: error });

    } catch (error) {
        res.json({ status: 400, message: "Error!", error: error });
    }
}

exports.forgotPassword = async (req, res) => {
    try {
        let otp = await randomstring.generate({
            length: 6,
            charset: 'numeric'
        });
        let user = await User.findOne({ where: { email: req.body.email } });
        if (user) {
            var mailOptions = {
                from: process.env.EMAIL,
                to: req.body.email,
                subject: 'Please do not share OTP with anyone',
                text: otp
            };
            await mail.transporter.sendMail(mailOptions, async (error, result) => {
                if (error)
                    res.json({ status: 400, message: 'Unbale to Send OTP', });
                else
                    await Otp.create({ otp: otp, user_id: user.id });
                res.json({ status: 200, message: "Otp send on email" })
            })
        } else {
            res.json({ status: 400, message: 'User is not registered', });
        }
    } catch (error) {
        res.json({ status: 400, message: "Error!", error: error });
    }
}

exports.verifyOTP = async (req, res) => {
    try {
        let match = await Otp.findOne({
            where: { otp: req.body.otp, user_id: req.body.userId }
        });
        if (match) {
            res.json({ status: 200, message: 'Otp verified Successfully' });
        } else {
            res.json({ status: 400, message: 'Invalid Otp' });
        }
    } catch (error) {
        res.json({ status: 400, message: "Unable to verify" });
    }
}

exports.findOne = async (req, res) => {
    try {
        let user = await User.findOne({
            include:Contact,
            where: { id: req.query.userId}
        });
        if (user) {
            res.json({ status: 200, message: "User Found Success!", data: user });
        } else {
            res.json({ status: 400, message: "Unable to found!" });
        }
    } catch (error) {
        res.json({ status: 400, message: "Error", error: error });
    }
}
