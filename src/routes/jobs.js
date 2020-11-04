const express = require("express");
const router = express.Router();
const jobController = require("../controllers/jobs");
const auth = require("../middleware/authentication")

router.post("/createJob", auth, jobController.createJob);
router.get("/getJobs", auth, jobController.getJobs);
router.post("/getOneJob", auth, jobController.getOneJob);
router.post("/applyJob", auth, jobController.applyJob);
router.post("/deleteJob", auth, jobController.deleteJob);
router.post("/hireJob", auth, jobController.hireJob);
router.post("/ownerJobs", auth, jobController.ownerJobs);

module.exports = router;
