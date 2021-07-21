const router = require('express').Router();
const email = require('../../utils/EmailUtil');

router.post('/solar', (req, res) => {
	if (!req.body) return res.send(400, "Submission can't be empty");

	const data = req.body;
	console.log(data);
	let htmlString = '';

	for (const key in data) {
		htmlString = htmlString.concat(`<b> ${key} </b>: ${data[key]} <br/> `);
	}
	email().sendMail('adam@webrevived.com, technogaming99@gmail.com', 'New Form Submission', htmlString);
	res.json({ status: 200, message: 'Success' });
});

router.post('/test', (req, res) => {
	res.redirect('http://invirogen.com/solar.html');
});

module.exports = router;
