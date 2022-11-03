// Exporting a Function that takes one argument which is a function(async one) and execute it

module.exports = (func) => (req, res, next) => {
  func(req, res, next).catch(next);
};
