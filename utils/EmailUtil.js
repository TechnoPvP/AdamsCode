const nodemailer = require('nodemailer');

// async..await is not allowed in global scope, must use a wrapper
const transporter = nodemailer.createTransport({
	host   : 'smtp-mail.outlook.com',
	port   : 587,
	secure : false, // true for 465, false for other ports
	auth   : {
		user : 'adamware99@hotmail.com', // generated ethereal user
		pass : 'Donewithit9958!' // generated ethereal password
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
