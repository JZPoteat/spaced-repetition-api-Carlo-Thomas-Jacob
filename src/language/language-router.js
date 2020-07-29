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
    let newHead = await LanguageService.getWord(req.app.get('db'), head.next);
    
    console.log('current head', head);
    console.log('next head', newHead);

    let isCorrectGuess = false;
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
      isCorrectGuess = true;
      correctCount++;
    } else {

      incorrectCount++;
    }

    while (count < M ) {
      if (nextWord === null) {
        count++;
      } else {
        currWord = await LanguageService.getWord(req.app.get('db'), currWord.next);
        nextWord = currWord.next;
        

        count++;
      }
    }


    console.log('currWord', currWord);
    console.log('nextWord', nextWord);
    
    
    let updateCurrWord = {
      next: head.id,
    }
    let updateGuessWord = {
        correct_count: correctCount,
        incorrect_count: incorrectCount,
        memory_value: M,
        next: nextWord,
    };

    console.log('next head before set head', head.next);
    await LanguageService.setHead(req.app.get('db'), head.language_id, head.next)

    const lang = LanguageService.getHead(req.app.get('db'), head.next)
    console.log(lang);

    await LanguageService.setWord(req.app.get('db'), currWord.id, updateCurrWord);
    await LanguageService.setWord(req.app.get('db'), head.id, updateGuessWord);

    console.log('------------------------')
    let language = await LanguageService.getUsersLanguage(req.app.get('db'), req.user.id)

    let summary = {
      nextWord: newHead.original,
      totalScore: language.total_score,
      wordCorrectCount: newHead.correct_count,
      wordIncorrectCount: newHead.incorrect_count,
      answer: head.translation,
      isCorrect: isCorrectGuess
    }
    res.json(summary)
  })

module.exports = languageRouter
