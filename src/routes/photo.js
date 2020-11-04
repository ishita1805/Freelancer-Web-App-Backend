const express = require("express");
const router = express.Router();
const photoController = require("../controllers/photo");
const auth = require("../middleware/authentication")


router.post("/portfolio", auth, photoController.portfolio);
router.post("/deletePhoto", auth, photoController.deletePhoto);

module.exports = router;




