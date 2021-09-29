const express = require("express");
const imageController = require("./../controllers/imageController");

const router = express.Router();

router
  .route("/products")
  .post(imageController.uploadProductImage, imageController.updateProduct);

router.get("/products", imageController.getProductImages);

module.exports = router;
