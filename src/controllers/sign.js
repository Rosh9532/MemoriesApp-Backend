const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const generateJwtToken = (_id, email) => {
    return jwt.sign({ _id, email }, process.env.SECRET_KEY, {
        expiresIn: "1d"
    });
}

exports.signup = (req, res) => {
    User.findOne({ email: req.body.email })
        .exec(async (err, user) => {
            if (user) {
                return res.status(400).json({
                    error: "User Already Registered"
                })
            }
            else {
                const { username, email, password } = req.body;
                const hash_password = await bcrypt.hash(password, 10);
                const user = new User({
                    displayName: username,
                    email,
                    hash_password
                });
                user.save((error, _user) => {
                    if (error) {
                        res.status(200).json({ error })
                    }
                    if (_user) {
                        const token = generateJwtToken(_user._id, _user.email);
                        const { _id, displayName, email } = _user;
                        return res.status(200).json({
                            token,
                            user: { _id, displayName, email }
                        });
                    }
                });
            }

        });
}

exports.login = (req, res) => {
    User.findOne({ email: req.body.email })
        .exec(async (error, user) => {
            if (error) {
                return res.status(400).json({
                    error
                });
            }
            if (user) {
                const isPassword = await user.authenticate(req.body.password)
                if (isPassword) {
                    const token = generateJwtToken(user._id, user.email);
                    const { _id, displayName, email } = user;
                    res.status(200).json({
                        token,
                        user: { _id, displayName, email },
                    });
                }
                else{
                    return res.status(400).json({
                        message: "Incorrect password"
                    });
                
                }
            } else {
                return res.status(400).json({
                    message: "User doesn't exists"
                });
            }
            


        })
}

exports.signout=(req,res)=>{
    res.clearCookie('token');
    res.status(200).json({message:"Signout Successfully..!"})
}