const nodemailer = require('nodemailer');
require('dotenv').config();

// async..await is not allowed in global scope, must use a wrapper
const transporter = nodemailer.createTransport({
	host   : 'smtp-mail.outlook.com',
	port   : 587,
	secure : false, // true for 465, false for other ports
	auth   : {
		user : process.env.EMAIL, // generated ethereal user
		pass : process.env.EMAIL_PASSWORD // generated ethereal password
	}
});

function mail() {
	const sendMail = async function(to, subject, html) {
		try {
			await transporter.sendMail({
				from    : '<adamware99@hotmail.com>', // sender address
				to, // list of receivers
				subject, // Subject line
				html    : html // plain text body
			});
		} catch (err) {
			console.log(err);
		}

		console.log(`Email sent to ${to}`);
	};
	return {
		sendMail
	};
}

module.exports = mail;
