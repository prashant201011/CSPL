const express = require("express");
const router = express.Router();
const userController = require("../controller/router");

router.get("/user", userController.getData);

router.post("/user", userController.postData);

router.post("/cngpwd", userController.changePassword);

module.exports = router;
