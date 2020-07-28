const express = require("express");
const LanguageService = require("./language-service");
const { requireAuth } = require("../middleware/jwt-auth");
const jsonParser = express.json();

const languageRouter = express.Router();

/*
  count = 0;
  currNode = head of list
  while count !== M
  currNode = currNode.next;
  count++;

  function updateWordDB(boolean, M = 1)  


*/
languageRouter.use(requireAuth).use(async (req, res, next) => {
  try {
    const language = await LanguageService.getUsersLanguage(
      req.app.get("db"),
      req.user.id
    );

    if (!language)
      return res.status(404).json({
        error: `You don't have any languages`,
      });

    req.language = language;
    next();
  } catch (error) {
    next(error);
  }
});

languageRouter.get("/", async (req, res, next) => {
  try {
    const words = await LanguageService.getLanguageWords(
      req.app.get("db"),
      req.language.id
    );

    res.json({
      language: req.language,
      words,
    });
    next();
  } catch (error) {
    next(error);
  }
});

languageRouter.get("/head", async (req, res, next) => {
  // implement me
  res.send("implement me!");
});

languageRouter.post("/guess", jsonParser, (req, res, next) => {
  console.log('Here is your guess', req.body.guess);
  const { guess } = req.body;
  let currHead = null;
  let correctCount, incorrectCount = null;
  let currWordUpdate = {};
  let guessWordUpdate = {};
  let count = 0;
  let M = 1;
  let currWord, nextWord = null;
  LanguageService.getFirstWord(req.app.get('db')).then(head => {
    currHead = head;
    console.log('head', head);
    let { correct_count, incorrect_count } = head;
    correctCount = correct_count;
    incorrectCount = incorrect_count;
    currWord = head;
    nextWord = currWord.next;
    if (guess.toLowerCase() === head.translation.toLowerCase()) {
      //answer is correct
      //double memory value for word.memory_value
      M = head.memory_value * 2;
      correct_count++;
    } else {
      incorrect_count++;
    }
  })
  .then(() => LanguageService.setHead(req.app.get('db'), currHead.language_id, currHead.next))
  .then(() => {
    
    while (count < M) {
      //update the last word to point to the guessed word. 
      console.log(count);
      if (nextWord === null) {
        count++;
      } else {
        currWord = LanguageService.getWord(
          req.app.get("db"),
          currWord.next
        ).then(() => {
          nextWord = currWord.next;  
        })
        count++;
      }
    }
    let updateCurrWord = {
      next: currHead.id,
    };
    currWordUpdate = updateCurrWord;
    let updateGuessWord = {
      correct_count: correctCount,
      incorrect_count: incorrectCount,
      memory_value: M,
      next: nextWord,
    };
    guessWordUpdate = updateGuessWord
    LanguageService.setWord(req.app.get("db"), currWord.id, currWordUpdate)
  })
  .then(() => {
    console.log('running line 110');
    LanguageService.setWord(req.app.get("db"), currHead.id, guessWordUpdate)
  })
  .then(() => {
    LanguageService.getWord(req.app.get("db", currHead.id))
  })
  .then((word) => {
    return res.json(LanguageService.serializeWord(word));
  })
  .catch(next)

  //move the value in the linked list respective to M
  
    
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
  // implement me
  //if true do stuff
  //change head
  //move previous head to the new position relative to M.
  //Set M node. to the previous head's next.
  //Set nodes' next to the M node's old next.

  //else do other stuff
  res.send("implement me!");
});

module.exports = languageRouter;
