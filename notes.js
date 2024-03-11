/**
 * ----- Mongoose - Modeling Relationships between connected Data -----
 * Topics:
 * DONE: 1. Modeling Relationships
 * DONE: 2. Referencing Documents
 * DONE: 3. Population
 * DONE: 4. Embedding Documents
 * DONE: 5. Using an Array of Sub-Documents
 * DONE: 6. Project - Build the Movie API
 * DONE: 7. Project - Build the Rentals API
 * TODO: 8. Transactions
 * DONE: 9. ObjectID
 * DONE: 10. Validating ObjectIDs
 * DONE: 11. A Better Implementation
 */

/**
 * ----- Modeling Relationships - Entities -----
 * 1. Using References (Normalization) -> gives Consistency
 * 2. Using Embedded Documents (Denormalization) -> gives Performance
 */

// Trade off between query performance vs consistency

// Using References (Normalization) -> gives Consistency
let author = {
  name: "Mosh",
};

let course = {
  author: "id",
};

// Using Embedded Documents (Denormalization) -> gives Performance
let course1 = {
  author: {
    name: "Mosh Hamedani",
  },
};

// Hybrid
let author1 = {
  name: "Mosh",
};

let course2 = {
  author: {
    id: "ref",
    name: "Mosh Hamedani",
  },
};

/**
 * ObjectID
 * _id: 65d04cbdb888b491b134e035
 *
 * 12 bytes:
 *  - 4 bytes: timestamp
 *  - 3 bytes: machine identifier
 *  - 2 bytes: process identifier
 *  - 3 bytes: counter
 *
 * 1 byte = 8 bits
 * 2 ^ 8 = 256
 * 2 ^ 24 = 16M
 *
 *
 *
 * Driver -> MongoDB
 */

/**
 * Section Name: Mongoose Data Validation
 * Topics:
 * DONE: 1. Validation
 * DONE: 2. Built-in Validators
 * DONE: 3. Custom Validators
 * DONE: 4. Async Validators
 * DONE: 5. Validation Error
 * DONE: 6. SchemaType Options
 * DONE: 7. Project - Add Persistence to Genres API
 * DONE: 8. Project - Build the Custom API
 * DONE: 9. Restructure the Project
 */

/**
 * We need to use Joi and Mongoose both of validators for better application
 * - Joi is used to validate the user input validation
 * - Mongoose is used to validate the schema validation model
 */

/**
 * Mongoose Built-in Validators
 * const courseSchema = new mongoose.Schema({
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
});
 */

/**
 * Mongoose Custom Validators
 * const courseSchema = new mongoose.Schema({
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
});
 */

// Async validators
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
    // approach 1
    validate: {
      validator: async function (value) {
        // Simulate an asynchronous task, such as a database query or external API call
        const delay = (n) => {
          return new Promise(function (resolve) {
            setTimeout(resolve, n * 1000);
          });
        };
        await delay(4);
        const result = value && value.length > 0;
        return result;
      },
      message: "A course should have at least one tag.",
    },
    // approach 2
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
  },
}); */

// Validation Error
/* async function createCourse() {
  const course = new Course({
    name: "Redux",
    author: "John Doe",
    category: "-",
    isPublished: true,
    price: 125,
    tags: null,
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
} */

// SchemaTypes Options
/* {
  category: {
    type: String,
    enum: ["web", "mobile", "network"],
    lowercase: true,
    trim: true,
  },
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
} */
