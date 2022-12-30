const Category = require("../models/category");

exports.get_categories = (req, res, next) => {
  Category.find({}, "name description").exec((err, results) => {
    if (err) {
      next(err);
    }
    res.render("categories", { title: "Categories", categories: results });
  });
};

exports.get_category = (req, res) => {
  res.send({ message: `getting category ${req.params.id}` });
};

exports.get_category_create = (req, res) => {
  res.send("GET category create page");
};

exports.create_category = (req, res) => {
  res.send({ message: "POST new category" });
};
