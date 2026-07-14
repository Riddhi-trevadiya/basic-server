# Basic HTTP Server

A simple REST API built using Node.js and the built-in **HTTP** module without using Express or any external frameworks.

## Features

* Basic HTTP server
* Route handling
* GET all users
* GET user by ID
* Create a new user (POST)
* Update an existing user (PUT)
* Delete a user (DELETE)
* JSON request and response handling
* Proper HTTP status codes
* Reusable helper functions
* Modular route handlers

## Technologies

* Node.js
* HTTP Module (built-in)

## API Endpoints

| Method | Endpoint     | Description             |
| ------ | ------------ | ----------------------- |
| GET    | `/`          | Home route              |
| GET    | `/about`     | About route             |
| GET    | `/users`     | Get all users           |
| GET    | `/users/:id` | Get a user by ID        |
| POST   | `/users`     | Create a new user       |
| PUT    | `/users/:id` | Update an existing user |
| DELETE | `/users/:id` | Delete a user           |

## Run the Project

```bash
npm install
node index.js
```

The server starts on:

```text
http://localhost:3000
```

## Learning Goals

* Understand the Node.js HTTP module
* Learn how HTTP requests and responses work
* Implement manual routing
* Work with HTTP methods (GET, POST, PUT, DELETE)
* Parse request bodies
* Handle route parameters
* Return JSON responses and HTTP status codes
* Build a REST API without Express
* Refactor code using helper functions and route handlers

## Future Improvements

* Persist data using a database
* Add request validation
* Handle invalid JSON gracefully
* Split routes into separate files
* Rebuild the project using Express.js
