# Spaced repetition API!

Speak-Easy is a language learning application that assists users in learning how to speak multiple foreign languages by using spaced repetition.  The app encourages the user to use their microphone to answer the questions while learning, but also gives the option to type or click on an option.  


As you practice within the app, Speak-Easy keeps track of your current score for each word, and provides feedback after each answer.  To accelerate the learning process, Speak-Easy uses the spaced repetition algorithm, ensuring that you see the more challenging questions more often.  

The spaced repetition algorithm is achieved by structuring the database using a linked list.  

### Tech Stack

React, Node, Express, PostgreSQL, HTML, CSS, JavaScript

### Server

The app is designed to be used with this server: [https://github.com/thinkful-ei-orka/spaced-repetition-api-Carlo-Thomas-Jacob]

### To Use With Server

Please update the API_ENDPOINT in the config.js to point to where your server is running.


## Local dev setup

If using user `dunder-mifflin`:

```bash
mv example.env .env
createdb -U dunder-mifflin spaced-repetition
createdb -U dunder-mifflin spaced-repetition-test
```

If your `dunder-mifflin` user has a password be sure to set it in `.env` for all appropriate fields. Or if using a different user, update appropriately.

```bash
npm install
npm run migrate
env MIGRATION_DB_NAME=spaced-repetition-test npm run migrate
```

And `npm test` should work at this point

## Configuring Postgres

For tests involving time to run properly, configure your Postgres database to run in the UTC timezone.

1. Locate the `postgresql.conf` file for your Postgres installation.
   1. E.g. for an OS X, Homebrew install: `/usr/local/var/postgres/postgresql.conf`
   2. E.g. on Windows, _maybe_: `C:\Program Files\PostgreSQL\11.2\data\postgresql.conf`
   3. E.g  on Ubuntu 18.04 probably: '/etc/postgresql/10/main/postgresql.conf'
2. Find the `timezone` line and set it to `UTC`:

```conf
# - Locale and Formatting -

datestyle = 'iso, mdy'
#intervalstyle = 'postgres'
timezone = 'UTC'
#timezone_abbreviations = 'Default'     # Select the set of available time zone
```

## Scripts

Start the application `npm start`

Start nodemon for the application `npm run dev`

Run the tests mode `npm test`

Run the migrations up `npm run migrate`

Run the migrations down `npm run migrate -- 0`
