const express = require('express')
const LanguageService = require('./language-service')
const { requireAuth } = require('../middleware/jwt-auth')
const jsonParser = express.json();

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
    // implement me
    res.send('implement me!')
  })

languageRouter
  .post('/guess', jsonParser, async (req, res, next) => {
    // implement me
    let { guess } = req.body;
    let head = await LanguageService.getFirstWord(req.app.get('db'));
    console.log('head', head);
    let correctCount = head.correct_count;
    let incorrectCount = head.incorrect_count;
    let currWord = head;
    let nextWord = currWord.next;
    let M = 1;
    let count = 0;
    if(!guess) {
      return res.status(400).json({
        error: "Missing 'guess' in request body"
      })
    }
    if(guess.toLowerCase() === head.translation.toLowerCase()) {
      M = head.memory_value * 2;
      correctCount++;
    } else {
      incorrectCount;
    }
    while (count < M ) {
      console.log('next word', nextWord);
      if (nextWord === null) {
        count++;
      } else {
        console.log('currword.next', currWord.next);
        currWord = await LanguageService.getWord(req.app.get('db'), currWord.next);
        console.log('currWord', currWord);
        nextWord = currWord.next;
        console.log('next word after await function', currWord.next, nextWord);
        console.log('one other thing', typeof(currWord.next));
        count++;
      }
    }
    let updateCurrWord = {
      next: head.id,
    }
    let updateGuessWord = {
        correct_count: correctCount,
        incorrect_count: incorrectCount,
        memory_value: M,
        next: nextWord,
    };
    await LanguageService.setHead(req.app.get('db'), head.language_id, head.next)
    await LanguageService.setWord(req.app.get('db'), currWord.id, updateCurrWord);
    await LanguageService.setWord(req.app.get('db'), head.id, updateGuessWord);
    
  })

module.exports = languageRouter
