const Category = require("../models/category");

exports.get_categories = (req, res) => {
  res.render("categories", { title: "Categories" });
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
