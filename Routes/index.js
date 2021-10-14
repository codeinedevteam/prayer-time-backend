const { debug } = require('../config');
const express = require('express');
const router = express.Router();



router.use('/Foods', require('./Foods'));
router.use('/auth', require('./auth'));
router.use('/firebase',require('./firebase'))





// router.all('*', async (req, res, next) => {
// 	try {
// 		let err = new Error('not found');
// 		err.status = 404;
// 		throw err;
// 	} catch (err) {
// 		next(err);
// 	}
// });

router.use((err, req, res, next) => {
	const code = err.status || 500;
	const message = err.message || '';
	const stack = err.stack;

	if (debug) {
		res.status(code).send({message})
	} else {
	}
});

module.exports = router;
