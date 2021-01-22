## Ligue Challenge
CRUD made with NodeJS/Typescript. API using Clean Architecture concepts and Unit tests.


## Especification
Database (developer table) with following structure:

```
name: varchar
sex: 'H' | 'M'
age: integer
hobby: varchar
birthday: date
```

## How to use
1. Clone the project
2. Install the dependencies with ```npm install``` or ```yarn```
3. Wake up the application with ```docker-compose up -d```
4. Access all endpoints on localhost:3000 or change the port in .env file (PORT variable)

*To run all tests type ```npm run test:unit``` or ```yarn test:unit``` (the docker service "test_database" must be active)

## API endpoints

```
GET /developers
```
Return all developers

```
GET /developers/{page}
```
Return developers according to the querystring params (example: ?name=any_name) and pagination

```
GET /developer/{id}
```
Return one developer

```
POST /developers
```
Add a new developer

```
PUT /developers/{id}
```
Update a developer data

```
DELETE /developers/{id}
```
Remove a developer

## About the structure
The application have some layers.
The 'Domain' layer contains the core. Entities, interfaces of repositories and usecases etc.
The 'Application' layer contains mainly the controllers and some protocols.
The 'Data' layer contains mainly the usecase implementations and some protocols.
The 'Infrastructure' layer contains mainly the repositories implementations and have access to external libs.
The 'Validation' layer contains the validators used on controllers.
The 'Main' layer is where the magic happens. Layer responsible for mount all controllers, routes, and init application.
