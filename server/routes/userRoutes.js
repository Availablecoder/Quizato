const { Router } = require('express');

const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authorization');
const formDataParsing = require('../middlewares/formDataParsing');

const router = Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

// Routes that shoud have a logged in user or admin
router.use(authMiddleware.isLoggedIn);

router.patch(
  '/updateMe',
  formDataParsing.getFile('image'),
  formDataParsing.storeLink('', 'users', 'userImage'),
  userController.updateMe
);
router.delete('/deleteMe', userController.deleteMe);
router.get(
  '/me',
  authMiddleware.restrictedTo('user'),
  userController.userDashboard
);
router.patch('/updatePassword', authController.updatePassword);

// Restrict the access of users API to admins only
router.use(authMiddleware.restrictedTo('admin'));

router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);
router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
