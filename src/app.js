const Express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const passport = require("passport");
const session = require("express-session");
const path = require("path");

// Session
const SQLiteStore = require("connect-sqlite3")(session);

// Initialize API
const app = Express();

// Dotenv config
dotenv.config();

// MONGODB Connedtion
const db_uri = process.env.DATABASE_URL;
mongoose.connect(db_uri);
const database = mongoose.connection;

// Check connection
database.on("error", (error) => console.log(error));
database.once("connected", () => console.log("Databse connected!"));

// Import routes
const routes = require("./routes");
const { handleError } = require("./helpers/error");

// Middleware
// Using cors to disable cross origin resource sharing
app.use(
	cors({
		origin: true,
		credentials: true,
	}),
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(Express.static(path.join(__dirname + "/public")));
app.use(
	session({
		secret: "keyboard cat",
		resave: false,
		saveUninitialized: false,
		store: new SQLiteStore(),
	}),
);
app.use(passport.authenticate("session"));

// Routes
app.use("/api", routes);

// Error handling middleware
app.use((error, req, res, next) => {
	console.log(error);
	handleError(error, res);
});

module.exports = app;
