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
    // implement me -- We haven't :(((((
    const head = await LanguageService.getFirstWord(req.app.get('db'), 1);

    req.language.total_score
    res.status(200).json({
      ...LanguageService.serializeWord(head),
      totalScore: req.language.total_score
    });
  })

languageRouter
  .post('/guess', jsonParser, async (req, res, next) => {
    // implement me -- WE DID!
    let { guess } = req.body;
    let tempTotalScore = req.language.total_score;
    let head = await LanguageService.getFirstWord(req.app.get('db'), 1);
    let newHead = await LanguageService.getWord(req.app.get('db'), head.next);
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
      tempTotalScore++;
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

    await LanguageService.setTotalScore(req.app.get('db'), head.language_id, tempTotalScore);
    //let language = await LanguageService.getUsersLanguage(req.app.get('db'), req.user.id)

    let summary = {
      nextWord: newHead.original,
      totalScore: tempTotalScore,
      wordCorrectCount: newHead.correct_count,
      wordIncorrectCount: newHead.incorrect_count,
      answer: head.translation,
      isCorrect: isCorrectGuess
    }
    res.json(summary)
  })

module.exports = languageRouter
