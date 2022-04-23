const express = require('express');
const { Product } = require('../models/products');

const router = express.Router();

const products = [
	{ title: 'Crocs', price: 300, name: 'Crocs Gen 2' },
	{ title: 'Crocs', price: 300, name: 'Crocs Gen 2' },
];

router.post('/add-product', async (req, res) => {
	res.setHeader('Content-Type', 'application/json');
	console.log('data', req.body);

	try {
		const product = await Product.create({
			title: req.body.title,
			name: req.body.name,
			price: req.body.price,
			picture: req.body.picture,
		});
		res.status(201).json({ message: 'Product added succesfully' });
		console.log('product', product);
	} catch (error) {
		return res.status(400).json(error);
	}

	// console.log('products', products);
});

router.delete('/product/:id', async (req, res) => {
	const { id } = req.params;
	console.log('req params', req.params);

	try {
		const nigga = await Product.findByIdAndDelete(id);
		// console.log('deleted Items', nigga);
		res.status(200).json({ message: 'Product deleted successfully' });
	} catch (error) {
		res.status(400).json({ message: 'Sorry that failed please try again' });

		console.log('error', error);
	}
});

module.exports = { router, products };
