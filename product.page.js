class Product {
	get btn() { return $("#add-to-cart"); }
	get checkoutBtn() { return $(".mini-cart-link-checkout"); }
}

module.exports = new Product();