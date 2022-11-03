const { Router } = require('express');

const resultRoute = require('./resultRoutes');
const quizController = require('../controllers/quizController');
const formDataParsing = require('../middlewares/formDataParsing');
const authMiddleware = require('../middlewares/authorization');

const router = Router();

router.use('/:quizId/results', resultRoute);

router
  .route('/')
  .get(quizController.getAllQuizzes)
  .post(
    authMiddleware.isLoggedIn,
    authMiddleware.restrictedTo('admin'),
    formDataParsing.getFile('image'),
    formDataParsing.storeLink('original', 'quizzes', 'quizImage'),
    quizController.createQuiz
  );

router
  .route('/:id')
  .get(quizController.getQuiz)
  .patch(
    authMiddleware.isLoggedIn,
    authMiddleware.restrictedTo('admin'),
    formDataParsing.getFile('image'),
    formDataParsing.storeLink('original', 'quizzes', 'quizImage'),
    quizController.updateQuiz
  )
  .delete(
    authMiddleware.isLoggedIn,
    authMiddleware.restrictedTo('admin'),
    quizController.deleteQuiz
  );

module.exports = router;
