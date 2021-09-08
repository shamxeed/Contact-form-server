const nodemailer = require('nodemailer');
const mailGun = require('nodemailer-mailgun-transport');


const auth = {
    auth: {
        api_key: process.env.MAILGUN_API_KEY,
        domain: process.env.MAIL_DOMAIN
    }
};


const transporter = nodemailer.createTransport(mailGun(auth));

const sendMail = (name, email, message, callBack) => {
    const output = `<p>You have a new contact request</p>

                        <h3>Contact Details</h3>
                            <ul>
                                <li>Name: ${name}</li>
                                <li>Email: ${email}</li>
                            </ul>
                        
                        <h3>Message</h3>
                        <p>${message}</p>

    `
    const mailOptions = {
        from: email,
        to: process.env.MY_EMAIL,
        subject: `New Message from ${name}`,
        html: output
    };
    
    transporter.sendMail(mailOptions, (err, data) => {

        if(err) {
            console.log(err)
        } else { 
            console.log(data) 
        }

        callBack(err, data)

    })

}


module.exports = sendMail;