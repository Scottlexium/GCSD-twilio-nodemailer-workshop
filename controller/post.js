const accountSid = process.env.ACCOUNT_SID || "ACf95e5bdf769e471bae2fe33cd9a6a2bd";
const authToken = process.env.AUTH_TOKEN || "7fef4353d9496e5c313530aeadd08359";
const client = require('twilio')(accountSid, authToken);
const dotenv = require('dotenv');
dotenv.config();
module.exports.home_get = function (req, res) {
    const id = process.env.ACCOUNT_SSID
    res.send('welcome to express')
    console.log(id)
}
module.exports.send_sms = async (req, res) => {
    const phone_number = req.body.phone_number;
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