const express = require("express");
const router = express.Router();
const category_controller = require("../controllers/categoryController");

router.get("/", category_controller.get_categories);

router.get("/:id", category_controller.get_category);

router.get("/create", category_controller.get_category_create);

router.post("create", category_controller.create_category);
