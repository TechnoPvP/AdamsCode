const router = require('express').Router();
const { sendMail, sendMailWithAttachment, sendSolarMail } = require('../../utils/EmailUtil');
const uploadUtils = require('../../utils/UploadUtils');
const multer = require('multer');
const path = require('path');
const { resolveNs } = require('dns');
const request = require('request');

 function updateClient(postData){
            var clientServerOptions = {
                uri: 'https://flow.zoho.com/756047114/flow/webhook/incoming?zapikey=1001.f6d9f8ddd1967e286adfa2277ddfb9a5.29f4609985e48160bba7d1b8755e7b8d&isdebug=true',
                body: JSON.stringify(postData),
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            request(clientServerOptions, function (error, response) {
                console.log(error, response.body);
                return;
            });
        }


router.post('/verify', (req, res) => {
	updateClient(req.body);
	res.redirect('http://invirogen/thankyou.html');
});

router.post('/solar', uploadUtils.upload.single('bill_photo'), (req, res) => {
	const error = false;

	res.status(200).send('Success, email was sent.');

	sendSolarMail(
		{
			to      : 'adam@webrevived.com, solar@invirogen.com',
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
	// if (err instanceof multer.MulterError) {
	// 	//A multer error occuers
	// 	res.status(400).send(err);
	// } else if (err) {
	// 	res.status(400).send('Unknown ' + err);
	// }

	// console.log(path.join(__dirname, req.file.path));
});

router.get('/test', (req, res) => {});

module.exports = router;
