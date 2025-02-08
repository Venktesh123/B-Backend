const express = require("express");
const router = express.Router();
const lectureController = require("../controllers/lectureController");
const auth = require("../middleware/auth");

// Public routes
router.get("/lectures", lectureController.getLectures);
router.get("/lectures/:id", lectureController.getLectureById);

// Protected routes
router.post("/lectures", auth.protect, lectureController.createLecture);

// Teacher only routes
router.get(
  "/teacher/lectures",
  auth.protect,
  auth.teacher,
  lectureController.getTeacherLectures
);

module.exports = router;
