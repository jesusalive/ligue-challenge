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
- 1 - Clone the project
- 2 - Install the dependencies with ```npm install``` or ```yarn```
- 3 - Wake up the application with ```docker-compose up -d```

*To run all tests type ```npm run test:unit``` or ```yarn test:unit``` (the docker service "test_database" must be active)

## API endpoints

```
GET /developers
```
Return all developers

```
GET /developers/{page}
```
Return developers with according to the querystring params (example: ?name=any_name) and pagination

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
