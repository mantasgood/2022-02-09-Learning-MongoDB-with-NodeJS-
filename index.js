require("dotenv").config();
const { get } = require("http");
const mongoose = require("mongoose");
mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.v9olt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
  )
  .then(() => console.log("Connect to mongo db"))
  .catch((err) => console.error("something is wrong", err));

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
});

// class
const Course = mongoose.model("Course", courseSchema);

//object

async function createCourse() {
  //object
  const course = new Course({
    name: "C++",
    author: "Vytautas",
    tags: ["arrays", "functions"],
    isPublished: true,
  });
  // calls a save/create for a ne course
  const result = await course.save();
  console.log(result);
}

// createCourse();

// find method for reading how many there are

async function getCourses() {
  const courses = await Course.find();
  console.log(courses);
}

//  getCourses();

// Count entries

async function getCourseNumber() {
  const courses = await Course.find().count();
  console.log(courses);
}

// getCourseNumber();

// changing something(author name and is published ) by giving id
async function updateCourse(id) {
  const course = await Course.findById(id);
  if (!course) return;

  if (course.isPublished) return;

  course.isPublished = true;
  course.author = "Changed Author name";
  const result = await course.save();
  console.log(result);
}

// getCourses();
// updateCourse("6203a865822ed52bc4bd516e");
// getCourses();

//changing course name by giving id
async function updateCourseName(id) {
  const course = await Course.findById(id);
  if (!course) return;

  course.name = "Changed course name";

  const result = await course.save();
  console.log(result);
}

// getCourses();
// updateCourseName("6203a928b0de0cddafd3f5ed");
// getCourses();

// updateone differently
async function updateCourse(id) {
  const result = await Course.updateOne(
    {
      _id: id,
    },
    {
      $set: {
        author: "Updated author Name by second variant",
        isPublished: false,
      },
    }
  );
  console.log(result);
}

// updateCourse("6203a8381eff1e1c72cfc672");

// find by ID and Update

async function updateCourse(id) {
  const course = await Course.findByIdAndUpdate(
    id,
    { $set: { author: "Jeremy", isPublished: true } },
    { new: true }
  );
  console.log(course);
}
// updateCourse("6203a7da296eb45f541014c6");

//delete one doc

async function removeCourse(id) {
  const result = await Course.deleteOne({ _id: id });
  console.log(result);
}

// removeCourse("6203a8381eff1e1c72cfc672");

// remove many which are published false
async function removeCourses() {
  const courses = await Course.deleteMany({
    isPublished: true,
  });
  console.log(courses);
}

// removeCourses();

// find by starting wiht java
async function findBySpecific() {
  const result = await Course.find({ name: /^java/ });
  console.log(result);
}

// findBySpecific();

// find by specirfic and sort ascending

async function findBySpecificAndSortAsc() {
  const result = await Course.find().sort({ name: `asc` });
  console.log(result);
}
// findBySpecificAndSortAsc();

// find by specirfic and sort descending

async function findBySpecificAndSortDesc() {
  const result = await Course.find().sort({ name: `desc` });
  console.log(result);
}
// findBySpecificAndSortDesc();
