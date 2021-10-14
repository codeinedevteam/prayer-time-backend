const Validator = require('./validator');
const { body, validationResult } = require('express-validator');
class FoodValidator extends Validator {
	handle() {
		return [ body('name').isString(), body('desc', 'min').isLength({ min: 2 })];
	}
}

module.exports = new FoodValidator;
