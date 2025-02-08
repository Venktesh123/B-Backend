const Lecture = require("../models/Lecture");

exports.createLecture = async (req, res) => {
  try {
    const { title, description, videoUrl, duration, tags } = req.body;
    const lecture = await Lecture.create({
      title,
      description,
      videoUrl,
      duration,
      tags: tags ? tags.split(",").map((tag) => tag.trim()) : [],
      teacher: req.user._id,
    });

    res.status(201).json(lecture);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getLectures = async (req, res) => {
  console.log("data");
  try {
    const lectures = await Lecture.find()
      .populate("teacher", "name")
      .sort("-createdAt");
    return res.json(lectures);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getTeacherLectures = async (req, res) => {
  try {
    const lectures = await Lecture.find({ teacher: req.user._id }).sort(
      "-createdAt"
    );
    res.json(lectures);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getLectureById = async (req, res) => {
  try {
    const lecture = await Lecture.findById(req.params.id).populate(
      "teacher",
      "name"
    );

    if (lecture) {
      res.json(lecture);
    } else {
      res.status(404).json({ message: "Lecture not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
