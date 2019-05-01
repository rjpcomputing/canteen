module.exports = {
	apps : [{
		name: "canteen",
		script: "server.js",

		// Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
		args: "",
		instances: 1,
		autorestart: true,
		watch: false,
		max_memory_restart: "1G",
		env: {
			NODE_ENV: "development",
			DATABASE_HOST: "localhost",
			DATABASE: "canteen_production"
		}
	}]
};
