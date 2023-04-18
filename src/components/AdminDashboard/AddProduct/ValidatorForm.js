

const validator = (input) => {
	const errors = {};
	if (!input.name) {
		errors.name = 'Please enter a name';
	}
 	 if (input.price < 1) {
		errors.price = 'Please enter a price';
	}
	if (!input.trademark) {
		errors.trademark = 'Please select a trademark';
	}
	
	if (!input.category) {
		errors.category = 'Please select a category';

	if (!input.stock) {
		errors.stock = 'Please enter a stock';
	}
	}
	if (!input.description) {
		errors.description = 'Please enter a product description';
	}
//   if (!input.imageurl) {
// 		errors.imageurl = <span color="red">Please enter a url image</span>
// 	}
	return errors;
};

export default validator;