const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
const auth = require("../middleware/authentication")


router.get("/getUser", userController.getUsers);
router.post("/createUser", userController.createUser);
router.post("/login", userController.login);
router.get("/logout", auth, userController.logout);
router.post("/getPortfolio", auth, userController.getPortfolio);


module.exports = router;
