
# Speak-Easy

Speak-Easy is a language learning application that assists users in learning how to speak multiple foreign languages by using spaced repetition.  The app encourages the user to use their microphone to answer the questions while learning, but also gives the option to type or click on an option.  

As you practice within the app, Speak-Easy keeps track of your current score for each word, and provides feedback after each answer.  To accelerate the learning process, Speak-Easy uses the spaced repetition algorithm, ensuring that you see the more challenging questions more often.  

The spaced repetition algorithm is achieved by structuring the database using a linked list. 

### Usage
Base Url: _to update__/api
| Endpoint    | Method | Description                                                                                           |
| ----------- | ------- | ----------------------------------------------------------------------------------------------------- |
| /auth/token       | post     | Takes user name and password, checks for account,returns auth token                    |
| /auth/refresh       | put     | Takes user name, returns new auth token                    |
| /user/       | post     | Takes registration info, then creates a new account|
| /user/listlanguages       | get     | Returns a list of all unique languages in the database                    |
| /language/       | get     | Gets all words for language associated with user, returns an object                    |
| /language/head       | get     | Returns the head of the linked list of words for the user                    |
| /language/guess       | post     | Takes a guess in the request body, checks the guess, then sends a summary of the user's guess as an object.                    |

### POST `/auth/token`
Parameters:  
{  
&nbsp;&nbsp;&nbsp;&nbsp;"user_name":"Irma-JuniorSale",  
&nbsp;&nbsp;&nbsp;&nbsp;"password":"P947fheh(*"  
}  
**user_name** *string*  
**password** *string*   

Returns:   
{  
&nbsp;&nbsp;&nbsp;&nbsp;"authToken":   
}  

### PUT `/auth/refresh`
Parameters:  
none  

Returns:   
{  
&nbsp;&nbsp;&nbsp;&nbsp;"authToken": ___  
}  

### POST `/users`
Parameters:  
{  
&nbsp;&nbsp;&nbsp;&nbsp;"name":"Irma",  
&nbsp;&nbsp;&nbsp;&nbsp;"user_name":"Irma-JuniorSale",  
&nbsp;&nbsp;&nbsp;&nbsp;"password":"P947fheh(*",  
&nbsp;&nbsp;&nbsp;&nbsp;"language":"French",  
 
}  
**name** *string*  
**username** *string*  
**password** *string* Must be between 8 and 72 characters, must include one upper case, one lower case, one number and one special character  
**language** *string*  

  
Returns:   
{  
&nbsp;&nbsp;&nbsp;&nbsp; User as an object.   
}

### GET `/users/listlanguages`
Parameters:  
None

Returns:   
{  
&nbsp;&nbsp;&nbsp;&nbsp; List of unique languages as an array of objects.   
}

### GET `/language`
Parameters:  
None  
  
Returns:   
{     
&nbsp;&nbsp;&nbsp;&nbsp;"language":[  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"id": "54"  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"name": "French"  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"total_score": "412",    
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"user_id": "7",  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"head": "54",   
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;} 
&nbsp;&nbsp;&nbsp;&nbsp;],
  &nbsp;&nbsp;&nbsp;&nbsp;"words":[  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"id": "54"  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"original": "bonjour"  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"translation": "hello",    
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"memory_value": "1",  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"correct_count": "1",  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"incorrect_count": "3",  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"language_id": "54",  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"next": "55",   
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;},
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"id": "55"  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"original": "mujer"  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"translation": "woman",    
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"memory_value": "2",  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"correct_count": "3",  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"incorrect_count": "3",  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"language_id": "54",  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"next": "null",   
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}, 
&nbsp;&nbsp;&nbsp;&nbsp;],
}  


### GET /language/head 
Parameters:
None

Returns: 

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"id": "54"  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"original": "bonjour"  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"translation": "hello",    
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"memory_value": "1",  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"correct_count": "1",  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"incorrect_count": "3",  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"language_id": "54",  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"next": "55",   
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}

### POST /language/guess

Parameters: 
{  
&nbsp;&nbsp;&nbsp;&nbsp; "guess": "my guess"   
}

**guess** *string*   

Returns: 

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"nextWord": "55"  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"totalScore": "44"  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"wordCorrectCount": "3",    
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"wordIncorrectCount": "3",  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"answer": "hello",  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"isCorrect": "false",  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;} 

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
