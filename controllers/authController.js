const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Users } = require('../models/users');
module.exports = class AuthController {
	signUp = async (req, res) => {
		const { body } = req;
		try {
			const hashedPassword = await bcrypt.hash(body.password, 10);
			await Users.create({
				email: body.email,
				password: hashedPassword,
			});
			res.status(201).send({
				message: 'User Created Successfully',
			});
		} catch (error) {
			res.send(400).json(error);
		}
	};

	login = async (req, res, next) => {
		const user = await Users.findOne({
			email: req.body.email,
		});
		console.log('users', user);
		try {
			const foundMatch = await bcrypt.compare(req.body.password, user.password);
			const accessToken = jwt.sign(
				JSON.stringify(user),
				process.env.TOKEN_SECRET
			);

			if (!user) {
				res.status(404).json({
					message: 'User does not exsit',
				});
				return;
			}
			if (foundMatch) {
				res.json({ accessToken, user });
			} else {
				res.json({ message: 'Provided credentials are invalid' });
			}
			res.status(200).send({
				token: 'hellooaodifa;ldaoldfakfdaldfada',
			});
		} catch (error) {
			res.status(400).json({ error });
		}
	};
};
