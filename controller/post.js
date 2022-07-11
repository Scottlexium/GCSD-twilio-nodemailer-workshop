const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const User = require('../models/users');
dotenv.config();
module.exports.home_get = function (req, res) {
    const id = process.env.ACCOUNT_SSID
    res.send('welcome to express')
    console.log(id)
}
module.exports.send_sms = async (req, res) => {
    const phone_number = req.body.phone_number;
    const token = req.headers.token;
    console.log(token)
    if (token != "1234567890") {
        console.log("invalid token")
        return res.status(404).json({
            message: `invalid token not authorised`,
        })
    }
    console.log("valid token")
    return;
    // random number generator
    const random_number = Math.floor(Math.random() * 1000000);
    try {
        const SMS = await client.messages
            .create({ from: '+18126165105', body: `this is your otp code keep secret ${random_number}`, to: phone_number })
            .then(message => console.log(message.sid))
            .catch(err => console.log(err))
            .done(res.status(200).json({
                message: `SMS sent successfully to ${phone_number}`,
                otp: random_number
            }));
    } catch (error) {
        console.log(error)
    }
}
module.exports.voice_send = async (req, res) => {
    const phone_number = req.body.phone_number;
    // random number generator
    const random_number = Math.floor(Math.random() * 1000000);
    try {
        client.calls
            .create({
                url: 'http://demo.twilio.com/docs/voice.xml',
                to: phone_number,
                from: '+18126165105'
            }).then(message => console.log(message.sid))
            .catch((error) => {
                res.status(404).json({
                    message: `an error occured => ${error}`,
                })
            })
            .done(res.status(200).json({
                message: ` successfully to ${phone_number}`,
                otp: random_number
            }));
    } catch (error) {
        res.status(404).json({
            message: `an error occured => ${error}`,
        })
        console.log(error)
    }
}

module.exports.login = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username: username });
    if (!user) {
        User.create({
            username,
            password,
        })
        return res.status(200).json({
            message: `user ${username} created successfully`,
        })
    }
    const validuser = await User.findOne({ username: username })
    if (validuser.password !== password) {
        return res.status(200).json({
            message: `invalid password`,
        })
    }
    // loop through todo and add indexing to each todo
    const todo = await User.findOne({ username: username })
    const todo_list = todo.todo
    const todo_list_with_index = todo_list.map((todo, index) => {
        return {
            index: index+"*:"+todo
        }
    });
    console.log(todo_list_with_index)
    if(todo_list_with_index.length === 0){
        return res.status(200).json({
            message: `no todo found but user exists and its ${username}`,
        })
    }
    const userstodo = user.todo;
    return res.status(200).json({
        message: `user ${username} logged in successfully`,
        USERS_TODO:userstodo,
        todo_length: userstodo.length
    })
}
// add todo
module.exports.add_todo = async (req, res) => {
    const { username, todo } = req.body;
    const user = await User.findOne({ username: username });
    if (!user) {
        return res.status(404).json({
            message: `user ${username} not found`,
        })
    }
    const new_todo = await User.findOneAndUpdate({ username: username }, { $push: { todo: todo } }, { new: true })
    return res.status(200).json({
        message: `todo ${todo} added successfully`,
        new_todo
    })
}
