const accountSid = process.env.ACCOUNT_SID||"ACf95e5bdf769e471bae2fe33cd9a6a2bd";
const authToken = process.env.AUTH_TOKEN||"7fef4353d9496e5c313530aeadd08359";
const client = require('twilio')(accountSid, authToken);
const dotenv = require('dotenv');
dotenv.config();
module.exports.home_get = function (req, res) {
    const id = process.env.ACCOUNT_SSID
    res.send('welcome to express')
    console.log(id)
}
module.exports.send_sms = async (req, res) => {
    try {
        await client.messages
            .create({ from: '+18126165105', body: 'Hello Zucci', to: '+2349067580896' })
            .then(message => console.log(message.sid))
            .catch(err => console.log(err))
            .done(res.status(200).json({
                message: 'SMS sent successfully to +234 906 758 0896'
            }));
    } catch (error) {
        console.log(error)
    }
}