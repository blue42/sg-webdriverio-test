class Checkout {	
	get testUrl() { return ("./UD70355B.html"); } //dirt devil product URL

	get guest() { return $("button[name*='_login_unregistered']"); } //Guest Checkout button
	get activeBreadcrumb() { return $(".checkout-progress-indicator .active"); } //Active breadcrumb selector
	get registeredAddress() { return $("#dwfrm_singleshipping_addressList"); } //Saved address drop-down for registered users
	get addAddress() { return $("#dwfrm_singleshipping_shippingAddress > fieldset:nth-child(3) > div.form-row.label-inline.form-indent > label"); }
	get useForBilling() { return $(".checkbox-label"); } //Checkbox to use address info for billing
	get continueToBilling() { return $("button[name*='_singleshipping_shippingAddress_']"); } //CTA on step 1
	get addressModal() { return $("body > div.ui-dialog.ui-widget.ui-widget-content.ui-corner-all.ui-front.ui-dialog-buttons.ui-draggable"); }
	get modalButton() { return $("body > div.ui-dialog.ui-widget.ui-widget-content.ui-corner-all.ui-front.ui-dialog-buttons.ui-draggable > div.ui-dialog-buttonpane.ui-widget-content.ui-helper-clearfix > div > button:nth-child(2)"); }
	get billingEmail() { return $("#dwfrm_billing_billingAddress_email_emailAddress"); }
	get continueToPlaceOrder() { return $("button[name*='_billing_save']"); } //CTA on step 2
	get placeOrder() { return $("button[name='submit']"); } //CTA on step 3
	get orderConfDetails() { return $(".order-confirmation-details"); } //page body on order confirmation page
	get successText() { return $(".confirmation-message h1"); } //Success header on order confirmation page
	
	//Customer data for fillShippingForm function below
	get firstName() { return $("#dwfrm_singleshipping_shippingAddress_addressFields_firstName"); }
	get lastName() { return $("#dwfrm_singleshipping_shippingAddress_addressFields_lastName"); }
	get address() { return $("#dwfrm_singleshipping_shippingAddress_addressFields_address1"); }
	get city() { return $("#dwfrm_singleshipping_shippingAddress_addressFields_city"); }
	get zip() { return $("#dwfrm_singleshipping_shippingAddress_addressFields_postal"); }
	get state() { return $("#dwfrm_singleshipping_shippingAddress_addressFields_states_state"); }
	get phone() { return $("#dwfrm_singleshipping_shippingAddress_addressFields_phone"); }

	//Payment info for fillPaymentMethod function below
	get cardName() { return $("#dwfrm_billing_paymentMethods_creditCard_owner"); }
	get cardNumber() { return $("input[name*='dwfrm_billing_paymentMethods_creditCard_number_']"); }
	get cardType() { return $("#dwfrm_billing_paymentMethods_creditCard_type"); }
	get expMonth() { return $("#dwfrm_billing_paymentMethods_creditCard_expiration_month"); }
	get expYear() { return $("#dwfrm_billing_paymentMethods_creditCard_expiration_year"); }
	get cvn() { return $("input[name*='dwfrm_billing_paymentMethods_creditCard_cvn_']"); }

	fillShippingForm() {
		this.firstName.setValue("Billy");
		this.lastName.setValue("Carson");
		this.address.setValue("123 Test St");
		this.city.setValue("Charleston");
		this.zip.setValue("29403");
		this.state.selectByValue("SC");
		this.phone.setValue("3333333333");
	}

	fillPaymentMethod() {
		this.cardName.setValue("Test");
		this.cardNumber.setValue("4111111111111111");
		this.expMonth.selectByValue("4");
		this.expYear.selectByValue("2022");
		this.cvn.setValue("123");
	}

	selectAddress() {
		if(this.continueToBilling.isEnabled()) {
			this.continueToBilling.click();
		} else {
			if(this.registeredAddress.isVisibleWithinViewport()) {
				this.registeredAddress.selectByIndex(1);
				this.continueToBilling.waitForEnabled();
				this.continueToBilling.click();
			}
			this.fillShippingForm();
			this.useForBilling.click();
			this.continueToBilling.waitForEnabled();
			this.continueToBilling.click();
		}
	}
}

module.exports = new Checkout();
