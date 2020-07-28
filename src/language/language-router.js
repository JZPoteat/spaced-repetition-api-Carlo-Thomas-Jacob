const express = require('express')
const LanguageService = require('./language-service')
const { requireAuth } = require('../middleware/jwt-auth')

const languageRouter = express.Router()

languageRouter
  .use(requireAuth)
  .use(async (req, res, next) => {
    try {
      const language = await LanguageService.getUsersLanguage(
        req.app.get('db'),
        req.user.id,
      )

      if (!language)
        return res.status(404).json({
          error: `You don't have any languages`,
        })

      req.language = language
      next()
    } catch (error) {
      next(error)
    }
  })

languageRouter
  .get('/', async (req, res, next) => {
    try {
      const words = await LanguageService.getLanguageWords(
        req.app.get('db'),
        req.language.id,
      )

      res.json({
        language: req.language,
        words,
      })
      next()
    } catch (error) {
      next(error)
    }
  })

languageRouter
  .get('/head', async (req, res, next) => {
    try {
      const word = await LanguageService.getFirstWord(req.app.get('db'))
      res.json({ word })
      next()
    } catch (error) {
      next(error)
    }
  })

languageRouter
  .post('/guess', async (req, res, next) => {
    /*
    wordcol = 'word col from database'

    wordguess = 'inputted word'
    if (word is correct)
      number-correct + 1
      mem-value * 2
    else
      mem-value = 1

    while(loop)
      let curWord = getWord(wordcol.next)
      i++
      if i = mem-value
        nextWord = getWord(curWord.next)
        curWord.next = wordCol.id
        setWord(database, curWord)
        setWordNext(database, curWord.id, curWord.next)
        getWord.next = nextWord.id
        setWord(database, wordCol)
        loop = false
      if curWord.next = null
        curWord.next = wordCol.id
        wordCol.next = null
        loop = false

    insert value (database, mem-value)      
    }
    */
  })

module.exports = languageRouter
