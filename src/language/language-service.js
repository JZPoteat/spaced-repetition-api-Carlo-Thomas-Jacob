const Knex = require("knex")
const xss = require('xss')

const LanguageService = {
  getUsersLanguage(db, user_id) {
    return db
      .from('language')
      .select(
        'language.id',
        'language.name',
        'language.user_id',
        'language.head',
        'language.total_score',
      )
      .where('language.user_id', user_id)
      .first()
  },

  getLanguageWords(db, language_id) {
    return db
      .from('word')
      .select(
        'id',
        'language_id',
        'original',
        'translation',
        'next',
        'memory_value',
        'correct_count',
        'incorrect_count',
      )
      .where({ language_id })
  },

  getFirstWord(db, languageId) {
    return db
      .from('word')
      .join('language', 'language.head', 'word.id')
      .where({ 'language.id': languageId })
      .select(
        'word.*'
      )
      .first()
  },

  setWord(db, id, newData) {
    return db('word')
      .where({ id })
      .update(newData)
  },

  getWord(db, id) {
    return db
      .from('word')
      .select('*')
      .where({ id })
      .then(rows => {
        return rows[0];
      })
  },

  setHead(db, languageId, id) {
    return db('language')
      .where({ id: languageId })
      .update({ head: id })
  },

  setTotalScore(db, languageId, totalScore) {
    return db('language')
      .where({ id: languageId })
      .update({ total_score: totalScore })
  },
  // getHead(db, id) {
  //   return db('language')
  //     .select('head')
  //     .where({ head: id })
  //     .then(rows => {
  //       return rows[0]
  //     })
  // },
  serializeWord(word) {
    return {
      id: word.id,
      original: xss(word.original),
      translation: xss(word.translation),
      memory_value: word.memory_value,
      correct_count: word.correct_count,
      incorrect_count: word.incorrect_count,
      language_id: word.language_id,
      next: word.next
    }
  }

}

module.exports = LanguageService
