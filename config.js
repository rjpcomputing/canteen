module.exports =
{
	server:
	{
		host: "localhost",
		port: process.env.PORT || 8080
	},
	database:
	{
		host: "",
		port: 1234,
		database: process.env.DATABASE || "hlcloud_sandbox",
		user: "username",
		password: "password",
	},
	key:
	{
		privateKey: "1pz5#Z8U2%Z5$7ileP", // NEVER CHANGE
		saltRounds: 10,
		tokenExpiry: "1 day"
	},
	email:
	{
		username: "sendermailid",
		password: "senderpassword",
		verifyEmailUrl: "verifyEmail",
		resetEmailUrl: "reset"
	}
};