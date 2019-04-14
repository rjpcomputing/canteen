module.exports =
{
	server:
	{
		host: "localhost",
		port: process.env.PORT || 8080
	},
	firebase:
	{
		apiKey: "AIzaSyDno25_gIAnJWJoM7oK-QCcM2w_zfFvXPs",
		authDomain: "canteen-13d35.firebaseapp.com",
		databaseURL: "https://canteen-13d35.firebaseio.com",
		projectId: "canteen-13d35",
		storageBucket: "canteen-13d35.appspot.com",
		messagingSenderId: "835685886186"
	},
	database:
	{
		host: process.env.DATABASE_HOST || "tapawingo-canteen.com",
		database: process.env.DATABASE || "canteen_sandbox",
		port: 5432,
		user: "canteen",
		password: "c4nt33n1",
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
