// Validation
const Joi = require('joi');

// Register Validation
const registerValidation = (data) => {
	const schema = Joi.object({
		username : Joi.string().min(3).required(),
		email    : Joi.string().min(6).required().email(),
		password : Joi.string().min(6)
	});

	return schema.validate(data);
};

const loginValidation = (data) => {
	const schema = Joi.object({
		email    : Joi.string().min(6).required().email(),
		password : Joi.string().min(6)
	});

	return schema.validate(data);
};

const commentValidation = (data) => {
	const schema = Joi.object({
		username : Joi.string().required(),
		body     : Joi.string().min(3).required(),
		likes    : Joi.array()
	});

	return schema.validate(data);
};

const test = (data) => {
	const schema = Joi.object({
		username : Joi.string().required()
	});

	return schema.validate(data);
};

module.exports = {
	commentValidation,
	registerValidation,
	loginValidation,
	test
};
