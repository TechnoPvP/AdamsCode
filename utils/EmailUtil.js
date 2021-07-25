const nodemailer = require('nodemailer');
const path = require('path');
const Email = require('email-templates');
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

// Setup email-template for
const email = new Email({
	message   : {
		from : 'adamware99@hotmail.com'
	},
	transport : {
		jsonTransport : true
	},
	views     : {
		options : {
			extension : 'ejs'
		}
	}
});

const testData = {
	first                   : 'adam',
	last                    : 'ghowiba',
	phone                   : '407-924-6902',
	email                   : 'adamware99@hotmail.com',
	property_address        : '1020 Waverly Dr. Longwood Fl, 32714',
	billing_address         : '1020 Property Adddress',
	electric_bill           : 190,
	own_property            : true,
	property_type           : 'commerical',
	additional_improvements : true,
	refrenceId              : '1241412',
	terms_agreed            : true
};

const sendMail = async function({ to, subject, html }) {
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

/**
 * attachments: {
 * filename:
 * path: __dirname
 * cid: 'randomvalue"
 * } 
 */
const sendMailWithAttachment = async function({ to, subject, htmlString, file }, callback) {
	try {
		await transporter.sendMail({
			from        : '<adamware99@hotmail.com>', // sender address
			to, // list of receivers
			attachments : {
				filename : file.filename,
				path     : path.join(process.cwd(), file.path),
				cid      : 'unique@webrevived.com'
			},
			subject, // Subject line
			html        : htmlString // plain text body
		});
	} catch (err) {
		if (err) return callback(err);

		callback(`Email sent to ${to}`);
	}
};

async function sendSolarMail({ to, subject, data, file }, callback) {
	const htmlString = await email.render('stripo/html', {
		data : data
	});
	if (file) {
		sendMailWithAttachment({ to, subject, htmlString, file }, (result) => callback(result));
		console.log('sent with attachment');
	} else {
		console.log('Sent without attachment');
		sendMail({ to, subject, html: htmlString });
	}
}

// sendSolarMail(
// 	{
// 		to           : 'adam@webrevived.com',
// 		subject      : 'Testing Template With Data',
// 		data         : testData,
// 		electricBill : { file: { filename: 'WR_post', path: 'uploads/WR_post.jpg' } }
// 	},
// 	(result) => {
// 		console.log(result);
// 	}
// );

module.exports = { sendMail, sendMailWithAttachment, sendSolarMail };
