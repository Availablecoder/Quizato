// This Controller is for refactoring our code and done repeat our selfs
// Where the comman controllers and requests like CRUD Operation is made
// in all of the models so we grouped this is on place
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

// Get All documents in a collection
exports.getAll = (Model, modelName) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.find();
    res.status(200).json({
      status: 'success',
      result: doc.length,
      [modelName]: doc,
    });
  });

// Get one of the documents from a collection
exports.getOne = (Model, modelName, ...population) =>
  catchAsync(async (req, res, next) => {
    const { id } = req.params;
    let query;
    // Check if the user enters an ID (Which is the normal case)
    if (/[0-9a-fA-F]{24}/.test(id)) {
      console.log('ID');
      query = Model.findById(id);
    } else {
      // or the slug(slug of the name of the quiz in the front - end from URL params)
      query = Model.findOne({ slug: id });
    }

    if (population) {
      population.forEach((pop) => {
        query = query.populate(pop);
      });
    }

    const doc = await query;

    if (!doc)
      return next(new AppError(`No ${modelName} found with that ID`, 404));

    res.status(200).json({
      status: 'success',
      [modelName]: doc,
    });
  });

// Create one document in a collection
exports.createOne = (Model, modelName) =>
  catchAsync(async (req, res, next) => {
    const newDoc = await Model.create(req.body);

    res.status(201).json({
      status: 'success',
      [modelName]: newDoc,
    });
  });

// Update one document in a collection
exports.updateOne = (Model, modelName) =>
  catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const doc = await Model.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doc)
      return next(new AppError(`No ${modelName} found with that ID`, 404));

    res.status(200).json({
      status: 'success',
      [modelName]: doc,
    });
  });

// Delete one document in a collection
exports.deleteOne = (Model, modelName) =>
  catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const doc = await Model.findByIdAndDelete(id);

    if (!doc)
      return next(new AppError(`No ${modelName} found with that ID`, 404));

    res.status(204).json({
      status: 'success',
      [modelName]: doc,
    });
  });
