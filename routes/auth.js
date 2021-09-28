const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const bcrypt = require("bcrypt");
const crypto = require("crypto")
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/keys");
const requireLogin = require("../middleware/requireLogin");
const nodemailer = require("nodemailer")
const sendgridTransport = require("nodemailer-sendgrid-transport")
const {EMAIL}=require("../config/keys")

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "gupta.shikha8357@gmail.com",
        pass: "Gauri04042000"
    }
}
)
// const data = {
//     // to: user.email,
//     // from: "shikha1911038@akgec.ac.in",
//     // subject: "signup success",
//     // html: "<h1>Welcome to instagram</h1>"
// }
// const transporter=nodemailer.createTransport(sendgridTransport({
//     auth:{
//         api_key:""
//     }
// }))
router.get("/protected", requireLogin, (req, res) => {
    res.send("hello user");
})
router.post("/signup", (req, res) => {
    const { name, email, password, pic } = req.body
    if (!name || !password || !email) {
        return res.status(422).json({ error: "please add all the details." })
    }
    // res.status(200).json({message:"saved successfully"});
    User.findOne({ email: email })
        .then((savedUser) => {
            if (savedUser) {
                return res.status(422).json({ error: "user already exists with that email" })
            }
            bcrypt.hash(password, 12)
                .then(hashedpassword => {
                    const user = new User({
                        email, name, password: hashedpassword, pic
                    })
                    user.save()
                        .then(user => {
                            transporter.sendMail({
                                from: "no-reply@insta.com",
                                to: user.email,
                                subject: "signup success",
                                html: "<h1>Welcome to instagram</h1>"
                            }, (err, response) => {

                                if (err) {
                                    console.log(err)
                                } else {
                                    console.log("email sent")
                                }
                            })
                            res.json({ message: "saved successfully " })
                        }).catch(err => {
                            console.log(err)
                        })
                })

        }).catch(err => {
            console.log(err)
        })
})
router.post("/login", (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        res.status(422).json({ error: "please provide emails or password" })
    }
    User.findOne({ email: email })
        .then((savedUser) => {
            if (!savedUser) {
                return res.status(422).json({ error: "Invalid emails or password" })
            }
            bcrypt.compare(password, savedUser.password)
                .then(doMatch => {
                    if (doMatch) {
                        // res.status(200).json({message:"successfully signedin"})
                        const token = jwt.sign({ _id: savedUser._id }, JWT_SECRET)
                        const { _id, name, email, followers, following, pic } = savedUser
                        res.json({ token, user: { _id, name, email, followers, following, pic } })
                    }
                    else {
                        res.status(422).json({ error: "Invalid email or password" })
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        })

})

router.post("/reset-password", (req, res) => {
    crypto.randomBytes(32, (err, buffer) => {
        if (err) {
            console.log(err)
        }
        const token = buffer.toString("hex")
        User.findOne({ email: req.body.email })
            .then(user => {
                if (!user) {
                    return res.status(422).json({ error: "user dont exist" })
                }
                user.resetToken = token
                user.expireToken = Date.now() + 3600
                user.save().then((result) => {
                    transporter.sendMail({
                        to: user.email,
                        from: "no-reply@insta.com",
                        subject: "password reset",
                        html: `<p>You are requested to rest the password</p>
                 <h5>click in this <a href="${EMAIL}/reset/${token}">link </a>to reset the password</h5>`
                    })
                    res.json({ message: "check your email" })
                })
            })
    })
})

router.post("/new-password", (req, res) => {
    const newPassword = req.body.password
    const sentToken = req.body.token
    User.findOne({ resetToken: sentToken, expireToken: { $gt: Date.now() } })
        .then(user => {
            if (!user) {
                return res.status(422).json({ error: "Try again session get expired." })
            }
            bcrypt.hash(newPassword, 12).then(hashedpassword => {
                user.password =hashedpassword
                user.resetToken = undefined
                user.expireToken = undefined
                user.save().then((savedUser) => {
                    res.json({ message: "password updated success" })
                })

            })
        })
        .catch(err => {
            console.log(err)
        })
})
module.exports = router;