const xss = require('xss');
const wordService = {
    insertWord(knex, newWord) {
        return knex
            .into('word')
            .insert(newWord)
            .returning('*')
            .then(rows => {
                return rows[0];
            });
    }
};

module.exports = wordService;