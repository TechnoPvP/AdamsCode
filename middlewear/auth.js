/**
 * Class to handle all authentcation related middlewear
 * @author Adam Ghowiba 
*/

const auth = (req, res, next) => {
	if (!req.session.user) return res.redirect('/login');

	next();
};

module.exports.auth = auth;
