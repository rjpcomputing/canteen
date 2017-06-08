const express = require( "express" );
const apiRouter = express.Router();
const config = require( "../config" );
const UsersController = require( "../controllers/user" );
// const UsersController = require( "../controllers/user" );

// apiRouter.post( "/user/login",  UsersController.Login );

// -- 

module.exports = apiRouter;
