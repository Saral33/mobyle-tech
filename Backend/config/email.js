const sgMail = require('@sendgrid/mail');
require('dotenv').config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY)


const activateAccountToken = (email,id,token)=>{
    sgMail.send({
        to: email,
        from: process.env.MY_EMAIL,
        subject:'Activate your account',
        html:
        `
        <p>Hi, Welcome to MobX. Here is a link to activate your account. Link is valid upto 10 minutes so you gotta hurry</p>
        <a target="_blank"  href=${process.env.BASE_URL}/activate/${id}/${token}> Click here to activate</a>
        <p>If you havenot requested this message, please feel free to ignore.</p>
        `
    })
}

module.exports = {activateAccountToken}

