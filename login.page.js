var header = require('./header.page.js');

class Login{
	get userName() { return $(".username input"); }
	get password() { return $(".password input"); }
	get loginBtn() { return $("button[name*='_login_login']"); } //Login button used on checkout and my account pages, not one used in header

	
	signIn() {
		this.userName.setValue("test@test.com");
		this.password.setValue("pass4test");
	}

	signOut() {
		header.myAccountIcon.click();
		header.logoutBtn.waitForVisible();
		header.logoutBtn.click();
	}

	accountLogin() {
		header.myAccountIcon.click();
		header.headerLoginBtn.waitForVisible();
		header.headerLoginBtn.click();

		this.loginBtn.waitForVisible();
		this.signIn();
		this.loginBtn.click();
	}
}

module.exports = new Login();
