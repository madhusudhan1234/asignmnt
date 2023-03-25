# Setup instructions

- Clone this repository

## For Backend API
- Go to the `asignment/assignment-node-api-backend`
- Run `yarn` to install dependencies
- Create `.env` file inside `asignment/assignment-node-api-backend`
- Add required database credentials for e.g.

```
APP_PORT = 3000

DB_HOST = "127.0.0.1"
DB_PORT = 5432
DB_USERNAME = "postgres"
DB_PASSWORD = "postgres"
DB_DATABASE = "imagesdb"
```
- Once db connection successful run `yarn migration:run`
- Finally run `yarn dev` it should open in port 3000

## For Frontend API
- Go to the asignmnt/assignment-react-frontend
- create `.env.local` file and add following
```
REACT_APP_API_ENDPOINT=http://localhost:3000
```
- Run `yarn`
- `yarn start` will open the frontend application
