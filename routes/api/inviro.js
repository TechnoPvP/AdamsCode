const router = require('express').Router();
const email = require('../../utils/EmailUtil');

router.post('/solar', async (req, res) => {
	if (typeof req.body.data != 'string' || !req.body) return res.send('Please submit a correct value');

	const data = JSON.parse(req.body.data);
	let htmlString = '';

	data.forEach((e) => {
		htmlString = htmlString.concat(`<b> ${e.name} </b>: ${e.value} <br/> `);
	});
	await email().sendMail('adam@webrevived.com', 'New Form Submission', '<h1> Hi Again </h1>');
	res.redirect('http://invirogen.com/solar');
});

module.exports = router;
