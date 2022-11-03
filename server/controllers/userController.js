const User = require('../models/userModel');
const Result = require('../models/resultModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const factory = require('./factoryController');

// User update his data (name or email or both)
exports.updateMe = catchAsync(async (req, res, next) => {
  // Check if there is a password or passwordConfirm in the request body
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'This route is not for updating password please go to /updatePassword instead',
        403
      )
    );
  }

  // Filter the request body and take just the values that can be changed
  const filteredBody = filterObj(req.body, 'name', 'email', 'image');

  // Update user data
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(201).json({
    status: 'success',
    user: updatedUser,
  });
});

// User delete him self (inactivate his account)
exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: 'success',
    user: null,
  });
});

// User get detailed informations about himself
exports.userDashboard = catchAsync(async (req, res, next) => {
  const user = req.user;

  const userResults = await Result.find({ user: user._id })
    .sort('-percentage timeTaken')
    .populate({
      path: 'quiz',
      select: 'image title',
    });

  user.results = userResults;

  res.status(200).json({ status: 'success', user });
});

// User CRUD Operations which is allowed for admins
exports.getAllUsers = factory.getAll(User, 'users');
exports.getUser = factory.getOne(User, 'user', {
  path: 'results',
  options: {
    sort: 'percentage timeTaken',
  },
});
exports.createUser = factory.createOne(User, 'user');
exports.updateUser = factory.updateOne(User, 'user');
exports.deleteUser = factory.deleteOne(User, 'user');

/* ############### Function Used ############### */

const filterObj = (obj, ...allowedFields) => {
  const filteredObject = {};
  for (const key in obj) {
    if (allowedFields.includes(key)) {
      filteredObject[key] = obj[key];
    }
  }
  return filteredObject;
};
