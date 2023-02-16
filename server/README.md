# WTA-REST

## Setup

- Download and install Node.js from https://nodejs.org/en/
- Download and install MongoDB from https://www.mongodb.com/try/download/community
- Install local node packages using `npm i express mongoose` and `npm i --save-dev dotenv nodemon`
- Configure database URL as `DATABASE_URL=mongodb://127.0.0.1/library` in the `.env` config (Note that you must use 127.0.0.1 as localhost does not work since NodeJS v17.x)

## Run development server

Run `npm run devStart` in your terminal to start the dev server. The application will automatically reload if you change any of the source files.
