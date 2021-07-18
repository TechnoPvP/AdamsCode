const router = require('express').Router();
const email = require('../../utils/EmailUtil');

router.post('/solar', async (req, res) => {
	if (typeof req.body.data != 'string' || !req.body) return res.send('Please submit a correct value');

	const data = JSON.parse(req.body.data);
	console.log(data);
	let htmlString = '';

	for (const key in data) {
		htmlString = htmlString.concat(`<b> ${key} </b>: ${data[key]} <br/> `);
	}
	console.log(htmlString);
	email().sendMail('adam@webrevived.com', 'New Form Submission', htmlString);
	res.redirect('http://invirogen.com/solar.html');
});

router.post('/test', (req, res) => {
	res.redirect('http://invirogen.com/solar.html');
});

module.exports = router;
