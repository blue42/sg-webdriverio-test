class Header {
	get myAccountIcon() { return $(".user-icon"); }
	get logo() { return $(".logo-link"); }
	get headerLoginBtn() { return $(".user-login"); }
	get logoutBtn() { return $(".user-logout"); }
}

module.exports = new Header();