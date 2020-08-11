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

  getLanguages(db) {
    return db
      .from('language')
      .distinct('name')
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
  }, 
  startingWords(language) {
    if(language === 'French') {
      return [
        ['entraine toi', 'practice', 2],
        ['bonjour', 'hello', 3],
        ['maison', 'house', 4],
        ['développeur', 'developer', 5],
        ['traduire', 'translate', 6],
        ['incroyable', 'amazing', 7],
        ['chien', 'dog', 8],
        ['chat', 'cat', null],
      ]
    } else if(language === 'Spanish') {
      return [
        ['mujer', 'woman', 2],
        ['arbol', 'tree', 3],
        ['amor', 'love', 4],
        ['castor', 'beaver', 5],
        ['maiz', 'corn', 6],
        ['espada', 'sword', 7],
        ['fuego', 'fire', 8],
        ['tortuga', 'turtle', 9],
        ['biblioteca', 'library', 10],
        ['comestibles', 'groceries', null]
      ]
    }
  }

}

module.exports = LanguageService
