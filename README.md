# PROjECT 6: API REST
## _thePower - Desarrollo Full Stack_

## Description
This has been my second backend development project, created to meet the criteria required by the training school in order to obtain the backend developer degree. It also serves as a way to practice and demonstrate my knowledge and skills in user permission management, middleware usage, token creation and handling, as well as encryption of sensitive data such as passwords.


## Project Requirements
- Server using Express  
- Connection to a Mongo Atlas database using Mongoose  
- Creation of three models, one of them being the users model  
- A seed script to populate one of the collections with data  
- Two relationships between collections; the idea is that users also have related data  
- Full CRUD for all collections  
- Two user roles with different permissions  
- README with project documentation, listing the endpoints and what each one does  
- Users can only be created with the "user" role  
- The first admin will be created by changing their role directly in the database  
- Admins can update a normal user to change their role to admin  
- Admins can delete users, but a user can also delete themselves  
- There is a middleware that checks the token provided in the request to allow access or show an error message  


## Tech

Tech stack list for this project
- Node.js
- Express
- Mongoose
- MongoDB
- DotEnv
- Nodemon
- Bcrypt
- JsonWebToken

## Installation

This project requires [Node.js](https://nodejs.org/) v20.10+ to run.

Install the dependencies and devDependencies and start the server.

```sh
cd [project folder name]
npm i
npm run dev
```

## Endpoints
#### _USERS_

| HTTP Method | Route                         | Description                        | Parameters/Body (Example)                                                                 |
|-------------|-------------------------------|------------------------------------|-------------------------------------------------------------------------------------------|
| `POST`      | `/api/v1/users/register`      | Register a new user                | `{ "email": "marta@marta.com", "password": "marta123", "houses": ["<houseId>"] }`         |
| `POST`      | `/api/v1/users/login`         | Login user and get JWT token       | `{ "email": "marta@marta.com", "password": "marta123" }`                                  |
| `GET`       | `/api/v1/users`               | Get all users                      | -                                                                                         |
| `GET`       | `/api/v1/users/:id`           | Get user by ID                     | `:id` (e.g., `"507f1f77bcf86cd799439011"`)                                                 |
| `POST`      | `/api/v1/users`               | Create user (admin only)           | `{ "email": "juan@juan.com", "password": "juan123", "houses": ["<houseId>"], "rol": "admin" }` |
| `PUT`       | `/api/v1/users/:id`           | Update user (admin only)           | `:id` + Body (e.g., `{ "houses": ["<houseId>"], "rol": "user" }`)                         |
| `DELETE`    | `/api/v1/users/:id`           | Delete user (admin or self)        | `:id` (User ID) (Requires JWT token)                                                      |


#### _HOUSES_

| HTTP Method | Route                  | Description             | Parameters/Body (Example)                                               |
|-------------|------------------------|-------------------------|--------------------------------------------------------------------------|
| `GET`       | `/api/v1/house`        | Get all houses          | -                                                                        |
| `GET`       | `/api/v1/house/:id`    | Get house by ID         | `:id` (e.g., `"507f1f77bcf86cd799439011"`)                               |
| `POST`      | `/api/v1/house`        | Create a new house      | `{ "number": 12, "size": 85, "neighborhood": "<neighborhoodId>" }`       |
| `PUT`       | `/api/v1/house/:id`    | Update a house          | `:id` + Body (e.g., `{ "size": 90 }`)                                    |
| `DELETE`    | `/api/v1/house/:id`    | Delete a house          | `:id` (House ID)                                                         |


#### _NEIGHBORHOODS_

| HTTP Method | Route                         | Description                | Parameters/Body (Example)                                                                 |
|-------------|-------------------------------|----------------------------|-------------------------------------------------------------------------------------------|
| `GET`       | `/api/v1/Neighborhoods`       | Get all neighborhoods      | -                                                                                         |
| `GET`       | `/api/v1/Neighborhoods/:id`   | Get neighborhood by ID     | `:id` (e.g., `"658a1f77bcf86cd799439012"`)                                                 |
| `POST`      | `/api/v1/Neighborhoods`       | Create a new neighborhood  | `{ "name": "Gràcia", "country": "España", "city": "Barcelona", "code": "08012", "house": ["<houseId>"] }` |
| `PUT`       | `/api/v1/Neighborhoods/:id`   | Update a neighborhood      | `:id` + Body (e.g., `{ "city": "Barcelona" }`)                                             |
| `DELETE`    | `/api/v1/Neighborhoods/:id`   | Delete a neighborhood      | `:id` (Neighborhood ID)                                                                   |



---
---
---
