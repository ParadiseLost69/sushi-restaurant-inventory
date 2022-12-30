const Sushi = require("../models/sushi");
const Category = require("../models/category");
const { body, validationResult } = require("express-validator");
const async = require("async");

exports.sushi_list = (req, res, next) => {
  Sushi.find({}, "name price").exec(function (err, results) {
    if (err) {
      return next(err);
    }
    res.render("sushi", { title: "sushi table", sushi_list: results });
  });
};

exports.sushi_detail = (req, res, next) => {
  Sushi.findById(req.params.id, (err, results) => {
    if (err) {
      next(err);
    }
    Category.findById(results.category, (err2, results2) => {
      if (err2) {
        next(err2);
      }
      res.render("description", {
        title: results ? results.name : "Nothing found",
        sushi: results,
        category: results2,
      });
    });
  });
};

exports.sushi_create_get = (req, res, next) => {
  Category.find({}, "name").exec((err, results) => {
    if (err) {
      next(err);
    }
    res.render("create", { categories: results });
  });
};

exports.sushi_create_post = [
  body("name", "Invalid Name: Must be at least 2 letters")
    .trim()
    .isLength({ min: 2 })
    .escape(),
  body("price", "Invalid Price: Price must be entered")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("description").trim().escape(),
  body("stock").trim().escape(),

  //process the request after validation and sanitization
  (req, res, next) => {
    const errors = validationResult(req);
    const sushi = new Sushi({
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      stock: req.body.stock,
      category: req.body.category,
    });
    if (!errors.isEmpty()) {
      console.log(errors.array());
      Category.find({}, "name").exec((err, results) => {
        if (err) {
          next(err);
        }
        res.render("create", {
          title: "Add new sushi",
          sushi,
          errors: errors.array(),
          categories: results,
        });
      });

      return;
    } else {
      Sushi.create(sushi);
      res.redirect("/sushi");
    }
  },
];

exports.sushi_delete_get = (req, res) => {
  Sushi.findById(req.params.id, (err, results) => {
    res.render("sushi_delete", { title: "Delete", sushi: results });
  });
};

exports.sushi_delete_post = (req, res) => {
  Sushi.findByIdAndDelete(req.params.id, (err, results) => {
    res.redirect("/sushi");
  });
};

exports.sushi_update_get = (req, res, next) => {
  Sushi.findById(req.params.id, (err, results) => {
    if (err) {
      next(err);
    }
    Category.find({}, "name").exec((err2, results2) => {
      if (err2) {
        next(err2);
      }
      res.render("sushi_update", {
        title: "Update Sushi",
        sushi: results,
        categories: results2,
      });
    });
  });
};
// Sushi.findById(req.params.id, (err, results) => {
//   if (err) {
//     return next(err);
//   }
//   res.render("sushi_update", { title: "Update the sushi", sushi: results });
// });

exports.sushi_update_post = (req, res, next) => {
  console.log(req.body.name);
  const sushi = new Sushi({
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    stock: req.body.stock,
    category: req.body.category,
    _id: req.params.id,
  });
  Sushi.findByIdAndUpdate(req.params.id, sushi, {}, (err, results) => {
    if (err) {
      return next(err);
    }
    res.redirect("/sushi");
  });
};
