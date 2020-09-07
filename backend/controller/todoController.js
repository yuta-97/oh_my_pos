const Todo = require('../model/todo');

exports.index = (req, res, next) => {
  Todo.find({}, (err, todos) => {
    if (err) {
      return next(err);
    }
    res.status(201).json(todos);
  });
};

exports.create = (req, res, next) => {
  let todo = new Todo({
    title: req.body.title,
  });

  todo.save((err) => {
    if (err) {
      return next(err);
    }
    res.status(200).json(todo);
  });
};

exports.edit = (req, res, next) => {
  Todo.findById(req.params.id, (err, todo) => {
    if (err) {
      return next(err);
    }
    res.status(200).json(todo);
  });
};

exports.update = (req, res, next) => {
  Todo.findByIdAndUpdate(req.params.id, { $set: req.body }, (err, todo) => {
    if (err) {
      return next(err);
    }
    res.status(200).json(todo);
  });
};

exports.delete = (req, res, next) => {
  Todo.findByIdAndRemove(req.params.id, (err) => {
    if (err) {
      return next(err);
    }
    res.status(204);
  });
};