const express = require("express");
const { requireAuth } = require("../middleware/jwt-auth");
const wordService = require("./word-service");
const LanguageService = require("../language/language-service");
const jsonParser = express.json();

const wordRouter = express.Router();

wordRouter.use(requireAuth).use(async (req, res, next) => {
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
wordRouter.route("/").post(jsonParser, async (req, res, next) => {
  const { original, translation } = req.body;
  //get the current head of the list
  const newWord = {
    original,
    translation,
  };
  for (const [key, value] of Object.entries(newWord)) {
    if (value == null) {
      return res.status(400).json({
        error: { message: `Missing '${key}' in request body` },
      });
    }
  }
  newWord.language_id = req.language.id;
  //set the next property of the new word to the id of the old head.
  newWord.next = req.language.head;
  const word = await wordService.insertWord(req.app.get('db'), newWord)
  //set the new head of the language
  await LanguageService.setHead(req.language.id, word.id)
  return res.status(201).location(path.posix.join(req.originalUrl, `/${word.id}`).json(word))
 
});

module.exports = wordRouter;