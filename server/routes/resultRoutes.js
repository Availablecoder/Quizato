const { Router } = require('express');

const resultController = require('../controllers/resultController');
const quizController = require('../controllers/quizController');
const authMiddleware = require('../middlewares/authorization');

const router = Router({ mergeParams: true });

// Let only logged in users who can access questions collection
router.use(authMiddleware.isLoggedIn);

router
  .route('/')
  .get(resultController.getAllResults)
  .post(
    authMiddleware.restrictedTo('user'),
    resultController.getQuizAndUserIds,
    quizController.findResult,
    resultController.createResult
  );

router
  .route('/:id')
  .get(resultController.getResult)
  .patch(
    quizController.findResult,
    resultController.reviewAuth,
    resultController.updateResult
  )
  .delete(resultController.reviewAuth, resultController.deleteResult);

module.exports = router;
