#Codeworks solo project.

####A website for buying and selling aftermarket mechanical keyboards.

## Server Setup

Glone the repo anywhere on your computer. Change directory into the server folder
and run
```
npm i
```

The project requires environment variables to function, which will be loaded into the config.js file located
in server/src.

Below is an example .env file, which should be located in server/src.

```
PORT=3000
HOST=databaseHostName
DBUSER= sql database user name
DBPASS= sql database user password
DATABASE = name of the database (e.g. sailboard)
DIALECT = sequelize configuration (mysql or postgres)
ACCESS_TOKEN_SECRET = a secret and secure random string for generating JWTs
EMAIL_ACCOUNT = email name for sending mail from nodemailer (optional oAuth setup)
EMAIL_PASSORD = email account password for nodemailer
```

Once the environment variables have been properly configured, simply run
```
npm start
```
to launch the server.

## Client setup

Change directory into the client folder and run
```
npm i
```

After installation is complete, simply run
```
npm start
```
to build the react client locally.


