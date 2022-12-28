const express = require("express");
const router = express.Router();

const sushi_controller = require("../controllers/sushiController");

router.get("/", sushi_controller.sushi_list);

router.get("/create", sushi_controller.sushi_create_get);

router.post("/create", sushi_controller.sushi_create_post);

router.get("/:id", sushi_controller.sushi_detail);

router.get("/:id/delete", sushi_controller.sushi_delete_get);

router.post("/:id/delete", sushi_controller.sushi_delete_post);

router.get("/:id/update", sushi_controller.sushi_update_get);

router.post("/:id/update", sushi_controller.sushi_update_post);

module.exports = router;
