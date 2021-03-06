const express = require("express");
const multer = require("multer");
const upload = multer({ dest: "./" });

const adminController = require("./../controllers/adminController");

const router = express.Router();

router.post("/populate", upload.single("file"), adminController.populate);
router.post("/clearProducts", adminController.clearProducts);

module.exports = router;
