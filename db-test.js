const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/test")
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log(err));

/* const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 200,
  },
  category: {
    type: String,
    enum: ["web", "mobile", "network"],
  },
  author: String,
  tags: {
    type: Array,
    // custom validator
    validate: {
      validator: function (value) {
        return value && value.length > 0;
      },
      message: "A course should have at least one tag.",
    },
  },
  date: {
    type: Date,
    default: Date.now,
  },
  isPublished: Boolean,
  price: {
    type: Number,
    required: function () {
      return this.isPublished;
    },
  },
}); */

// Async validators
const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 200,
  },
  category: {
    type: String,
    enum: ["web", "mobile", "network"],
    lowercase: true,
    trim: true,
  },
  author: String,
  tags: {
    type: Array,
    validate: {
      validator: function (value) {
        return value && value.length > 0;
      },
      message: "A course should have at least one tag.",
    },
    // async approach 1
    // validate: {
    //   validator: async function (value) {
    //     // Simulate an asynchronous task, such as a database query or external API call
    //     const delay = (n) => {
    //       return new Promise(function (resolve) {
    //         setTimeout(resolve, n * 1000);
    //       });
    //     };
    //     await delay(4);
    //     const result = value && value.length > 0;
    //     return result;
    //   },
    //   message: "A course should have at least one tag.",
    // },

    // async approach 2
    // validate: {
    //   validator: function (v) {
    //     return new Promise((resolve, reject) => {
    //       setTimeout(() => {
    //         const result = v && v.length > 0;
    //         resolve(result);
    //       }, 4000);
    //     });
    //   },
    // },
  },
  date: {
    type: Date,
    default: Date.now,
  },
  isPublished: Boolean,
  price: {
    type: Number,
    required: function () {
      return this.isPublished;
    },
    min: 10,
    max: 200,
    get: (v) => Math.round(v), // to get value form db
    set: (v) => Math.round(v), // to set value to db
  },
});

const Course = mongoose.model("Course", courseSchema);

async function createCourse() {
  const course = new Course({
    name: "Redux",
    author: "John Doe",
    category: "MObile    ",
    isPublished: true,
    price: 125.6,
    tags: ["frontend"],
  });

  try {
    const result = await course.save();
    console.log(result);
  } catch (err) {
    // Validation Error
    for (field in err.errors) {
      console.log({
        field,
        message: err.errors[field].message,
      });
    }
  }
}

createCourse();
