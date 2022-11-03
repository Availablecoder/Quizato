const { Router } = require('express');

const questionController = require('../controllers/questionController');
const authMiddleware = require('../middlewares/authorization');

const router = Router();

// Let only logged in admins who can access questions collection
router.use(authMiddleware.isLoggedIn, authMiddleware.restrictedTo('admin'));

router
  .route('/')
  .get(questionController.getAllQuestions)
  .post(questionController.createQuestions);

router
  .route('/:id')
  .get(questionController.getQuestion)
  .patch(questionController.updateQuestion)
  .delete(questionController.deleteQuestion);

module.exports = router;
