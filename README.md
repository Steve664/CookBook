# CookBook

## Description

This project is a recipe management app so that uses a React frontend and Rails
backend together.

## ERD

![Alt Text]("https://github.com/Steve664/CookBook/blob/main/ERD.png")

## Requirements

- Ruby 2.7.4
- NodeJS (v16), and npm
- Render account
- Postgresql

## Setup

- Install Ruby (version 3.0.2) and Rails (version 7.0.4) on your machine.
- Clone this repository to your local machine.
- Run `bundle install` to install the required gems.
- Run `rails db:create` to create the database.
- Run `rails db:migrate` to run the database migrations.
- Run `rails db:seed` to load the database with dummy data.

## Usage

- Open your terminal
- To use the application, start the Rails server by running `rails server`.
- Then navigate to the client folder and run `npm start` this will lauch the react front-end

## Routes

<p>The following routes are available:</p>

- GET `/users/:name`: retrieves a user by their name parameter
- POST `/users`: creates a new user
- PATCH `/users/:name`: updates an existing user by their name parameter
- DELETE `/users/:name`: deletes a user by their name parameter
- GET `/recipes`: retrieves all recipes
- POST `/recipes`: creates a new recipe
- GET `/recipes/:id`: retrieves a recipe by its id parameter
- PATCH `/recipes/:id`: updates an existing recipe by its id parameter
- DELETE `/recipes/:id`: deletes a recipe by its id parameter
- POST `/recipes/:id/reviews`: creates a new review for a recipe by its id parameter
- GET `/recipes/:id/review`: retrieves all reviews for a recipe by its id parameter
- GET `/auth/verify_token`: verifies an authentication token
- POST `/auth/login`: logs in a user with their credentials
- GET `/*a`: handles all other requests (returns a 404 not found error)

## End-Point Usage

- POST `/recipes/:id`

```json
{
  "title": "Shrimp update",
  "image": "https://a.cdn-hotels.com/gdcs/production0/d1513/35c1c89e-408c-4449-9abe-f109068f40c0.jpg?impolicy=fcrop&w=800&h=533&q=medium",
  "description": "A delicious pasta dish with shrimp and garlic",
  "instructions": "Cook pasta according to package directions. Saute garlic and shrimp in olive oil. Add to pasta and enjoy!"
}
```

- PATCH `/recipes/:id`

```JSON
{

        "title": "Shrimp update",
        "image": "https://a.cdn-hotels.com/gdcs/production0/d1513/35c1c89e-408c-4449-9abe-f109068f40c0.jpg?impolicy=fcrop&w=800&h=533&q=medium",
        "description": "A delicious pasta dish with shrimp and garlic",
        "instructions": "Cook pasta according to package directions. Saute garlic and shrimp in olive oil. Add to pasta and enjoy!"
}
```

- POST `/auth/login`

```JSON
{
    "email": "jane@example.com",
    "password": "password123"

}
```

- POST `/recipes/:id/reviews`

```JSON
{
    "rating": 4,
    "content": "it was amazing"

}
```

- POST `/users`

```JSON
{
    "name":"jane",
    "email": "jane@example.com",
    "password": "password123"

}
```

## Author Info

<ul>
 -<a href="https://github.com/Steve664?tab=repositories">Github</a>
</ul>

## License

The application is available as open source under the terms of the MIT License.
