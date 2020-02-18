var checkout = require('./checkout.page.js');
var product = require('./product.page.js');
var login = require('./login.page.js');
var header = require('./header.page.js');

describe("Checkout", function () {
	var shippingBreadcrumb = 'STEP 1 - Shipping';
	var billingBreadcrumb = 'STEP 2 - Billing';
	var placeOrderBreadcrumb = 'STEP 3 - Place Order';
	var successfullCheckoutTitle = 'THANK YOU FOR YOUR ORDER.';
	var userEmail = "billy.carson@blueacorn.com";

	before( function () {
		//Go to product page and add product to cart
		browser.url(checkout.testUrl);

		product.btn.click(); //adds product to cart

		product.checkoutBtn.waitForExist(); //waits for checkout button to appear in mini cart
		product.checkoutBtn.click(); //clicks checkout CTA in mini cart
	});

	//checkout as guest user
	describe("As guest user", function () {
		it('Should allow a guest user to checkout', function () {
			checkout.guest.click();

			//verify user is on step 1
			expect(checkout.activeBreadcrumb.getText()).to.equal(shippingBreadcrumb);
		});

		//complete step 1 shipping info
		it('should allow a guest user to complete step 1', function () {
			//Fill out shipping info form
			checkout.fillShippingForm();
		});

		it('should redirect to the Billing page', function () {
			checkout.continueToBilling.click();

			//Confirm address is FedEx address modal
			checkout.addressModal.waitForVisible();
			checkout.modalButton.click();

			//verify we're on step 2
			expect(checkout.activeBreadcrumb.getText()).to.equal(billingBreadcrumb);
		});

		//complete step 2 billing info
		it('should allow a guest user to complete step 2', function () {
			//Fill out email address
			checkout.billingEmail.setValue(userEmail);

			//Fill out Payment Information
			checkout.fillPaymentMethod();

			browser.pause(500); //without this, test will fail
		});

		it('should redirect to the Place Order page', function () {
			checkout.continueToPlaceOrder.click();

			//verify we're on step 3
			expect(checkout.activeBreadcrumb.getText()).to.equal(placeOrderBreadcrumb);
		});

		it('should redirect to Order Confirmation page after a successful order submission', function () {
			checkout.placeOrder.click();
			checkout.orderConfDetails.waitForVisible();
			expect(checkout.successText.getText()).to.equal(successfullCheckoutTitle);
		});
	});

	//login to proceed through checkout as a registered user
	describe("As registered user", function () {
		before( function () {
			//Go to product page and add product to cart
			browser.url(checkout.testUrl);

			product.btn.click(); //adds product to cart

			product.checkoutBtn.waitForExist(); //waits for checkout button to appear in mini cart
			product.checkoutBtn.click(); //clicks checkout CTA in mini cart
		});

		after( function () {
			header.logo.click();
			login.signOut();
		});

		it('should allow a registered user to sign in', function () {
			login.signIn();

			login.loginBtn.click();
		});

		//complete step 1 for shipping info
		it('should allow a registered user to complete step 1', function () {
			//verify user is on step 1
			checkout.activeBreadcrumb.waitForVisible();
			expect(checkout.activeBreadcrumb.getText()).to.equal(shippingBreadcrumb);
		});

		it('should redirect to the Billing page', function () {
			checkout.continueToBilling.click();

			//Confirm address is FedEx address modal
			checkout.addressModal.waitForVisible();
			checkout.modalButton.click();

			//verify we're on step 2
			expect(checkout.activeBreadcrumb.getText()).to.equal(billingBreadcrumb);
		});
			
		//complete step 2 for billing info
		it('should allow a registered user to complete step 2', function () {
			checkout.fillPaymentMethod();

			browser.pause(500);
		});

		it('should redirect to the Place Order page', function () {
			checkout.continueToPlaceOrder.click();

			//verify we're on step 3
			expect(checkout.activeBreadcrumb.getText()).to.equal(placeOrderBreadcrumb);
		});

		//complete step 3 and submit order
		it('should redirect to Order Confirmation page after a successful order submission', function () {
			checkout.placeOrder.click();
			checkout.orderConfDetails.waitForVisible();
			expect(checkout.successText.getText()).to.equal(successfullCheckoutTitle);
		});
	});

});