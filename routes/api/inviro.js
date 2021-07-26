const router = require('express').Router();
const { sendMail, sendMailWithAttachment, sendSolarMail } = require('../../utils/EmailUtil');
const uploadUtils = require('../../utils/UploadUtils');
const multer = require('multer');
const path = require('path');
const { resolveNs } = require('dns');

// router.post('/solar', (req, res) => {
// 	if (!req.body) return res.send(400, "Submission can't be empty");

// 	const data = req.body;
// 	console.log(data);
// 	let htmlString = '';

// 	for (const key in data) {
// 		htmlString = htmlString.concat(`<b> ${key} </b>: ${data[key]} <br/> `);
// 	}
// 	sendMail('adam@webrevived.com, solar@invirogen.com', 'New Form Submission', htmlString);
// 	res.json({ status: 200, message: 'Success' });
// });

router.post('/solar', (req, res) => {
	const error = false;
	const upload = uploadUtils.upload.single('bill_photo');

	upload(req, res, function(err) {
		if (err instanceof multer.MulterError) {
			//A multer error occuers
			res.status(400).send(err);
		} else if (err) {
			res.status(400).send('Unknown ' + err);
			return;
		}

		sendSolarMail(
			{
				to      : 'adam@webrevived.com',
				subject : 'New Solar Quote Request',
				data    : req.body,
				file    : req.file ? req.file : null
			},
			(err) => {
				if (err) {
					error = true;
					return res.send(err);
				}
			}
		);
	});

	if (!error) res.status(200).send('Sucess, email was sent.');
	// console.log(path.join(__dirname, req.file.path));
});

router.get('/test', (req, res) => {});

module.exports = router;
